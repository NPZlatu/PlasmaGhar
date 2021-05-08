<?php
/* @var $this yii\web\View */
/* @var $this yii\web\View */
$this->registerJsFile('@web/js/dist/build-dashboard.js', [
    'depends' => [
        \yii\web\JqueryAsset::className()
    ]
]);

$this->registerJsFile('//cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js', [
    'depends' => [
        \yii\web\JqueryAsset::className()
    ]
]);
?>
<section>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="row text-center text-md-left">
                    <div class="col-md-12 ">
                        <div class="col-md-8">
                            <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
                                <h1 class="h2 pt-4">Dashboard</h1>
                            </div>
                        </div>
                        <div class="col-md-4 text-left">
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
                            <br /><br />
                        </div>
                    </div>
                    <div class="row">
                        <?php

                        echo $this->render('partials/_user_info.php', ['res' => $res]);

                        if ($res['role_value'] === 'Receiver') {
                            echo $this->render('partials/_main_content_receiver.php', ['lists' => $res['lists']]);
                        } else {
                            echo $this->render('partials/_main_content_donor.php', ['lists' => $res['lists']]);
                        }
                        echo $this->render('//site/partials/_searchlist.php');
                        echo $this->render('partials/_update_user.php');
                        echo $this->render('partials/_change_password.php');

                        ?>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>