<?php

namespace app\models;

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
 * @property UsersAdditionalInfo[] $usersAdditionalInfos
 */
class Users extends \yii\db\ActiveRecord
{
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
            [['phone_number', 'first_name', 'last_name'], 'required'],
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
}
