<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "user_notifications".
 *
 * @property int $id
 * @property string $notification
 * @property int|null $is_read
 * @property string|null $created_time
 * @property string|null $read_time
 * @property int $user_id
 *
 * @property Users $user
 */
class UserNotifications extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'user_notifications';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['notification', 'user_id'], 'required'],
            [['notification'], 'string'],
            [['is_read', 'user_id'], 'integer'],
            [['created_time', 'read_time'], 'safe'],
            [['user_id'], 'exist', 'skipOnError' => true, 'targetClass' => Users::className(), 'targetAttribute' => ['user_id' => 'id']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'notification' => 'Notification',
            'is_read' => 'Is Read',
            'created_time' => 'Created Time',
            'read_time' => 'Read Time',
            'user_id' => 'User ID',
        ];
    }

    /**
     * Gets query for [[User]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getUser()
    {
        return $this->hasOne(Users::className(), ['id' => 'user_id']);
    }
}
