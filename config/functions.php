<?php

/**
 * Debug function
 * d($var);
 */
function d() {
    echo '
    <pre>';
     for ($i = 0; $i < func_num_args(); $i++) {
     yii\helpers\VarDumper::dump(func_get_arg($i), 10, true);
     }
     echo '</pre>
    ';
}

/**
 * Debug function with die() after
 * dd($var);
 */
function dd($var)
{
    for ($i = 0; $i < func_num_args(); $i++) {
        d(func_get_arg($i));
        }
    die();
}


function rq($requestQuery){
    echo '
    <pre>';
     
     yii\helpers\VarDumper::dump($requestQuery
                                    ->prepare(Yii::$app->db->queryBuilder)
                                    ->createCommand()
                                    ->rawSql,
                                    10,
                                    true
                                );
     
     echo '</pre>
    ';
    die();
}