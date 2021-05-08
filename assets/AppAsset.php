<?php
/**
 * @link http://www.yiiframework.com/
 * @copyright Copyright (c) 2008 Yii Software LLC
 * @license http://www.yiiframework.com/license/
 */

namespace app\assets;
use yii\web\AssetBundle;

/**
 * Main application asset bundle.
 *
 * @author Niraj Paudel <itsmenirajpaudel@gmail.com>
 * @since 2.0
 */
class AppAsset extends AssetBundle
{
    public $basePath = '@webroot';
    public $baseUrl = '@web';
    public $css = [
        'https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.min.css',
        'https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.theme.default.css',
        'https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/5.9.55/css/materialdesignicons.min.css',
        'https://cdn.rawgit.com/michalsnik/aos/2.1.1/dist/aos.css',
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css',
        
        'css/bootstrap/css/bootstrap.min.css',
        'css/dist/build-main.css',
    ];

    public $js = [
        '//code.jquery.com/jquery-3.2.1.min.js',
        'js/bootstrap/bootstrap.min.js',
        'https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js',
        'https://cdn.rawgit.com/michalsnik/aos/2.1.1/dist/aos.js',
        '//unpkg.com/axios/dist/axios.min.js',
        'js/bootstrap/toaster.js',
        'js/dist/build-main.js',
        'js/landingpage.js'
    ];

    public $depends = [
        'yii\web\YiiAsset'
    ];
 
}
