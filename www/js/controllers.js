angular.module('starter.controllers', [])

    .controller('HomeCtrl', function ($scope, $location, localStorageService, $rootScope, $ionicLoading, $cookieStore) {

    })

    //新闻
    .controller('NewsCtrl', function ($scope, $ionicLoading, $timeout, NewsService) {
        $ionicLoading.show({
            content: '加载数据',
            animation: 'fade-in',
            showBackdrop: false,
            maxWidth: 200,
            showDelay: 100
        });
        NewsService.getnewsList(function (results) {
            $ionicLoading.hide();
            $scope.news = results.newsList;
            $scope.adList = results.isChargeNewsList;

            angular.element(document).ready(function () {

                for (var i = 1; i < $scope.adList.length; i++) {
                    var dot = document.createElement("span");
                    $('.swipe-ctr').append(dot);
                }
                var elem = document.getElementById('slider-news');

                window.slider = Swipe(elem, {
                    startSlide: 0,
                    auto: false,
                    continuous: true,
                    disableScroll: false,
                    stopPropagation: false,
                    transitionEnd: function (index, element) {
                        $('.swipe-ctr').find("span").removeClass("cur").eq(index).addClass("cur")
                    }
                });

            });

        });
    })

//新闻详情
    .controller('NewsDetailCtrl', function ($scope, $ionicLoading, $stateParams, NewsService) {
        $ionicLoading.show({
            content: '加载数据',
            animation: 'fade-in',
            showBackdrop: false,
            maxWidth: 200,
            showDelay: 100
        });

        NewsService.getnewsDetail(function (result) {
            $ionicLoading.hide(); //加载隐藏
            $scope.news = result.dataList;
            $scope.url = window.location.href;

            $('.article-content').html($scope.news.newsContent);

        });

    })

//付款
    .controller('PayCtrl', function ($rootScope, $cookieStore, localStorageService, $location, $scope, PayService) {

        $scope.address = $cookieStore.get("addressYoo");
        if ($scope.address == undefined) {
            alert('请先去选择收货地址');
            $location.url('/' + $rootScope.subsiteCode + '/user-address');
        }

        //去付款
        $scope.pays = function () {
            //1线下支付2货到付款
//            if ($scope.selectValue == undefined) {
//                alert('请先选择支付方式!')
//                return;
//            }
            PayService.setProductOrder();

        };

        $scope.selectAddress = function () {
            $location.path('/' + $rootScope.subsiteCode + '/user-address');
        };

        //支付方式
        if ($cookieStore.get('payType') == 0) {
            $scope.serverSideList = [
                {
                    text: "在线支付",
                    value: "1"
                },
                {
                    text: "货到付款",
                    value: "2"
                }
            ];
        } else {
            $scope.serverSideList = [
                {
                    text: "货到付款",
                    value: "2"
                }
            ];
        }

        $scope.data = {
            clientSide: 'ng'
        };

        $scope.serverSideChange = function (item) {
            $scope.selectValue = item.value;
            console.log("Selected Serverside, text:", item.value);
        };
        console.log('serverSideChange=' + $scope.selectValue);
    })

    //付款成功
    .controller('PayOKCtrl', function ($rootScope, $stateParams, $scope) {

        $scope.linkMan = $stateParams.username;
        $scope.orderNum = $stateParams.orderNum;
        $scope.payFS = '货到付款';
        $scope.amount = $stateParams.amount;
        $scope.address = $stateParams.address;
    })
    //下单
    .controller('orderCtrl', function ($scope, $cookieStore) {
        $scope.price = parseInt(150);
        var tmp_price=0;

        $scope.selecte1 = 'selected';
        $scope.setActive = function (index) {
            if (index == 1) {
                $scope.selecte1 = 'selected'
                $scope.selecte2 = ''
                $scope.selecte3 = ''
                $scope.tab_con1 = 'tab_con'
                $scope.tab_con2 = 'tab_con'
                $scope.tab_con3 = 'tab_off'
            }
            if (index == 2) {
                $scope.tab_con1 = 'tab_off'
                $scope.tab_con2 = 'tab_con'
                $scope.tab_con3 = 'tab_off'
                $scope.selecte1 = ''
                $scope.selecte2 = 'selected'
                $scope.selecte3 = ''
            }
            if (index == 3) {
                $scope.tab_con1 = 'tab_off'
                $scope.tab_con2 = 'tab_off'
                $scope.tab_con3 = 'tab_con'
                $scope.selecte1 = ''
                $scope.selecte2 = ''
                $scope.selecte3 = 'selected'
            }
        };
        //分类列表
        $scope.titleList = [
            {id: 1, Selected: false, title: '机油'},
            {id: 2, Selected: false, title: '机滤'},
            {id: 3, Selected: false, title: '空气滤清器'},
            {id: 4, Selected: false, title: '空调滤清器'}
        ];
        //列表价格
        $scope.selectList = [
            {p: 123, Selected: false, title: '嘉实多磁护 SN 5W-40'},
            {p: 56, Selected: false, title: '壳牌黄喜力HX5 10W-40'},
            {p: 67.2, Selected: false, title: '嘉实多磁护 SN 5W-40'},
            {p: 54.2, Selected: false, title: '美孚美孚1号 0W-40'},
            {p: 23.21, Selected: false, title: '嘉实多极护 SN 0W-40'}
        ];
        $scope.change = function (p) {
            $scope.price = $scope.price - parseFloat(tmp_price);
            $scope.price = $scope.price + parseFloat(p);
            tmp_price = p;
        }

        $scope.checkAll = function () {
            $scope.price=150;
            if ($scope.selectedAll) {
                $scope.selectedAll = true;
            } else {
                $scope.selectedAll = false;
            }

            angular.forEach($scope.titleList, function (t) {
                t.Selected = $scope.selectedAll;
            });
        };


    })

    //添加一级产品分类
    .controller('addBrandCtrl', function ($scope, $ionicLoading, $rootScope, $location, BrandService) {

        $scope.addBrand = function (b) {
            BrandService.addBrand(b);
        }
    })
    //一级品牌列表
    .controller('BrandListCtrl', function ($scope, $rootScope, $location, $stateParams, BrandService) {
        //默认加载
        BrandService.getBrandsList(function (results) {
            $scope.brandslist = results;
        });
        //三级分类夹在
        BrandService.getBrandsList(function (results) {
            $scope.brandslist3 = results;
        });
    })
    //二级分类列表
    .controller('BrandListCtrl2', function ($scope, $rootScope, $location, $stateParams, BrandService2) {
        //二级分类夹在
        BrandService2.getBrandsListType(function (results) {
            $scope.brandslist2 = results;
        });

        $scope.addBrandType = function (b) {
            BrandService.addBrandType(b)
        }
    })
    //3级分类列表
    .controller('BrandListCtrl3', function ($scope, $rootScope, $stateParams, BrandService3) {
        $scope.addBrandTT = function (b) {
            BrandService3.addBrand3(b)
        };

        //二级分类夹在
        BrandService3.getBrands3(function (results) {
            $scope.brandslist3 = results;
        });

    })

