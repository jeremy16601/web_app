// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.services', 'starter.controllers'])


    .config(function ($stateProvider, $urlRouterProvider) {

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider

            // setup an abstract state for the tabs directive
            .state('tab', {
                url: "/tab",
                abstract: true,
                templateUrl: "event-menu.html"
            })

            // 首页
            .state('tab.home', {
                url: '/home',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/home.html',
                        controller: 'HomeCtrl'
                    }
                }
            })
            // 新闻列表
            .state('tab.news', {
                url: '/news',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/news-index.html',
                        controller: 'NewsCtrl'
                    }
                }
            })

            // 新闻详情
            .state('tab.news-detail', {
                url: '/news/:newsId',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/news-detail.html',
                        controller: 'NewsDetailCtrl'
                    }
                }
            })
            //发送留言
            .state('tab.send-message', {
                url: '/send-message',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/send-message.html'
                    }
                }
            })
            //分类
            .state('tab.classify', {
                url: '/classify',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/classify.html'
                        //controller: 'DetCtrl'
                    }
                }

            })
            //产品列表
            .state('tab.products', {
                url: '/products',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/products.html',
                        controller: 'ProductCtrl'
                    }
                }

            })
            //产品列表
            .state('tab.product-detail', {
                url: '/products/:productId',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/product-detail.html',
                        controller: 'ProductDetailCtrl'
                    }
                }

            })
            //关于我们
            .state('tab.about-us', {
                url: '/about-us',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/about-us.html',
                        controller: 'AboutUsCtrl'
                    }
                }

            });


        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/tab/home');

    })

    .controller('MainCtrl', function ($scope, $ionicSideMenuDelegate) {
        $scope.leftButtons = [
            {
                type: 'button-icon button-clear ion-navicon',
                tap: function (e) {
                    $ionicSideMenuDelegate.toggleLeft($scope.$$childHead);
                }
            }
        ];
    });