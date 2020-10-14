<?php 
/* @var $this yii\web\View */
?>


<?php
echo $this->render('partials/_hero.php', ['name'=>'value']); //name value to be used to pass params
echo $this->render('partials/_search.php'); 
echo $this->render('partials/_faq.php'); 
echo $this->render('partials/_feedback.php'); 

?>


