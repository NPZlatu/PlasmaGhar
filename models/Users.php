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
    public function getUsersAdditionalInfos()
    {
        return $this->hasMany(UsersAdditionalInfo::className(), ['user_id' => 'id']);
    }

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
    public static function isUnique($phone) {
        $unique = true;
        $count = self::find()->where(['phone_number' => $phone])->count();
        if($count > 0) $unique = false;
        return $unique;
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
