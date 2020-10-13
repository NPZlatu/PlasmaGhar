<?php

namespace app\controllers;
use Yii;

use app\models\Users;
use app\models\LoginForm;
use app\models\ReceiverRequestLog;
use yii\web\NotFoundHttpException;


class UserController extends \yii\web\Controller
{
    public function actionIndex()
    {
        //check if user is not logged in
        if(Yii::$app->user->isGuest) {
            throw new NotFoundHttpException;
        }  

        $donor = Yii::$app->user->identity->user_role === '0';
        $receiver = Yii::$app->user->identity->user_role === '1';
        dd($donar);

        
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
        
        
          

          $request_log=$users->getRequesterList($users->id);
        //  dd($request_log);
        
        
        // $request_log=ReceiverRequestLog::find()->with('users')->all();
        
        // $request_log=ReceiverRequestLog::find()

        $res['model']=$users;
        $res['role_value']=$role;

        $res['request_log']=$request_log;

        // dd($res['request_log']);
        
        
        return $this->render('index' , ['res'=>$res]);
        

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
            $model->password = $user['password'];
            $model->user_role = $user['user_role'];

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
            $request = \Yii::$app->request;            
        
            if(!$request->isAjax) {
                throw new NotFoundHttpException;
            }

            //check if already logged in
            if(!\Yii::$app->user->isGuest){
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

}
