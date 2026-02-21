<!DOCTYPE html>
<head>
    <meta charset="UTF-8">
    <title>Login </title>
    <link rel="stylesheet" href="style.css">
    <script src="https://kit.fontawesome.com/3ca4fe2b8a.js"></script>
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>

</head>
<body>
    <header>
        <nav class="navbar">
            <input type="checkbox" id="check">
            <label for="check" class="checkbox">
                <i class="fa-solid fa-bars"></i>
            </label>
            <label class="logo">HAKARI</label>
            <ul>
                <li><a class="active" href="AnimePres.php">HOME</a></li>
                <li><a href="AnimeList.html">ANIME LIST</a></li>
                 <li><a href="Topics.html">TOPICS</a></li>
                <li><a href="login.php">LOGIN</a></li>
            </ul>
        </nav>
    </header>
     <?php
    if(isset($_POST['submit'])){
        $email = mysqli_real_escape_string($con,$_POST['email']);
        $password = mysqli_real_escape_string($con,$_POST['password']);
        $result = mysqli_query($con,"SELECT*FROM users WHERE Email='$email' AND Password='$password'")or die("Select Error");
        $row = mysqli_fetch_assoc($result);
        if(is_array($row) && !empty($row)){
            $_SESSION['valid']=$row['Email'];
            $_SESSION['username']=$row['Username'];
            $_SESSION['age']=$row['Age'];
            $_SESSION['id']=$row['Id'];
        }else{
            echo "<div class= 'message' >
                <p>Wrong Username or Password </p>
                </div><br>";
            echo "<a href='ANIME.php'><button class='btn'>Go back</button>";
        }
        if(isset($_SESSION['valid'])){
            header("Location: home.php");
        }
    }else{
?>
    <div class="wrapper">
        <form action="">
            <h1>Login</h1>

            <div class="input-box">
                <input type="text" placeholder="Username"
                required>
                <i class='bx bxs-user'></i>
            </div>
            <div class="input-box">
                <input type="password" placeholder="Password"
                required>
                <i class='bx bxs-lock-alt'></i>
            </div>

            <div class="rebember-forgot">
                <label><input type="checkbox"> Rebember me 
                </label>
            </div>

            <button type="submit" class="btn" >Login</button>

            <div class="registrer-link">
                <p>Don't have an account? <a href="register.php"> Register</a>
                </p>
            </div>
        
        </form>
        <?php } ?>
    </div>
</body>
</body> 