<?php
session_start();
require_once 'connect.php';

$productID = $_POST['id'];
$quantity = $_POST['qty'];

$product_query = "SELECT * FROM products WHERE id=$productID";

$result_products = mysqli_query($conn,$product_query);

$productinfo = mysqli_fetch_assoc($result_products);

if($quantity<=0){
    unset($_SESSION['cart'][$productinfo['id']]);
    unset($_SESSION['subtotal'][$productinfo['id']]);

    $_SESSION['total_amount'] = array_sum($_SESSION['subtotal']);
    echo "Item Deleted";
}else{
    $_SESSION['cart'][$productinfo['id']] = intval($quantity);
    $_SESSION['subtotal'][$productinfo['id']] = $quantity * $productinfo['pPrice'];

    $_SESSION['total_amount'] = array_sum($_SESSION['subtotal']);
    $_SESSION['total_amount'] = number_format($_SESSION['total_amount'],2);
    echo "(₱".$_SESSION['total_amount'].")";
}


mysqli_close($conn);
