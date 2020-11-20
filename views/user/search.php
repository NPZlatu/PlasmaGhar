<?php

$this->registerJsFile('@web/js/dist/build-home.js',[
    'depends' => [
        \yii\web\JqueryAsset::className()
    ]
]);



echo $this->render('//site/partials/_searchlist.php', array('donors'=>$donors))

?>


