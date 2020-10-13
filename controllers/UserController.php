<?php

namespace app\controllers;
use Yii;

use app\models\Users;
use app\models\ReceiverRequestLog;
use yii\web\NotFoundHttpException;
use yii\data\Pagination;

class UserController extends \yii\web\Controller
{
    public function actionIndex()
    {
        $res=[];
        $id=5;


        $users = Users::findOne($id);
        
        if ($users === null) {
            throw new NotFoundHttpException;
        }else{
            if($users->user_role==0){
                $role='Plasma Donor';
            }else{
                $role='Plasma Receiver';
            }
        }
        
        $request_log=$users->getRequesterList($users->id);
        

        $res['model']=$users;
        $res['role_value']=$role;

        $res['request_log']=$request_log;

        // dd($res['model']);
        
        
        

        
        return $this->render('index' , ['res'=>$res]);
        

    }

}
