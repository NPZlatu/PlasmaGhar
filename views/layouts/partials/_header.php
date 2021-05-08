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

                        <?php } else { ?>

                            <div class="btn-group ">
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                                    <i class="fa fa-bell-o"></i>
                                    <span class="label notification-count">13</span>
                                </a>

                                <div class="dropdown-menu">
                                    <p class="mb-0 font-weight-normal float-left dropdown-header">Notifications</p>
                                    <ul class="menu">
                                        <li class="dropdown-item">

                                            <a href="#">
                                                <div class="preview-item-content">
                                                    <h6 class="preview-subject font-weight-bold"> <i class="fa fa-dot-circle-o  notification-icon"> </i>5 new members joined today</h6>
                                                    <p class="font-weight-light small-text mb-0 text-muted notification-date">
                                                        2 days ago
                                                    </p>
                                                </div>
                                            </a>
                                        </li>
                                        <li class="dropdown-item">
                                            <a href="#">

                                                <div class="preview-item-content">
                                                    <h6 class="preview-subject font-weight-bold"> <i class="fa fa-dot-circle-o  notification-icon"> </i>5 new members joined today</h6>
                                                    <p class="font-weight-light small-text mb-0 text-muted notification-date">
                                                        2 days ago
                                                    </p>
                                                </div>
                                            </a>
                                        </li>
                                        <li class="dropdown-item">
                                            <a href="#">

                                                <div class="preview-item-content">
                                                    <h6 class="preview-subject font-weight-normal"> <i class="fa fa-dot-circle-o  notification-icon"> </i>5 new members joined today</h6>
                                                    <p class="font-weight-light small-text mb-0 text-muted notification-date">
                                                        2 days ago
                                                    </p>
                                                </div>
                                            </a>
                                        </li>


                                    </ul>
                                    <p class="mb-0 font-weight-normal float-left dropdown-header"><a href="#">View All</a></p>
                                </div>
                            </div>



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
<div class="nav-scroller">
    <div class="nav-scroller py-1 mb-2 cus-banner">
        <nav class="nav d-flex justify-content-between">
            <p>LET'S FIGHT TOGETHER AGAINST COVID-19</p>
        </nav>
    </div>