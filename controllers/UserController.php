<?php

namespace app\controllers;
use Yii;

use yii\filters\AccessControl;
use yii\filters\VerbFilter;

use app\models\Users;
use app\models\UserNotifications;
use app\models\LoginForm;
use app\models\ReceiverRequestLog;
use yii\web\NotFoundHttpException;
use yii\helpers\Url;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;


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
                        'actions' => ['request-donor'],
                        'allow' => true,
                        'roles' => ['@'],
                    ],
                    [
                        'actions' => ['accept-requester'],
                        'allow' => true,
                        'roles' => ['@'],
                    ],
                    [
                        'actions' => ['confirm-blood'],
                        'allow' => true,
                        'roles' => ['@'],
                    ],
                    [
                        'actions' => ['cancel-request'],
                        'allow' => true,
                        'roles' => ['@'],
                    ],
                    [
                        'actions' => ['index'],
                        'allow' => true,
                        'roles' => ['@'],
                    ],
                    [
                        'actions' => ['search'],
                        'allow' => true,
                        'roles' => ['@'],
                    ],
                    [
                        'actions' => ['save'],
                        'allow' => true,
                        'roles' => ['?'],
                    ],
                    [
                        'actions' => ['update'],
                        'allow' => true,
                        'roles' => ['@'],
                    ],
                    [
                        'actions' => ['login'],
                        'allow' => true,
                        'roles' => ['?'],
                    ],
                    [
                        'actions' => ['change-active-status'],
                        'allow' => true,
                        'roles' => ['@'],
                    ], 
                    [
                        'actions' => ['change-password'],
                        'allow' => true,
                        'roles' => ['@'],

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
        //check if user is not logged in
        if(Yii::$app->user->isGuest) {
            throw new NotFoundHttpException;
        }  
        $donor = Yii::$app->user->identity->user_role === 0;
        $receiver = Yii::$app->user->identity->user_role === 1;
        $lists = [];

        if($donor) {
            $lists=Users::getRequesterList(Yii::$app->user->id);
        }
        else if($receiver) {
            $lists=Users::getDonorList(Yii::$app->user->id);
        }
        $users = Yii::$app->user->identity;
        $res['model']=$users;
        $res['role_value']=$receiver===true?'Receiver':'Donor';
        $res['lists']=$lists;
        return $this->render('index' , ['res'=>$res]);
    }

    public function actionUpdate()
    {
        try {
            $request = \Yii::$app->request;
            $result = [];

            if(!$request->isAjax) {
                throw new NotFoundHttpException;
            }

            if(Yii::$app->user->isGuest) {
                throw new NotFoundHttpException;
            }  

            $user = $request->post();

            if($user['id'] != Yii::$app->user->id) {
                throw new NotFoundHttpException;;
            }

            $model = Users::find()->where(['id' => $user['id']])->one();
            $model->blood_group = $user['blood_group'];
            $model->state = $user['state'];
            $model->district = $user['district'];

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


        }  catch(\Exception $exception) {
            return $this->asJson(array(
                'success' => false,
                'error' => $exception->getMessage()
            ));
    }  

    }

    /**
     * Change Password
     */
    public function actionChangePassword() 
    {
    try {
        $request = \Yii::$app->request;
        $result = [];

        if(!$request->isAjax) {
                throw new NotFoundHttpException;
        }

        $user = $request->post();


        if($user['id'] != Yii::$app->user->id) {
            throw new NotFoundHttpException;;
        }

        $model = Users::find()->where(['id' => Yii::$app->user->id])->one();
        if($model->validatePassword($user['current_password'])) {
           $model->password = Yii::$app->security->generatePasswordHash($user['new_password']);
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

        } else {
            $result = array(
                'success' => false,
                'error' => 'Invalid current password'
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
     * Register User via Ajax Request
     */
    public function actionSave()
    {        
        try {  
            $request = \Yii::$app->request;

            if(!$request->isAjax) {
                return $this->render('signup');
            }

            $result = [];
            $user = $request->post();
            $model = new Users();
            $unique = Users::isUnique($user['email']);
            
            
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
            $model->email = $user['email'];

            if($model->save()) {
                $link = Url::home(true).'user/confirm/'.$model->phone_confirmation_token;
                $smsResult = $this->sendEmail(
                    'Please click on the given link to activate your account on PlasmaGhar -> '.$link, 
                $user['email'], 'Activation Link');
                $result = array(
                    'success' => true
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
     * Save notification in db
     */
    public function saveNotification($message, $userId) {
        $return = false;
        $model = new UserNotifications();
        $model->notification = $message;
        $model->created_time = date('Y-m-d H:i:s');
        $model->user_id = $userId;
        if($model->save()) {
            $return = true;
        }

        return $return;
    }


    /**
     * Send SMS
     */
    public function sendEmail($message, $email, $subject) {
        $mail = new PHPMailer(true);
        try {

        $mail->SMTPDebug = 0;
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; 
        $mail->Port = 465;
        $mail->Username = 'testniraj1234@gmail.com';
        $mail->Password = 'NirazPaudel62';

        $mail->setFrom('testniraj1234@gmail.com', 'Plasma Ghar');
        $mail->addAddress($email, $email);
        $mail->addReplyTo('testniraj1234@gmail.com', 'Plasma Ghar');
        $mail->IsHTML(true);
        $mail->Subject = $subject;
        $mail->Body = $message;
        if($mail->send()) {
            return true;
        } else {
            return false;
        }
        
    } catch (Exception $e) {
        return false;
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
            $model->email = $user['email'];
            $model->password = $user['password'];
            $model->remember_me = $user['remember_me'];


            $accountConfirmed = Users::isAccountConfirmed($user['email']);

            if(!$accountConfirmed) {
                return $this->asJson(array(
                    'success' => false,
                    'error' => 'account not confirmed'
                )); 
            }
            
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

    public function actionConfirm($token) {
        if(!isset($token) || !$token) {
        throw new NotFoundHttpException;
        }
        $model = Users::find()->where(['phone_confirmation_token' => $token, 'phone_confirmation_status' => 0])->one();
        if($model->id) {
            $model->phone_confirmation_status = 1;
            if($model->save()) {
                return $this->render('/user/login', array('confirm' => 'yes'));
            }
        }
        Yii::$app->session->setFlash('danger', 'The link you clicked has either expired or is not valid!');
        return $this->redirect(array('/'));
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
    
        $filter = [];

        if(!$request->isAjax) {
        $filter = $request->get();
        } else {
        $filter = $request->post();
        }
        $valid = true;
        $message = '';

        if(!$filter['blood_group']) {
            $valid = false;
            $message = "Blood group is missing!";
        }
        else if(!$filter['district']) {
            $invalid = false;
            $message = "District is missing!";

        } else if(!$filter['state']) {
            $valid = false;
            $message = "State is missing!";
        }

        if(!$valid) {
            if(!$request->isAjax) {
                Yii::$app->session->setFlash('danger', $message);
                return $this->redirect(array('/'));
            } else {
                return $this->asJson([]); 
            }
        }
        $userId = Yii::$app->user->id;

        $donorFound = Yii::$app->db->createCommand
        (
        "
        select u.id,u.blood_group,u.district,u.state,u.user_status
        from users u
        where u.user_role = 0
        and u.blood_group = :blood_group
        and u.state = :state
        and u.district = :district
        and u.user_status in (0,1)
        and u.phone_confirmation_status=1
        and u.id not in (select donor_id from receiver_request_log where receiver_id = :user_id)
        "
        )
        ->bindValue(':user_id' , $userId)
        ->bindValue(':blood_group' , $filter['blood_group'])
        ->bindValue(':state' , $filter['state'])
        ->bindValue(':district' , $filter['district'])
        ->queryAll();

        if(!$request->isAjax) {
            if(Yii::$app->user->identity->user_role === 0) {
                return $this->redirect('/');
            }
            return $this->render('search' , ['donors'=>$donorFound]);

        } else {
            return $this->asJson($donorFound);
        }
    }


    /**
     * Request Donor
     */
    public function actionRequestDonor() {
        try {  
            $request = Yii::$app->request;

            if(!$request->isAjax || Yii::$app->user->identity->user_role === 0) {
                throw new NotFoundHttpException;
            }
            $result = [];
            $donor = $request->post();
            $receiverId = Yii::$app->user->id;
            
            $params = [
                'p_donor_id' => $donor['p_donor_id'],
                'p_requested_blood_group' => $donor['p_requested_blood_group'],
                'p_requested_state' => $donor['p_requested_state'],
                'p_requested_district' => $donor['p_requested_district'],
                'p_receiver_id' => $receiverId ,
                'p_action' => 'apply',
                'p_action_by' => 'receiver',
                'p_relationship' => 'same' 
            ];

            $result = Users::setStatus($params); 
            if(isset($result['t_result']) && $result['t_result'] == 'Your apply request is succeeded.') {
                $donorId = $params['p_donor_id'];
                $donorEmail = Users::getEmail($params['p_donor_id']); 
                if(!$donorEmail) {
                    return $this->asJson(array(
                        'success' => false,
                        'error' => 'no donor phone is found'
                    ));
                }
                $receiverId = Yii::$app->user->id;
                $link = Url::home(true).'dashboard';

                $message = 'URGENT URGENT!! A seeker with the identity Requester-'.$receiverId.' is in need of your plasma. Please go to the link and accept his/her request to share your number with him/her -> '.$link;

                if(!$this->saveNotification(
                    
                    '<a href="' . $link . '">' . "A requester $receiverId is in need of your plasma. View in dashboard." . '</a>'
                    , $donorId)) {
                    return $this->asJson(array(
                        'success' => false,
                        'error' => "Error while saving notification to db."
                    )); 
                } 

                if($this->sendEmail($message, $donorEmail, 'Urgent Request for Plasma')) {
                    $result['message'] = $message;
                } else {
                    return $this->asJson(array(
                        'success' => false,
                        'error' => "Error while sending email."
                    )); 
                }
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
     * Accept Requester
     */
    public function actionAcceptRequester() {
        try {  
            $request = Yii::$app->request;

            if(!$request->isAjax || Yii::$app->user->identity->user_role === 1) {
                throw new NotFoundHttpException;
            }
            $result = [];
            $params = $request->post();
            $donorId = Yii::$app->user->id;

            if($donorId != $params['p_donor_id']) {
                throw new NotFoundHttpException;
            }
            $result = Users::setStatus($params); 


            if(isset($result['t_result']) && $result['t_result'] == 'Your accept request is succeeded.') {
                $receiverEmail = Users::getEmail($params['p_receiver_id']); 
                if(!$receiverEmail) {
                    return $this->asJson(array(
                        'success' => false,
                        'error' => 'no receiver email is found'
                    ));
                }
                $donorPhone = Yii::$app->user->identity->phone_number;
                $message = 'Congratulations, A donar with the identity Donor-'.$donorId.' has just accepted your blood request. You can call donor on this number '.$donorPhone.'. If the blood is confirmed or there are some problems on confirmation, please update your status on our dashboard';
                
                if(!$this->saveNotification($message, $params['p_receiver_id'])) {
                    return $this->asJson(array(
                        'success' => false,
                        'error' => "Error while saving notification to db."
                    )); 
                } 

                if($this->sendEmail($message, $receiverEmail, 'Donor Accepted Your Request')) {
                    $result['message'] = $message;
                } else {
                    return $this->asJson(array(
                        'success' => false,
                        'error' => "Error while sending email."
                    )); 
                } 
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
     * Confirm Blood
     */
    public function actionConfirmBlood() {
        try {  
            $request = Yii::$app->request;

            if(!$request->isAjax) {
                throw new NotFoundHttpException;
            }
            $params = $request->post();

            if($params['action_by'] === 'donor') {
                if(Yii::$app->user->identity->user_role === 1) { 
                    throw new NotFoundHttpException;
                }
                $donorId = Yii::$app->user->id;
                if($donorId != $params['p_donor_id']) {
                    throw new NotFoundHttpException;
                }
            }

            if($params['action_by'] === 'receiver') {
                if(Yii::$app->user->identity->user_role === 0) { 
                    throw new NotFoundHttpException;
                }
                $receiverId = Yii::$app->user->id;
                if($receiverId != $params['p_receiver_id']) {
                    throw new NotFoundHttpException;
                }
            }
            $result = [];       
            $result = Users::setStatus($params); 
            return $this->asJson($result);

        } catch(\Exception $exception) {
                return $this->asJson(array(
                    'success' => false,
                    'error' => $exception->getMessage()
                ));
        }  

    }


      /**
     * Cancel Request
     */
    public function actionCancelRequest() {
        try {  
            $request = Yii::$app->request;

            if(!$request->isAjax) {
                throw new NotFoundHttpException;
            }
            $params = $request->post();

            if($params['action_by'] === 'donor') {
                if(Yii::$app->user->identity->user_role === 1) { 
                    throw new NotFoundHttpException;
                }
                $donorId = Yii::$app->user->id;
                if($donorId != $params['p_donor_id']) {
                    throw new NotFoundHttpException;
                }
            }

            if($params['action_by'] === 'receiver') {
                if(Yii::$app->user->identity->user_role === 0) { 
                    throw new NotFoundHttpException;
                }
                $receiverId = Yii::$app->user->id;
                if($receiverId != $params['p_receiver_id']) {
                    throw new NotFoundHttpException;
                }
            }

            $result = [];  

                        
            $result = Users::setStatus($params); 
            return $this->asJson($result);

        } catch(\Exception $exception) {
                return $this->asJson(array(
                    'success' => false,
                    'error' => $exception->getMessage()
                ));
        }  

    }


    /**
     * Activate/Deactivate users
     */
    public function actionChangeActiveStatus() {
        try {  
            $request = Yii::$app->request;

            if(!$request->isAjax) {
                throw new NotFoundHttpException;
            }
            $user = $request->post();

            $model = Users::findOne(Yii::$app->user->id);

            /* deactivate user */
            if($user['user_status'] == 9) {
              $model->user_status = 9;
            }

            /* activate user */
            if($user['user_status'] == 0) {
                $model->user_status = 0;
            }

            if(!$model->save()) {
                throw $model->getErrors();
            }
            return $this->asJson(array(
                'success' => true,
            ));

        } catch(\Exception $exception) {
            return $this->asJson(array(
                'success' => false,
                'error' => $exception->getMessage()
            ));
    }  
    }

}
