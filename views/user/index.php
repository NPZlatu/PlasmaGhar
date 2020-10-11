<?php
/* @var $this yii\web\View */

?>

<div class="container-fluid">
    <div class="row">
        <?php echo $this->render('partials/_sidebar.php'); ?>
        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">

            <div
                class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
                <h1 class="h2">Dashboard</h1>
            </div>
            <div class="row">
                <?php 
                
                echo $this->render('partials/_user_info.php',['res'=>$res]); 
                echo $this->render('partials/_main_content.php');

                ?>
            </div>
        </main>
    </div>

    
</div>