//相册列表
    .controller('PhotoListCtrl', function ($scope, $window, $ionicLoading, $timeout, PhotoAlbumService) {
        $ionicLoading.show({
            content: '加载数据',
            animation: 'fade-in',
            showBackdrop: false,
            maxWidth: 200,
            showDelay: 100
        });
        PhotoAlbumService.getPhotoList(function (result) {
            if (result.succeed == '000')
                $scope.photoList = result.showImgList;
            $ionicLoading.hide();
            $timeout(function () {
                var options = {
                        allowRotationOnUserZoom: true,
                        backButtonHideEnabled: false,
                        captionAndToolbarAutoHideDelay: 0,
                        doubleTapZoomLevel: false,
                        captionAndToolbarHideOnSwipe: false,
                        preventHide: true
                    },
                    instance = $window.Code.PhotoSwipe.attach($window.document.querySelectorAll('#Gallery a'), options);

            }, 500);
        });
    })

    //用户授权
    .controller('UserCtrl', function ($scope, UsersService, $ionicLoading, localStorageService, $cookieStore, $rootScope, $location) {
        $ionicLoading.show({
            content: '加载数据',
            animation: 'fade-in',
            showBackdrop: false,
            maxWidth: 200,
            showDelay: 100
        });
        //检测本地是否有id
        if ($cookieStore.get('id') == null) {
//            alert('请先注册！谢谢');
            var url = '#/' + $rootScope.subsiteCode + '/register';
            window.location.assign(url);
            $ionicLoading.hide();
        } else {
            UsersService.getUserInfo(function (data) {
                //给前台赋值
                $scope.userdata = data.data;
                $cookieStore.put('id', data.data.id);
                //$cookieStore.put('userId',);
                $scope.go = function (path) {
                    $location.path(path);
                };
            });
            //金额
            $scope.account = UsersService.getUserAccount(function (data) {
                $scope.acc = data;
            });

            $ionicLoading.hide();
        }
    })

