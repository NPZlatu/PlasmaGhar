<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "Users".
 *
 * @property int $id
 * @property string $phone_number
 * @property string $first_name
 * @property string $last_name
 * @property string|null $email
 * @property string|null $password
 * @property int|null $user_role
 * @property int|null $user_status
 * @property int|null $env
 * @property string|null $password_salt
 * @property string|null $password_hash_algorithm
 * @property string $created_date
 * @property string|null $email_confirmation_token
 * @property string|null $password_reminder_token
 * @property string|null $password_reminder_expire
 * @property string|null $remember_me_token
 * @property int|null $email_confirmation_status
 * @property string|null $auth_key
 */
class Users extends \yii\db\ActiveRecord implements \yii\web\IdentityInterface
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'Users';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['phone_number', 'first_name', 'last_name'], 'required'],
            [['user_role', 'user_status', 'env', 'email_confirmation_status'], 'integer'],
            [['created_date', 'password_reminder_expire'], 'safe'],
            [['phone_number'], 'string', 'max' => 10],
            [['first_name', 'last_name', 'email_confirmation_token', 'password_reminder_token', 'remember_me_token'], 'string', 'max' => 100],
            [['email'], 'string', 'max' => 254],
            [['password'], 'string', 'max' => 200],
            [['password_hash_algorithm', 'auth_key'], 'string', 'max' => 50],
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
            'email_confirmation_token' => 'Email Confirmation Token',
            'password_reminder_token' => 'Password Reminder Token',
            'password_reminder_expire' => 'Password Reminder Expire',
            'remember_me_token' => 'Remember Me Token',
            'email_confirmation_status' => 'Email Confirmation Status',
            'auth_key' => 'Auth Key',
        ];
    }

    public function getAuthKey() {
        return $this->auth_key;
    } 

    public function getId() {
        return $this->id;
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
}
