<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "user_feedbacks".
 *
 * @property int $id
 * @property string $name
 * @property string $email
 * @property string|null $message
 * @property string $submitted_date
 */
class UserFeedbacks extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'user_feedbacks';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['name', 'email'], 'required'],
            [['message'], 'string'],
            [['submitted_date'], 'safe'],
            [['name', 'email'], 'string', 'max' => 80],
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
            'email' => 'Email',
            'message' => 'Message',
            'submitted_date' => 'Submitted Date',
        ];
    }
}
