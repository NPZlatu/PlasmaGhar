<?php

namespace app\controllers;
use app\models\States;
use app\models\Districts;
use yii\web\NotFoundHttpException;

class AddressController extends \yii\web\Controller
{
    public function actionGetStates()
    {
        $request = \Yii::$app->request;

        if(!$request->isAjax) {
            throw new NotFoundHttpException;
        }
        $states = States::find()
        ->select(['code','name'])->all();

        return $this->asJson($states);
    }

    public function actionGetDistricts()
    {
        $request = \Yii::$app->request;
        if(!$request->isAjax) {
            throw new NotFoundHttpException;
        }
        $districts = [];
        if($request->queryParams['code']) {
            $districts = Districts::find()
            ->select(['code','name'])
            ->andWhere(['state_code' => $request->queryParams['code']])
            ->distinct()
            ->all();
        }        
        return $this->asJson($districts);
    }

}
