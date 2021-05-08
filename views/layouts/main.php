<?php

/* @var $this \yii\web\View */
/* @var $content string */

use app\widgets\Alert;
use yii\helpers\Html;
use yii\bootstrap\Nav;
use yii\bootstrap\NavBar;
use yii\widgets\Breadcrumbs;
use app\assets\AppAsset;

use cybercog\yii\googleanalytics\widgets\GATracking;


AppAsset::register($this);
?>
<?php $this->beginPage(); ?>
<!DOCTYPE html>
<html lang="<?= Yii::$app->language ?>">
<head>
    <meta charset="<?= Yii::$app->charset ?>">
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <?php $this->registerCsrfMetaTags() ?>
    <title><?= Html::encode($this->title) ?></title>
    <?php $this->head() ?>

    <?= GATracking::widget([
    'trackingId' => 'UA-121215099-1',
    ]) ?>
<script src="https://www.googleoptimize.com/optimize.js?id=OPT-K75WMSD"></script>
</head>
<body>
<?php $this->beginBody() ?>

<div class="container">
       
        <?php echo $this->render('partials/_header.php');  ?>
        <?= Alert::widget(); ?>
        <?= $content ?>
        <?php echo $this->render('partials/_footer.php');  ?>
</div>

<?php $this->endBody() ?>
<?php echo $this->render('modals/_signinmodal.php');  ?>
<?php echo $this->render('modals/_signupmodal.php');  ?>

</body>
</html>
<?php $this->endPage() ?>
