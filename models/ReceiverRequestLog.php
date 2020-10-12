<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "receiver_request_log".
 *
 * @property int $id
 * @property int $receiver_id
 * @property int $donor_id
 * @property string $requested_date
 * @property string $updated_date
 * @property int $request_status
 * @property string $requested_blood_group
 *
 * @property Users $donor
 * @property Users $receiver
 */
class ReceiverRequestLog extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'receiver_request_log';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['receiver_id', 'donor_id', 'request_status', 'requested_blood_group'], 'required'],
            [['receiver_id', 'donor_id', 'request_status'], 'integer'],
            [['requested_date', 'updated_date'], 'safe'],
            [['requested_blood_group'], 'string', 'max' => 50],
            [['donor_id'], 'exist', 'skipOnError' => true, 'targetClass' => Users::className(), 'targetAttribute' => ['donor_id' => 'id']],
            [['receiver_id'], 'exist', 'skipOnError' => true, 'targetClass' => Users::className(), 'targetAttribute' => ['receiver_id' => 'id']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'receiver_id' => 'Receiver ID',
            'donor_id' => 'Donor ID',
            'requested_date' => 'Requested Date',
            'updated_date' => 'Updated Date',
            'request_status' => 'Request Status',
            'requested_blood_group' => 'Requested Blood Group',
        ];
    }

    /**
     * Gets query for [[Donor]].
     *
     * @return \yii\db\ActiveQuery|UsersQuery
     */
    public function getDonor()
    {
        return $this->hasOne(Users::className(), ['id' => 'donor_id']);
    }

    /**
     * Gets query for [[Receiver]].
     *
     * @return \yii\db\ActiveQuery|UsersQuery
     */
    public function getReceiver()
    {
        return ($this->hasOne(Users::className(), ['id' => 'receiver_id']));
    }

    /**
     * {@inheritdoc}
     * @return ReceiverRequestLogQuery the active query used by this AR class.
     */
    public static function find()
    {
        return new ReceiverRequestLogQuery(get_called_class());
    }
}
