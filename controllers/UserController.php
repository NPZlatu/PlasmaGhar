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

        $donor = Yii::$app->user->identity->user_role === 0;
        $receiver = Yii::$app->user->identity->user_role === 1;

        // dd($receiver);
        
        
        $users = Yii::$app->user->identity;
        $request_log=Users::getRequesterList(Yii::$app->user->id);
        
        $res['model']=$users;
        $res['role_value']=$receiver===true?'Receiver':'Donor';

        $res['request_log']=$request_log;

        // dd(sizeof($res['request_log']));

        
        
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