//用户订单
    .controller('UserCtrlOrder', function ($scope, $timeout, UserOrderService) {
//        $scope.hasmore = true;
//        $scope.loadMore = function () {
//            $scope.$broadcast('scroll.infiniteScrollComplete');
        UserOrderService.getNextOrderList(function (data) {
            if (data.success) {
//                        $scope.hasmore = false;
//                    } else {
                if ($scope.orderList == null) {
                    $scope.orderList = data.data.content;
                } else {
                    for (var i = 0; i < data.data.content.length; i++) {
                        $scope.orderList.push(data.data.content[i]);
                    }
                }
//                        if (data.currentPage >= data.data.totalPages) {
//                            $scope.hasmore = false;
//                        }
            }
//                    $scope.$broadcast('scroll.infiniteScrollComplete');
        });
//        };
    })

//用户收货地址
    .controller('user-addressCtrl', function ($scope, $window, localStorageService, UsersService) {

        UsersService.getUserAddressList(function (data) {
            $scope.items = data.data;
        });


        //添加地址
        $scope.addAddress = function (address) {
            UsersService.addAddress(address);
        };

        //删除地址
        $scope.delAddress = function (userAddId) {
            UsersService.delAddress(userAddId);
        };

        $scope.data1 = {
            clientSide: 'ng'
        };

        $scope.serverSideChange = function (item) {
            $cookieStore.remove('address');
            $cookieStore.put('addressYoo', item);
            $window.history.back();
        };

    })

//会员卡
    .controller('UserCardCtrl', function ($scope, $ionicLoading, $rootScope, UserCardService, $location) {
        $ionicLoading.show({
            content: '加载数据',
            animation: 'fade-in',
            showBackdrop: false,
            maxWidth: 200,
            showDelay: 100
        });
        UserCardService.getCardInfo(function (result, status, headers) {
            $ionicLoading.hide();
            if (headers.location != null) {
                $location.path(headers.location);
            }
            $scope.card = result.cardList;
            $scope.privilege = result.privilegeList;
            if ($scope.card.cardBackImg) {
                $('.member-card').css('background-image', 'url(' + $scope.card.cardBackImg + ')');
            } else {
                $('.member-card').css('background-image', 'url(img/user-card1.png)');
            }

        });

        $scope.showIntro = function (position, $event) {
            var intro = $('#intro' + position);
            if (intro.is(":hidden")) {
                $('.intro').hide(200);
                intro.show(200);
            } else {
                $('.intro').hide(200);
            }
            $event.preventDefault()
        }

    })

//签到
    .controller('UserSignInCtrl', function ($scope, $ionicLoading, $ionicPopup, SignInService, $window) {
        $ionicLoading.show({
            content: '加载数据',
            animation: 'fade-in',
            showBackdrop: false,
            maxWidth: 200,
            showDelay: 100
        });

        SignInService.signInList(function (data) {

            $ionicLoading.hide();
            $scope.enableSign = data.enableSign;

            var signList = data.dataList;
            if (signList == null)
                signList = [];

            angular.element(document).ready(function () {
                $('#calendar').datepicker({
                    language: "zh-CN",
                    todayHighlight: true,
                    beforeShowDay: function (date) {
                        if (date.getMonth() == (new Date()).getMonth()) {
                            if ($.inArray(date.getDate(), signList) > -1) {
                                return "red";
                            }
                        }
                    }

                });
            });

        });

        $scope.singIn = function () {
            SignInService.signIn(function (data) {
                if (data.succeed == '000') {
                    $ionicPopup.alert({
                        title: '签到成功',
                        template: '<p>签到成功</p>'
                    }).then(function () {
                        $window.location.reload();
                    });
                    $scope.enableSign = false;
                } else {
                    $ionicPopup.alert({
                        title: '签到失败',
                        template: '<p>签到失败</p>'
                    });
                }
            });
        };
    })

//用户信息完善
    .controller('UserDetailEdit', function ($scope, $rootScope, $ionicLoading, $cookieStore, UsersService) {
        $ionicLoading.show({
            content: '加载数据',
            animation: 'fade-in',
            showBackdrop: false,
            maxWidth: 200,
            showDelay: 100
        });
        UsersService.getUserInfo(function (data) {
            //给前台赋值
            $scope.userdata = data;
            // // console.log(data);
            // $rootScope.userId = data.userId;
            $ionicLoading.hide();
        });
        //修改用户信息
        $scope.setEditUser = function (users) {
            // users.userId = $cookieStore.get('userId');
            UsersService.setUserDetailInfo(users);
        }

    })

    //登陆
    .controller('LoginCtrl', function ($scope, LoginService) {
        $scope.signIn = function (user) {

            LoginService.sign(user);
        };
        $scope.login = function (user) {
            LoginService.login(user);
        };
    });
