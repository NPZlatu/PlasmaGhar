<?php
/* @var $this yii\web\View */
/* @var $this yii\web\View */
$this->registerJsFile('@web/js/dist/build-dashboard.js',[
    'depends' => [
        \yii\web\JqueryAsset::className()
    ]
]);

$this->registerJsFile('//cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js',[
    'depends' => [
        \yii\web\JqueryAsset::className()
    ]
]);
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
                
                if($res['role_value'] === 'Receiver') {
                echo $this->render('partials/_main_content_receiver.php',['lists'=>$res['lists']]);
                }
                else {
                 echo $this->render('partials/_main_content_donor.php',['lists'=>$res['lists']]);
                }
                echo $this->render('//site/partials/_searchlist.php')
                ?>
            </div>
        </main>
    </div>

    
</div>