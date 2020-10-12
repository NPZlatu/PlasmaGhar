<?php

namespace app\models;

/**
 * This is the ActiveQuery class for [[UsersAdditionalInfo]].
 *
 * @see UsersAdditionalInfo
 */
class UsersAdditionalInfoQuery extends \yii\db\ActiveQuery
{
    /*public function active()
    {
        return $this->andWhere('[[status]]=1');
    }*/

    /**
     * {@inheritdoc}
     * @return UsersAdditionalInfo[]|array
     */
    public function all($db = null)
    {
        return parent::all($db);
    }

    /**
     * {@inheritdoc}
     * @return UsersAdditionalInfo|array|null
     */
    public function one($db = null)
    {
        return parent::one($db);
    }
}
