// Ionic Starter App

angular.module('starter', ['ionic', 'LocalStorageModule', 'starter.services', 'starter.controllers', 'ngCookies'])

    .run(function ($rootScope) {
        $rootScope.subsiteCode = "";
        $rootScope.url = "http://localhost:3000/api";
        $rootScope.timeout = 100;
    })


    .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

        $stateProvider
            //开始页面，初始化
            .state('start', {
                url: '/',
                template: '<div></div>',
                controller: 'InitCtrl'
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

            //招聘
            .state('personnel-recruitment', {
                url: '/personnel-recruitment',
                templateUrl: 'templates/personnel-recruitment.html',
                controller: 'PersonnelRecruitmentCtrl'
            })


            //发送留言
            .state('send-message', {
                url: '/send-message',
                templateUrl: 'templates/send-message.html',
                controller: 'SendMessageCtrl'
            })

            //企业列表
            .state('company-list', {
                url: '/company-list',
                templateUrl: 'templates/company-list.html',
                controller: 'CompanyListCtrl'
            })

            //企业详情
            .state('company-details', {
                resolve: {
                    loadJs: function () {
                        var oldDocumentWrite = document.write;
                        document.write = function (node) {
                            $("body").append(node);
                        }

                        // get script
                        $.getScript("http://api.map.baidu.com/api?v=1.5&ak=89638fb582dece35cc3955c0f580abca", function () {
                            setTimeout(function () {
                                document.write = oldDocumentWrite;
                            }, 100);
                        });
                    }
                },
                url: '/company-details',
                templateUrl: 'templates/company-details.html',
                controller: 'CompanyDetailsCtrl'
            })
            //分类
            .state('classify', {
                url: '/classify',
                templateUrl: 'templates/classify.html',
                controller: 'ClassCtrl'
            })
            //产品列表首页
            .state('products', {
                url: '/products?categoryId&page&pageSize',
                templateUrl: 'templates/products.html',
                controller: 'ProductCtrl'
            })
            //产品列表（根据分类）
            .state('product-list', {
                url: '/product-list/:proTypeMaxId',
                templateUrl: 'templates/product-list.html',
                controller: 'productListCtrl'
            })
            //产品搜索结果
            .state('product-search', {
                url: '/product-search/:productName',
                templateUrl: 'templates/product-search.html',
                controller: 'productSearchCtrl'
            })
            //产品详情
            .state('product-detail', {
                url: '/product-detail/:proId',
                templateUrl: 'templates/product-detail.html',
                controller: 'ProductDetailCtrl'
            })
            //下订单
            .state('pay', {
                url: '/pay',
                templateUrl: 'templates/pay.html',
                controller: 'PayCtrl'
            })
            //去付款
            .state('pay-ok', {
                url: '/pay-ok?username&orderNum&amount&address',
                templateUrl: 'templates/pay-ok.html',
                controller: 'PayOKCtrl'
            })

            //首页风格
            .state('home', {
                url: '/home',
                templateUrl: 'templates/home-29.html',
                controller: 'HomeCtrl'
            })
            //个人中心
            .state('user', {
                url: '/user?id',
                templateUrl: 'templates/user.html',
                controller: 'UserCtrl'
            })
            //在线预约
            .state('order', {
                url: '/order',
                templateUrl: 'templates/order.html',
                controller: 'orderCtrl'
            })
            //修改密码
            .state('user-change-pwd', {
                url: '/user-change-pwd',
                templateUrl: 'templates/user-change-pwd.html'
                // controller: 'NewsCtrl-grids'
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
                url: '/user-order?userId',
                templateUrl: 'templates/user-order.html',
                controller: 'UserCtrlOrder'
            })
            //关于我们
            .state('about-us', {
                url: '/about-us',
                templateUrl: 'templates/about-us.html',
                controller: 'AboutUsCtrl'
            })
            .state('login', {
                url: "/login",
                templateUrl: "templates/login.html",
                controller: 'LoginCtrl'
            })
            //二维码
            .state('register', {
                url: '/register',
                templateUrl: 'templates/register.html',
                controller: 'LoginCtrl'
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
            //团购
            .state('customers', {
                url: '/customers',
                templateUrl: 'templates/customers.html',
                controller: 'CustomersCtrl'
            })
            //团购详情
            .state('customers-details', {
                url: '/customers-details/:groupId',
                templateUrl: 'templates/customers-details.html',
                controller: 'CustomersDetailsCtrl'
            })
            //优惠信息
            .state('special-offers', {
                url: '/specialOffers',
                templateUrl: 'templates/special-offers.html',
                controller: 'SpecialOffersCtrl'
            })
            //会员卡
            .state('user-card', {
                url: '/user-card',
                templateUrl: 'templates/user-card.html',
                controller: 'UserCardCtrl'
            })
            //会员签到
            .state('user-signIn', {
                url: '/signIn',
                templateUrl: 'templates/user-signin.html',
                controller: 'UserSignInCtrl'
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
