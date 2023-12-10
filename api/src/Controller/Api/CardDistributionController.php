<?php
namespace App\Controller\Api;

use Cake\Controller\Controller;

/**
 * Class CardDistributionController
 * @package App\Controller\Api
 */
class CardDistributionController extends Controller
{
    /**
     * Distributes cards among the specified number of players.
     *
     * @param int $numPlayers The number of players to distribute cards to.
     * @return \Cake\Http\Response The JSON response containing the card distribution.
     */
    public function distribute($numPlayers)
    {
        $response = $this->response;

        // Validate input for the number of players
        if (!$this->isValidNumberOfPlayers($numPlayers)) {
            return $this->jsonErrorResponse(400, "Input value does not exist or value is invalid");
        }

        // Call the card distribution function
        $cardDistribution = $this->performCardDistribution($numPlayers);

        return $this->jsonSuccessResponse($cardDistribution);
    }

    /**
     * Performs the card distribution among the specified number of players.
     *
     * @param int $numPlayers The number of players to distribute cards to.
     * @return array The array representing the card distribution.
     */
    private function performCardDistribution($numPlayers)
    {
        $deck = $this->getDeck();

        shuffle($deck);

        $dealtCards = $this->initializeDealtCardsArray($numPlayers);

        $index = 0;
        foreach ($deck as $card) {
            $dealtCards[$index][] = $card;
            $index = ($index + 1) % $numPlayers;
        }

        return $dealtCards;
    }

    /**
     * Retrieves the standard deck of playing cards.
     *
     * @return array The array representing the standard deck of playing cards.
     */
    protected function getDeck()
    {
        $suits = ["S", "H", "D", "C"];
        $values = array_merge(range(2, 9), ["A", "X", "J", "Q", "K"]);
        $deck = [];

        foreach ($suits as $suit) {
            foreach ($values as $value) {
                $deck[] = $suit . "-" . $value;
            }
        }

        return $deck;
    }

    /**
     * Initializes an array to store dealt cards for each player.
     *
     * @param int $numPlayers The number of players.
     * @return array The initialized array to store dealt cards.
     */
    private function initializeDealtCardsArray($numPlayers)
    {
        return array_fill(0, $numPlayers, []);
    }

    /**
     * Checks if the specified number of players is valid.
     *
     * @param int $numPlayers The number of players to validate.
     * @return bool True if the number of players is valid, false otherwise.
     */
    private function isValidNumberOfPlayers($numPlayers)
    {
        return is_numeric($numPlayers) && $numPlayers > 0;
    }

    /**
     * Generates a JSON success response.
     *
     * @param mixed $data The data to include in the response.
     * @return \Cake\Http\Response The JSON success response.
     */
    private function jsonSuccessResponse($data)
    {
        return $this->jsonResponse(200, "Success", $data);
    }

    /**
     * Generates a JSON error response.
     *
     * @param int $statusCode The HTTP status code for the error response.
     * @param string $message The error message to include in the response.
     * @return \Cake\Http\Response The JSON error response.
     */
    private function jsonErrorResponse($statusCode, $message)
    {
        return $this->jsonResponse($statusCode, $message);
    }

    /**
     * Generates a JSON response with the specified status code, message, and optional data.
     *
     * @param int $statusCode The HTTP status code for the response.
     * @param string $message The message to include in the response.
     * @param mixed|null $data The optional data to include in the response.
     * @return \Cake\Http\Response The JSON response.
     */
    private function jsonResponse($statusCode, $message, $data = null)
    {
        $response = $this->response;

        $responseData = [
            'status' => $statusCode,
            'message' => $message,
        ];

        if ($data !== null) {
            $responseData['data'] = $data;
        }

        return $response
            ->withType("application/json")
            ->withStatus($statusCode)
            ->withStringBody(json_encode($responseData, JSON_PRETTY_PRINT));
    }
}
