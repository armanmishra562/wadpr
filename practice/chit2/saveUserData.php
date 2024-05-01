<?php
// Check if the request is a POST request
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the POST data
    $name = $_POST['name'];
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Create an array to store the user data
    $userData = array(
        'name' => $name,
        'email' => $email,
        'password' => $password
    );

    // Convert the array to JSON format
    $jsonData = json_encode($userData);

    // Path to the file where the user data will be stored
    $filePath = 'userData.json';

    // Open the file in append mode
    $file = fopen($filePath, 'a');

    // Check if file is opened successfully
    if ($file) {
        // Write the JSON data to the file
        fwrite($file, $jsonData . PHP_EOL);

        // Close the file
        fclose($file);

        // Send a success response back to the client
        echo json_encode(array('success' => true));
    } else {
        // If unable to open the file, send an error response
        echo json_encode(array('error' => 'Unable to open file for writing.'));
    }
} else {
    // If the request method is not POST, send an error response
    echo json_encode(array('error' => 'Invalid request method.'));
}
?>
