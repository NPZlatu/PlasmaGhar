<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "users_additional_info".
 *
 * @property int $marker_id
 * @property int $user_id
 * @property float $marker_lat
 * @property float $marker_lng
 * @property string|null $blood_group
 * @property string $created_date
 * @property string $updated_date
 *
 * @property Users $user
 */
class UsersAdditionalInfo extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'users_additional_info';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['user_id', 'marker_lat', 'marker_lng'], 'required'],
            [['user_id'], 'integer'],
            [['marker_lat', 'marker_lng'], 'number'],
            [['created_date', 'updated_date'], 'safe'],
            [['blood_group'], 'string', 'max' => 50],
            [['user_id'], 'exist', 'skipOnError' => true, 'targetClass' => Users::className(), 'targetAttribute' => ['user_id' => 'id']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'marker_id' => 'Marker ID',
            'user_id' => 'User ID',
            'marker_lat' => 'Marker Lat',
            'marker_lng' => 'Marker Lng',
            'blood_group' => 'Blood Group',
            'created_date' => 'Created Date',
            'updated_date' => 'Updated Date',
        ];
    }

    /**
     * Gets query for [[User]].
     *
     * @return \yii\db\ActiveQuery|UsersQuery
     */
    public function getUser()
    {
        return $this->hasOne(Users::className(), ['id' => 'user_id']);
    }

    /**
     * {@inheritdoc}
     * @return UsersAdditionalInfoQuery the active query used by this AR class.
     */
    public static function find()
    {
        return new UsersAdditionalInfoQuery(get_called_class());
    }
}
