<?php

namespace app\controllers;

class HomeController extends \yii\web\Controller
{
    public function actionIndex()
    {
        \Yii::$app->view->registerMetaTag([
            'name' => 'description',
            'content' => 'Donate plasma and become a hero',
        ]);
        \Yii::$app->view->title = 'Plasma Nepal | Donate and become a hero';

        return $this->render('index');
    }

}
