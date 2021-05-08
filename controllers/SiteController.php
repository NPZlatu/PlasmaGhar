<?php

namespace app\controllers;

use Yii;
use yii\filters\AccessControl;
use yii\web\Controller;
use yii\web\Response;
use yii\filters\VerbFilter;
use app\models\LoginForm;
use app\models\ContactForm;
use app\models\UserFeedbacks;


class SiteController extends Controller
{
    /**
     * {@inheritdoc}
     */
    public function behaviors()
    {
        return [
            'access' => [
                'class' => AccessControl::className(),
                'only' => ['index', 'terms'],
                'rules' => [
                    [
                        'allow' => true
                    ],
                    [
                        'allow' => true
                    ]
                ],
                
            ]
            
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function actions()
    {
        return [
            'error' => [
                'class' => 'yii\web\ErrorAction',
            ],
            'captcha' => [
                'class' => 'yii\captcha\CaptchaAction',
                'fixedVerifyCode' => YII_ENV_TEST ? 'testme' : null,
            ],
        ];
    }

    /**
     * Displays homepage.
     *
     * @return string
     */
    public function actionIndex()
    {
        \Yii::$app->view->registerMetaTag([
            'name' => 'description',
            'content' => 'Plasma ghar is a place where you can seek the plasma, register to donate plasma.',
        ]);
        \Yii::$app->view->title = 'PlasmaGhar | Place for plasma donors and seekers';
        \Yii::$app->view->registerMetaTag([
            'name' => 'author',
            'content' => 'Lakuri Samaj',
        ]);
        \Yii::$app->view->registerMetaTag([
            'name' => 'keywords',
            'content' => 'plasma, plasmadonate, covid19, covid19Nepal, fight, covid, plasmaghar, plasmaconnect',
        ]);
        \Yii::$app->view->registerMetaTag([
            'name' => 'og:image',
            'content' => 'https://plasmaghar.org/images/doctor.png',
        ]);

        \Yii::$app->view->registerMetaTag([
            'name' => 'twitter:image',
            'content' => 'https://plasmaghar.org/images/doctor.png',
        ]);

        \Yii::$app->view->registerMetaTag([
            'name' => 'og:title',
            'content' => 'PlasmaGhar | Place for plasma donors and seekers',
        ]);

        \Yii::$app->view->registerMetaTag([
            'name' => 'og:type',
            'content' => 'website',
        ]);

        return $this->render('index');
    }


    /**
     * Displays terms page.
     *
     * @return string
     */
    public function actionTerms()
    {
        \Yii::$app->view->title = 'Terms and Conditions | PlasmaGhar';
        return $this->render('terms');
    }



    /**
     * Send Feedback
     */
    public function actionFeedback()
    {
        try {  

        $request = \Yii::$app->request;

        if(!$request->isAjax) {
                throw new NotFoundHttpException;
        }
        $result = [];
        $feedback = $request->post();
        $model = new UserFeedbacks();
        $model->name = $feedback['name'];
        $model->email = $feedback['email'];
        $model->message = $feedback['message'];

        if($model->save()) {
            $result = array(
                'success' => true,
            );

        } else {
            $result = array(
                'success' => false,
                'error' => $model->getErrors()
            );
        }
        return $this->asJson($result);
   
        } catch(\Exception $exception) {
        return $this->asJson(array(
            'success' => false,
            'error' => $exception->getMessage()
        ));
        }  
    }
}
