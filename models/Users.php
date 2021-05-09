<?php

namespace app\models;

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
class Users extends \yii\db\ActiveRecord implements \yii\web\IdentityInterface
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

    public function beforeSave($insert){
        if (parent::beforeSave($insert)) {
            if ($this->isNewRecord) {
                $this->auth_key = \Yii::$app->security->generateRandomString();
                $this->phone_confirmation_token = \Yii::$app->security->generateRandomString();
                $this->password = \Yii::$app->security->generatePasswordHash($this->password);

            }
            return true;
        }
        return false;
    }

    /**
     * Gets query for [[ReceiverRequestLogs]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getReceiverRequestLogs()
    {
        return $this->hasMany(ReceiverRequestLog::className(), ['donor_id' => 'id']);
    }

    /**
     * Gets query for [[ReceiverRequestLogs0]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getReceiverRequestLogs0()
    {
        return $this->hasMany(ReceiverRequestLog::className(), ['receiver_id' => 'id']);
    }

    /**
     * Gets query for [[UsersAdditionalInfos]].
     *
     * @return \yii\db\ActiveQuery|UsersAdditionalInfoQuery
     */
    

    public function validateAuthKey($authKey) {
        return $this->auth_key == $authKey;

    }

    public static function findIdentity($id) {
        return self::findOne($id);
    }

    public static function findIdentityByAccessToken($token, $type = null) {
        throw new \yii\base\NotSupportedException();
    }

    public static function findByPhoneNumber($phone) {
        return self::findOne(['phone_number' => $phone]);
    }

    public static function findByEmail($email) {
        return self::findOne(['email' => $email]);
    }

    

    public function validatePassword($password) {
        if(Yii::$app->getSecurity()->validatePassword($password, $this->password)){
            return true;
        } else {
            return false;
        }
    }

    public function getAuthKey() {
        return $this->auth_key;
    } 


    public function getId() {
        return $this->id;
    }

    public function getUser_Role() {
        return $this->user_role;;
    }

    /**
     * Checks if user with the phone already exist
     */
    public static function isUnique($email) {
        $unique = true;
        $count = self::find()->where(['email' => $email])->count();
        if($count > 0) $unique = false;
        return $unique;
    }

      /**
     * Checks if user with the phone already exist
     */
    public static function isAccountConfirmed($email) {
        $confirmed = false;
        $count = self::find()->where(['email' => $email, 'phone_confirmation_status' => 1])->count();
        if($count > 0) $confirmed = true;
        return $confirmed;
    }


    /**
     * Get Phone
     * @param $user_id string
     */
    public static function getPhone($user_id) {
        $return = null;
        $user = self::findOne(['id' => $user_id]);
        if($user && $user['phone_number']) {
            $return = $user['phone_number'];
        }
        return $return;
    }

    /**
     * Get status
     * @param $user_id string
     */
    public static function getStatus($user_id) {
        $return = null;
        $user = self::findOne(['id' => $user_id]);
        if($user && $user['user_status']) {
            $return = $user['user_status'];
        }
        return $return;
    }

    /**
     * Get Email
     * @param $user_id string
     */
    public static function getEmail($user_id) {
        $return = null;
        $user = self::findOne(['id' => $user_id]);
        if($user && $user['email']) {
            $return = $user['email'];
        }
        return $return;
    }

    /**
     * Set status - donor/receiver/request
     */
    public static function setStatus($params) {
        if (empty($params)) {
            throw new CHttpException(404,'no params is supplied for changing status.');
        }
        $return = [];
        $result = Yii::$app->db->createCommand
        ("CALL sp_setStatus(:p_receiver_id,:p_donor_id, 
        :p_requested_blood_group, :p_requested_state, :p_requested_district,:p_action,:p_action_by,:p_relationship)")
        ->bindValue(':p_receiver_id' , $params['p_receiver_id'] )
        ->bindValue(':p_donor_id', $params['p_donor_id'])
        ->bindValue(':p_requested_blood_group', 
         $params['p_requested_blood_group'] ? $params['p_requested_blood_group']:null )
         ->bindValue(':p_requested_state', 
         $params['p_requested_state'] ? $params['p_requested_state']:null )
         ->bindValue(':p_requested_district', 
         $params['p_requested_district'] ? $params['p_requested_district']:null )
        ->bindValue(':p_action', $params['p_action'])
        ->bindValue(':p_action_by', $params['p_action_by'])
        ->bindValue(':p_relationship', $params['p_relationship'])
        ->queryAll();
        if($result && count($result) > 0) {
            $return = $result[0];
        }
        return $return;
    }



    /**
     * Get all requesters having logs with donors
     */
    public static function getRequesterList($id){
        $result = Yii::$app->db->createCommand
        (
        "
        SELECT `users`.`id`, 
        `users`.`blood_group`, 
        `users`.`state`, 
        `users`.`district`, 
        `users`.`user_role`, 
        `users`.`user_status`, 
        `users`.`created_date`, 
        `users`.`updated_date`, 
        `users`.`phone_confirmation_status`, 
        `users`.`apply_count`, 
        `users`.`blood_confirmation_count`, 
        `receiver_request_log`.`requested_district`, 
        `receiver_request_log`.`requested_state`, 
        `receiver_request_log`.`receiver_id`, 
        `receiver_request_log`.`donor_id`, 
        `receiver_request_log`.`request_status`, 
        `receiver_request_log`.`requested_blood_group`, 
        `receiver_request_log`.`requested_date`, 
        `receiver_request_log`.`request_updated_date`, 
        `receiver`.`user_status` AS `receiver_status` 
 FROM   `users` 
        INNER JOIN `receiver_request_log` 
                ON receiver_request_log.donor_id = users.id 
        INNER JOIN `users` `receiver` 
                ON receiver_request_log.receiver_id = receiver.id 
 WHERE  `receiver_request_log`.`donor_id` = :user_id 
        "
        )
        ->bindValue(':user_id' , $id)
        ->queryAll();
        return $result;
    }

    /**
     * Get all donors having logs with receivers
     */
    public static function getDonorList($id){

        $result = Yii::$app->db->createCommand
        (
        "
        SELECT `users`.`id`, 
            `users`.`blood_group`, 
            `users`.`state`, 
            `users`.`district`, 
            `users`.`user_role`, 
            `users`.`user_status`, 
            `users`.`created_date`, 
            `users`.`updated_date`, 
            `users`.`phone_confirmation_status`, 
            `users`.`apply_count`, 
            `users`.`blood_confirmation_count`, 
            `receiver_request_log`.`requested_district`, 
            `receiver_request_log`.`requested_state`, 
            `receiver_request_log`.`receiver_id`, 
            `receiver_request_log`.`donor_id`, 
            `receiver_request_log`.`request_status`, 
            `receiver_request_log`.`requested_blood_group`, 
            `receiver_request_log`.`requested_date`, 
            `receiver_request_log`.`request_updated_date`, 
            `donor`.`user_status` AS `donor_status` 
        FROM   `users` 
            INNER JOIN `receiver_request_log` 
                    ON receiver_request_log.receiver_id = users.id 
            INNER JOIN `users` `donor` 
                    ON receiver_request_log.donor_id = donor.id 
        WHERE  `receiver_request_log`.`receiver_id` = :user_id 
        "
        )
        ->bindValue(':user_id' , $id)
        ->queryAll();
        return $result;

    }

    public static function sendSMS($message) {

    }


}
