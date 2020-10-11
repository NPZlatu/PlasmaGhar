<?php

namespace app\controllers;

use app\models\Users;

class UserController extends \yii\web\Controller
{
    public function actionIndex()
    {
        $res=[];
        $id=1;
        $model = Users::findOne($id);
        if($model->user_role==0){
            $role='Plasma Donor';
        }else{
            $role='Plasma Receiver';
        }

        $test = Users::findOne($id)->getUsersAdditionalInfos();
        
        $res['model']=$model;
        $res['role_value']=$role;
        dd($test);
        

        
        return $this->render('index' , ['res'=>$res]);
        

    }

}
