<?php  
use yii\helpers\Html;
?>

<header class="blog-header py-3">
            <div class="row flex-nowrap justify-content-between align-items-center">
                <div class="col-4 pt-1">
                <img src="./images/logo.svg" alt="..." class="img-thumbnail cus-logo">
                </div>

                <div class="col-4 d-flex justify-content-end nav-menus">
                    <?php 
                    if(\Yii::$app->user->isGuest) {
                    ?>
                    <a class="btn btn-sm btn-outline-secondary" data-toggle="modal" data-target="#signinModal">Sign In</a>
                    <a class="btn btn-sm btn-outline-secondary" data-toggle="modal" data-target="#signupModal">Sign up</a>
                    <?php } else {
                            echo Html::a('Sign out',['/user/logout'],['data-method' => 'post', 'class' => 'btn btn-sm btn-outline-secondary']); 
                        
                        ?> 
                          <a class="btn btn-sm btn-outline-secondary" href="/dashboard">Dashboard</a>

                        <?php }
                        ?>
                </div>
            </div>
</header>
<div class="nav-scroller">
    <div class="nav-scroller py-1 mb-2 cus-banner">
                <nav class="nav d-flex justify-content-between">
                    <p>LET'S FIGHT TOGETHER AGAINST COVID-19</p>
                </nav>
    </div>