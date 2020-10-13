<?php

namespace app\models;
// use app\models\ReceiverRequestLog;


use Yii;
/**
 * This is the model class for table "users".
 *
 * @property int $id
 * @property string $phone_number
 * @property string $password
 * @property string|null $blood_group
 * @property string|null $state
 * @property string|null $district
 * @property string|null $municipality
 * @property int|null $ward_no
 * @property float|null $marker_lat
 * @property float|null $marker_lng
 * @property int|null $user_role
 * @property int|null $user_status
 * @property int|null $env
 * @property string $created_date
 * @property string $updated_date
 * @property string|null $password_salt
 * @property string|null $password_hash_algorithm
 * @property string|null $phone_confirmation_token
 * @property string|null $password_reminder_token
 * @property string|null $password_reminder_expire
 * @property string|null $remember_me_token
 * @property int|null $phone_confirmation_status
 * @property string|null $auth_key
 *
 * @property ReceiverRequestLog[] $receiverRequestLogs
 * @property ReceiverRequestLog[] $receiverRequestLogs0
 */
class Users extends \yii\db\ActiveRecord
{
    const USER_STATUS_ACTIVATED = 0;
    const USER_STATUS_DEACTIVATED = 1;
    const TEST_ENV = 0;
    const PRODUCTION_ENV=1;



    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'users';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['phone_number', 'password'], 'required'],
            [['ward_no', 'user_role', 'user_status', 'env', 'phone_confirmation_status'], 'integer'],
            [['marker_lat', 'marker_lng'], 'number'],
            [['created_date', 'updated_date', 'password_reminder_expire'], 'safe'],
            [['phone_number'], 'string', 'max' => 10],
            [['password'], 'string', 'max' => 200],
            [['blood_group', 'state', 'district', 'password_salt', 'password_hash_algorithm', 'auth_key'], 'string', 'max' => 50],
            [['municipality', 'phone_confirmation_token', 'password_reminder_token', 'remember_me_token'], 'string', 'max' => 100],
        ];
    }


    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'phone_number' => 'Phone Number',
            'password' => 'Password',
            'blood_group' => 'Blood Group',
            'state' => 'State',
            'district' => 'District',
            'municipality' => 'Municipality',
            'ward_no' => 'Ward No',
            'marker_lat' => 'Marker Lat',
            'marker_lng' => 'Marker Lng',
            'user_role' => 'User Role',
            'user_status' => 'User Status',
            'env' => 'Env',
            'created_date' => 'Created Date',
            'updated_date' => 'Updated Date',
            'password_salt' => 'Password Salt',
            'password_hash_algorithm' => 'Password Hash Algorithm',
            'phone_confirmation_token' => 'Phone Confirmation Token',
            'password_reminder_token' => 'Password Reminder Token',
            'password_reminder_expire' => 'Password Reminder Expire',
            'remember_me_token' => 'Remember Me Token',
            'phone_confirmation_status' => 'Phone Confirmation Status',
            'auth_key' => 'Auth Key',
        ];
    }

    /**
     * Gets query for [[getReceiverRequestLogByDonorId]].
     *
     * @return \yii\db\ActiveQuery|ReceiverRequestLogQuery
     */
    public function getReceiverRequestLogByDonorId()
    {
        return $this->hasMany(ReceiverRequestLog::className(), ['donor_id' => 'id']);
    }

    /**
     * Gets query for [[getReceiverRequestByReceiverId]].
     *
     * @return \yii\db\ActiveQuery|ReceiverRequestLogQuery
     */
    public function getReceiverRequestByReceiverId()
    {
        return $this->hasMany(ReceiverRequestLog::className(), ['receiver_id' => 'id']);
    }

    /**
     * Gets query for [[UsersAdditionalInfos]].
     *
     * @return \yii\db\ActiveQuery|UsersAdditionalInfoQuery
     */
    

    /**
     * {@inheritdoc}
     * @return UsersQuery the active query used by this AR class.
     */
    public static function find()
    {
        return new UsersQuery(get_called_class());
    }


    public static function getRequesterList($id){

        $requester_list = Users::find()
                ->select(['*'])
                ->innerJoin('receiver_request_log', 'receiver_request_log.donor_id=users.id')
                ->where(['receiver_request_log.donor_id'=>$id])
                ->asArray()
                ->all();
        return $requester_list;

    }
}
