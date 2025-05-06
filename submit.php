<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"] ?? '';
    $email = $_POST["email"] ?? '';
    $password = $_POST["password"] ?? '';

    // અહીં તમે ડેટાબેઝમાં INSERT કરી શકો છો, Fileમાં લખી શકો છો, વગેરે

    echo "Received: Name = $name, Email = $email";
}
?>
