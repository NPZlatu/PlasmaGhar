<?php

namespace app\controllers;
use Yii;

use app\models\Users;
use app\models\ReceiverRequestLog;
use yii\web\NotFoundHttpException;

class UserController extends \yii\web\Controller
{
    public function actionIndex()
    {
        $res=[];
        $id=6;


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

}
