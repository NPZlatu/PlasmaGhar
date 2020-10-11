<?php

namespace app\controllers;


class UserController extends \yii\web\Controller
{
    public function actionIndex()
    {
        return $this->render('index');
    }

    public function actionSave()
    {        
        try {   
        $rawUserData = \Yii::$app->request->getRawBody();
        $user = json_decode($rawUserData);
        $model = new \app\models\Users();

        $countOfPhones = $model->find()->where(['phone_number' => $user->phone_number])->count();
        if($countOfPhones > 0) {
            return $this->asJson(array(
                'success' => false,
                'error' => 'exist already'
            )); 
        }
        $result = [];

        $model->first_name = $user->first_name;
        $model->last_name = $user->last_name;
        $model->phone_number = $user->phone_number;
        $model->password = \Yii::$app->security->generatePasswordHash($user->password);
        $model->user_role = $user->user_role;
        $model->email = $user->email ? $user->email : null;
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
                'error' => $exception
            ));
        }  
      

    }

}
