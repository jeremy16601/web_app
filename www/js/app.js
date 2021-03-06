// Ionic Starter App

angular.module('starter', ['ionic', 'LocalStorageModule', 'starter.services', 'starter.controllers', 'ngCookies', 'angular.city.select'])

    .run(function ($rootScope) {
        $rootScope.orderInfo = [];
        $rootScope.url = "http://60.216.75.142:60001/";// "http://60.216.75.142:60001/";
        $rootScope.timeout = 100;
    })


    .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

        $stateProvider
            //开始页面，初始化
            .state('start', {
                cache: false,
                url: '/',
                templateUrl: 'templates/home.html',
                controller: 'HomeCtrl'
            })
            //首页
            .state('home', {
                cache: false,
                url: '/home',
                templateUrl: 'templates/home.html',
                controller: 'HomeCtrl'
            })
            //后台
            .state('admin', {
                cache: false,
                url: '/admin',
                templateUrl: 'templates/admin.html',
                controller: 'AdminCtrl'
            })
            // 新闻列表
            .state('news', {
                url: '/news',
                templateUrl: 'templates/news-index.html',
                controller: 'NewsCtrl'
            })
            // 新闻详情
            .state('news-detail', {
                url: '/news/:newsId',
                templateUrl: 'templates/news-detail.html',
                controller: 'NewsDetailCtrl'
            })
            //添加分类
            .state('addBrand', {
                cache: false,
                url: '/addBrand',
                templateUrl: 'templates/addBrand.html',
                controller: 'addBrandCtrl'
            })
            //添加二级分类
            .state('addBrandType', {
                cache: false,
                url: '/addBrandType',
                templateUrl: 'templates/addBrandType.html',
                controller: 'BrandListCtrl2'
            })
            //添加排量
            .state('addBrandT', {
                cache: false,
                url: '/addBrandT/:brandsid',
                templateUrl: 'templates/addbrandT.html',
                controller: 'BrandListCtrl3'
            })
            //一级分类
            .state('brand-list', {
                cache: false,
                url: '/brand-list',
                templateUrl: 'templates/brand-list.html',
                controller: 'BrandListCtrl'
            })
            //一级分类
            .state('brand-list-admin', {
                cache: false,
                url: '/brand-list-admin',
                templateUrl: 'templates/brand-list-admin.html',
                controller: 'BrandListCtrl'
            })
            //二级分类
            .state('brand2-list', {
                cache: false,
                url: '/brand2-list?brand_type',
                templateUrl: 'templates/brand2-list.html',
                controller: 'BrandListCtrl2'
            })
            //二级分类-后台
            .state('brand2-list-admin', {
                cache: false,
                url: '/brand2-list-admin?brand_type',
                templateUrl: 'templates/brand2-list-admin.html',
                controller: 'BrandListCtrl2'
            })
            //三级分类
            .state('brand3-list', {
                cache: false,
                url: '/brand3-list?brandsid&childname',
                templateUrl: 'templates/brand3-list.html',
                controller: 'BrandListCtrl3'
            })
            //产品详情
            .state('product-detail', {
                cache: false,
                url: '/product-detail/:proId',
                templateUrl: 'templates/product-detail.html',
                controller: 'ProductDetailCtrl'
            })
            //下订单
            .state('pay', {
                cache: false,
                url: '/pay?price',
                templateUrl: 'templates/pay.html',
                controller: 'PayCtrl'
            })
            //去付款
            .state('pay-ok', {
                cache: false,
                url: '/pay-ok',
                templateUrl: 'templates/pay-ok.html',
                controller: 'PayOKCtrl'
            })
            //个人中心
            .state('user', {
                url: '/user?id',
                templateUrl: 'templates/user.html',
                controller: 'UserCtrl'
            })
            //在线预约
            .state('order', {
                url: '/order?childname',
                templateUrl: 'templates/order.html',
                controller: 'orderCtrl'
            })
            //个人中心--个人信息修改
            .state('user-detail', {
                url: '/user-detail',
                templateUrl: 'templates/user-detail.html',
                controller: 'UserDetailEdit'
            })
            //个人中心--用户地址列表
            .state('user-address', {
                url: '/user-address?id',
                templateUrl: 'templates/user-address.html',
                controller: 'user-addressCtrl'
            })
            //个人中心--用户地址--增加
            .state('user-addressAdd', {
                url: '/user-addressAdd',
                templateUrl: 'templates/user-addressAdd.html',
                controller: 'user-addressCtrl'
            })
            //个人中心--订单
            .state('user-order', {
                url: '/user-order',
                templateUrl: 'templates/user-order.html',
                controller: 'UserCtrlOrder'
            })
            //相册
            .state('photoAlbum', {
                url: '/photoAlbum',
                templateUrl: 'templates/photo-album.html',
                controller: 'PhotoAlbumCtrl'
            })
            //相册列表
            .state('photoList', {
                url: '/photoAlbum/:albumId',
                templateUrl: 'templates/photo-picture-list.html',
                controller: 'PhotoListCtrl'
            })
            //会员卡
            .state('user-card', {
                url: '/user-card',
                templateUrl: 'templates/user-card.html',
                controller: 'UserCardCtrl'
            })
            //我的购物车
            .state('user-cart', {
                url: '/carts?id',
                templateUrl: 'templates/user-carts.html',
                controller: 'CartCtrl'
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/');
        $locationProvider.html5Mode(false);

    });
