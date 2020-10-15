<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "districts".
 *
 * @property int $id
 * @property string $name
 * @property int $code
 * @property int $state_code
 *
 * @property States $stateCode
 */
class Districts extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'districts';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['name', 'code', 'state_code'], 'required'],
            [['code', 'state_code'], 'integer'],
            [['name'], 'string', 'max' => 50],
            [['state_code'], 'exist', 'skipOnError' => true, 'targetClass' => States::className(), 'targetAttribute' => ['state_code' => 'id']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'name' => 'Name',
            'code' => 'Code',
            'state_code' => 'State Code',
        ];
    }

    /**
     * Gets query for [[StateCode]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getStateCode()
    {
        return $this->hasOne(States::className(), ['id' => 'state_code']);
    }
}
