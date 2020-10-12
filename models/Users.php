<?php

namespace app\models;
// use app\models\ReceiverRequestLog;


use Yii;

/**
 * This is the model class for table "users".
 *
 * @property int $id
 * @property string $phone_number
 * @property string $first_name
 * @property string $last_name
 * @property string $email
 * @property string|null $password
 * @property int|null $user_role
 * @property int|null $user_status
 * @property int|null $env
 * @property string|null $password_salt
 * @property string|null $password_hash_algorithm
 * @property string $created_date
 * @property string $updated_date
 * @property string|null $email_confirmation_token
 * @property string|null $password_reminder_token
 * @property string|null $password_reminder_expire
 * @property string|null $remember_me_token
 * @property int|null $email_confirmation_status
 *
 * @property ReceiverRequestLog[] $receiverRequestLogs
 * @property ReceiverRequestLog[] $receiverRequestLogs0
 * @property UsersAdditionalInfo[] $usersAdditionalInfos
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
            [['phone_number', 'first_name', 'last_name', 'email'], 'required'],
            [['user_role', 'user_status', 'env', 'email_confirmation_status'], 'integer'],
            [['created_date', 'updated_date', 'password_reminder_expire'], 'safe'],
            [['phone_number'], 'string', 'max' => 10],
            [['first_name', 'last_name', 'email_confirmation_token', 'password_reminder_token', 'remember_me_token'], 'string', 'max' => 100],
            [['email'], 'string', 'max' => 254],
            [['password'], 'string', 'max' => 200],
            [['password_salt', 'password_hash_algorithm'], 'string', 'max' => 50],
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
            'first_name' => 'First Name',
            'last_name' => 'Last Name',
            'email' => 'Email',
            'password' => 'Password',
            'user_role' => 'User Role',
            'user_status' => 'User Status',
            'env' => 'Env',
            'password_salt' => 'Password Salt',
            'password_hash_algorithm' => 'Password Hash Algorithm',
            'created_date' => 'Created Date',
            'updated_date' => 'Updated Date',
            'email_confirmation_token' => 'Email Confirmation Token',
            'password_reminder_token' => 'Password Reminder Token',
            'password_reminder_expire' => 'Password Reminder Expire',
            'remember_me_token' => 'Remember Me Token',
            'email_confirmation_status' => 'Email Confirmation Status',
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
    public function getUsersAdditionalInfos()
    {
        return $this->hasMany(UsersAdditionalInfo::className(), ['user_id' => 'id']);
    }

    /**
     * {@inheritdoc}
     * @return UsersQuery the active query used by this AR class.
     */
    public static function find()
    {
        return new UsersQuery(get_called_class());
    }


    public static function getRequesterList($id){

        $sql = 'select u.*, r.* from users u
                left join receiver_request_log r on r.receiver_id = u.id
                where r.donor_id='.$id;
        
        $requester_list=Users::findBySql($sql)->all();


        // $requester_list = Users::find()
        // ->leftJoin('receiver_request_log', '`receiver_request_log`.`donor_id` = `users`.`id`')
        // ->where(['donor_id' => $id])
        // ->with('receiver_request_log')
        // ->all();
                        
        
                        // ->joinWith('receiver_request_log')
                        // ->where(['receiver_request_log.donor_id'=>$id])
                        // ->all();
                        
                        // ->leftJoin('receiver_request_log', '`receiver_request_log`.`donor_id` = `users`.`id`')
                        // ->where(['donor_id' => $id])
                        // ->with('receiver_request_log')
                        // ->all();

        // dd($requester_list);
        return $requester_list;

    }
}
