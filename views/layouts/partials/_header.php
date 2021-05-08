<?php

use yii\helpers\Html;
?>

<header class="header-section">
    <nav class="navbar navbar-expand-lg pl-3 pl-sm-0" id="navbar">
        <div class="container">
            <div class="navbar-brand-wrapper d-flex w-100">
                <a href="/">
                    <?= Html::img('@web/images/logo.svg', ['alt' => '...', 'width' => '200', 'height' => '100', 'class' => 'cus-logo']); ?>
                </a>
                <button class="navbar-toggler ml-auto" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="mdi mdi-menu navbar-toggler-icon"></span>
                </button>
            </div>
            <div class="collapse navbar-collapse navbar-menu-wrapper" id="navbarSupportedContent">
                <ul class="navbar-nav align-items-lg-center align-items-start ml-auto">
                    <li class="d-flex align-items-center justify-content-between pl-4 pl-lg-0">
                        <div class="navbar-collapse-logo">
                            <img src="images/logo.svg" alt="" style="height: 45px;">
                        </div>
                        <button class="navbar-toggler close-button" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="mdi mdi-close navbar-toggler-icon pl-5"></span>
                        </button>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active" href="#">Home </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Ambulance</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Oxygen Suppliers</a>
                    </li>
                    


                    <li class="nav-item btn-contact-us pl-4 pl-lg-0">
                        <?php
                        if (\Yii::$app->user->isGuest) {
                        ?>
                            <a class="btn btn-sm btn-outline-secondary" data-toggle="modal" data-target="#signinModal">Sign In</a>
                            <a class="btn btn-sm btn-outline-secondary" data-toggle="modal" data-target="#signupModal">Sign up</a>
                        <?php } else {?>
                            
                            <?php
                            echo Html::a('Sign out', ['/user/logout'], ['data-method' => 'post', 'class' => 'btn btn-sm btn-outline-secondary']);

                        ?>
                            <a class="btn btn-sm btn-outline-secondary" href="/dashboard">Dashboard</a>

                        <?php }
                        ?>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</header>
