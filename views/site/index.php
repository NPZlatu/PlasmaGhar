<?php 
/* @var $this yii\web\View */
$this->registerJsFile('@web/js/dist/build-home.js',[
    'depends' => [
        \yii\web\JqueryAsset::className()
    ]
]);

$this->registerJsFile('//cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js',[
    'depends' => [
        \yii\web\JqueryAsset::className()
    ]
]);


$this->registerJsFile('//cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js',[
    'depends' => [
        \yii\web\JqueryAsset::className()
    ]
]);

$this->registerJsFile('//cdn.rawgit.com/michalsnik/aos/2.1.1/dist/aos.js',[
    'depends' => [
        \yii\web\JqueryAsset::className()
    ]
]);

$this->registerJsFile('@web/js/dist/build-landingpage.js',[
    'depends' => [
        \yii\web\JqueryAsset::className()
    ]
]);

?>

<?php
echo $this->render('partials/_hero.php', ['name'=>'value']); //name value to be used to pass params
echo $this->render('partials/_search.php'); 
echo $this->render('partials/_faq.php'); 
echo $this->render('partials/_feedback.php'); 

?>


