<?php

namespace app\models;

/**
 * This is the ActiveQuery class for [[ReceiverRequestLog]].
 *
 * @see ReceiverRequestLog
 */
class ReceiverRequestLogQuery extends \yii\db\ActiveQuery
{
    /*public function active()
    {
        return $this->andWhere('[[status]]=1');
    }*/

    /**
     * {@inheritdoc}
     * @return ReceiverRequestLog[]|array
     */
    public function all($db = null)
    {
        return parent::all($db);
    }

    /**
     * {@inheritdoc}
     * @return ReceiverRequestLog|array|null
     */
    public function one($db = null)
    {
        return parent::one($db);
    }
}
