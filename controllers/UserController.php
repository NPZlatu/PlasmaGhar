<?php

namespace app\controllers;
use Yii;

use yii\filters\AccessControl;
use yii\filters\VerbFilter;

use app\models\Users;
use app\models\LoginForm;
use app\models\ReceiverRequestLog;
use yii\web\NotFoundHttpException;


class UserController extends \yii\web\Controller
{

     /**
     * {@inheritdoc}
     */
    public function behaviors()
    {
        return [
            'access' => [
                'class' => AccessControl::className(),
                'only' => ['logout', 'index', 'save', 'login'],
                'rules' => [
                    [
                        'actions' => ['logout'],
                        'allow' => true,
                        'roles' => ['@'],
                    ],
                    [
                        'actions' => ['index'],
                        'allow' => true,
                        'roles' => ['@'],
                    ],
                    [
                        'actions' => ['save'],
                        'allow' => true,
                        'roles' => ['?'],
                    ],
                    [
                        'actions' => ['login'],
                        'allow' => true,
                        'roles' => ['?'],
                    ]
                ],
            ],
            'verbs' => [
                'class' => VerbFilter::className(),
                'actions' => [
                    'logout' => ['post']
                ],
            ],
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


    public function actionIndex()
    {
        
        $donor = Yii::$app->user->identity->user_role == 0;
        $receiver = Yii::$app->user->identity->user_role == 1;


        /*
        //select * from receiver_request_log where donor_id=id order by requested_date
        $receiver_request_log = $users->getReceiverRequestLogByDonorId()
                            ->orderBy('requested_date')
                            ->all();
        // rq($receiver_request_log);
        // dd($receiver_request_log);

        foreach($receiver_request_log as $receiver_request){
            // dd(gettype($receiver_request));
            $receiver_detail = $receiver_request->getReceiver();
            
            // rq($receiver_detail);
            dd($receiver_detail);
            $receiver_detail['phone_number'];
        }
        
        //  dd($receiver_request_log[0]);  
        
        */
        
        
          

        //   $request_log=$users->getRequesterList($users->id);
        // //  dd($request_log);
        
        
        // // $request_log=ReceiverRequestLog::find()->with('users')->all();
        
        // // $request_log=ReceiverRequestLog::find()

        // $res['model']=$users;
        // $res['role_value']=$role;

        // $res['request_log']=$request_log;

        // // dd($res['request_log']);
        
        
        return $this->render('index' , ['res'=>[]]);
        

    }

    /**
     * Register User via Ajax Request
     */
    public function actionSave()
    {        
        try {  
            $request = \Yii::$app->request;

            if(!$request->isAjax) {
                throw new NotFoundHttpException;
            }

            $result = [];
            $user = $request->post();
            $model = new Users();
            $unique = Users::isUnique($user['phone_number']);
            
            if(!$unique) {
                return $this->asJson(array(
                    'success' => false,
                    'error' => 'exist already'
                )); 
            }

            $model->phone_number = $user['phone_number'];
            $model->blood_group = $user['blood_group'];
            $model->state = $user['state'];
            $model->district = $user['district'];
            $model->user_role = $user['user_role'];
            $model->password = $user['password'];

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


    /**
     * Login the user via Ajax Request
     */
    public function actionLogin(){
        try {  
            $request = Yii::$app->request;            
        
            if(!$request->isAjax) {
                return $this->render('login');
            }

            //check if already logged in
            if(!Yii::$app->user->isGuest){
                $result = array(
                    'success' => false,
                    'error' => 'already logged in'
                );
            }

            $result = [];
            $user = $request->post();

            $model = new LoginForm();
            $model->phone_number = $user['phone_number'];
            $model->password = $user['password'];
            $model->remember_me = $user['remember_me'];
            
            if($model->login()) {
                $result = array(
                    'success' => true,
                );
            } else {
                $result = array(
                    'success' => false,
                );
            }
            return $this->asJson($result);

        } catch (\Exception $exception) {

            return $this->asJson(array(
                'success' => false,
                'error' => $exception->getMessage()
            ));
        }  
    }


    public function actionWhoAmI(){   
        $user = [];
        $request = Yii::$app->request;            
        if($request->isAjax) {
            if(Yii::$app->user->isGuest) {
                $user['id'] = null;
                $user['role'] = 'guest';
            } else if(Yii::$app->user->identity->user_role == '0') {
                $user['id'] = Yii::$app->user->id;
                $user['role'] = 'donor';
            } else if(Yii::$app->user->identity->user_role == '1') {
                $user['id'] = Yii::$app->user->id;
                $user['role'] = 'receiver';
            }
        }
        return $this->asJson($user);
    }


    /**
     * Logout action.
     *
     * @return Response
     */
    public function actionLogout()
    {
        Yii::$app->user->logout();
        return $this->goHome();
    }


    /**
     * Search Donar lists
     */
    public function actionSearch()
    {
        $request = \Yii::$app->request;

        if(!$request->isAjax) {
            throw new NotFoundHttpException;
        }
        $filter = $request->post();
        $DonorFound = Users::find()
        ->select('id,blood_group,district')
        ->where(['blood_group' => $filter['blood_group']])
        ->andWhere(['state' => $filter['state']])
        ->andWhere(['district' => $filter['district']])
        ->andWhere(['user_role' => 0])
        ->andWhere(['phone_confirmation_status' => 1])
        ->all();
        return $this->asJson($DonorFound);
    }

}
