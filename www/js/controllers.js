angular.module('starter.controllers', [])

    .controller('HomeCtrl', function ($scope, $location, localStorageService, $rootScope, $ionicLoading, $cookieStore, HomeService) {

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


//产品详情
    .controller('ProductDetailCtrl', function ($scope, $rootScope, $ionicLoading, $timeout, $window, $cookieStore, ProductDetailService) {

        $ionicLoading.show({
            content: '加载数据',
            animation: 'fade-in',
            showBackdrop: false,
            maxWidth: 200,
            showDelay: 100
        });
        ProductDetailService.getFruitsAsync(function (results) {

            $ionicLoading.hide();
            $scope.datas = results;
            $('#product-content').html($scope.datas.data.goodsDetail.description);
            angular.element(document).ready(function () {

                for (var i = 1; i < $scope.datas.data.goodsDetail.pictures.length; i++) {
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
        //检测本地是否有id
        if ($cookieStore.get('id') == null) {
            alert('请先注册！谢谢');
            var url = '#/' + $rootScope.subsiteCode + '/register';
            window.location.assign(url);
            $ionicLoading.hide();
        } else {
            //add to cart
            $scope.addtoCarts = function (goodsId) {
                ProductDetailService.addToCart(goodsId);
            };
            //下单
            $scope.setOrder = function (goodsId) {
                ProductDetailService.addToOrder(goodsId);
            };
        }

    })

//付款
    .controller('PayCtrl', function ($rootScope, $cookieStore, localStorageService, $location, $scope, PayService) {

        $scope.address = $cookieStore.get("addressYoo");
        if ($scope.address == undefined) {
            alert('请先去选择收货地址');
            $location.url('/' + $rootScope.subsiteCode + '/user-address');
        }
        ;

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
    //预约
    .controller('orderCtrl', function ($scope, $ionicLoading, $cookieStore, yuyueService) {
        $ionicLoading.show({
            content: '加载数据',
            animation: 'fade-in',
            showBackdrop: false,
            maxWidth: 200,
            showDelay: 100
        });


        //初始化得到预约信息
        yuyueService.getYuyueInfo(function (result) {
            $ionicLoading.hide();
            $scope.datas = result;
            appId = result.dataList.id;

            angular.element(document).ready(function () {
                $('#orderTime').prop("readOnly", true).datepicker({
                    format: "yyyy-mm-dd",
                    language: "zh-CN",
                    autoclose: true,
                    todayHighlight: true
                });
            });
        });
        //提交预约信息
        $scope.addYuyue = function (yudingInfo) {

            $ionicLoading.hide();
            yudingInfo.appId = appId;
            yuyueService.addYuyue(yudingInfo);
        }

    })

    //企业列表
    .controller('CompanyListCtrl', function ($scope, CompanyListService) {
        CompanyListService.getCompanyList(function (result) {
            $scope.url = result.sysValue;
        });
    })

    // 企业详情 controller
    .controller('CompanyDetailsCtrl', function ($scope, loadJs, CompanyDetailsService) {
        CompanyDetailsService.getCompanyDetail(function (results) {
            $scope.companyDetail = results.dataList;
            $('.detail').html(results.dataList.intro);

            //显示地图
            var mp = new BMap.Map('map');
            var point = new BMap.Point($scope.companyDetail.mapx, $scope.companyDetail.mapy);

            mp.centerAndZoom(point, 17);
            var marker = new BMap.Marker(point);
            mp.addOverlay(marker);
        });
    })

    //产品列表
    .controller('ProductCtrl', function ($scope, $rootScope, $ionicLoading, $timeout, $location, $stateParams, ProductService) {
        $ionicLoading.show({
            content: '加载数据',
            animation: 'fade-in',
            showBackdrop: false,
            maxWidth: 200,
            showDelay: 100
        });
        //默认加载
        ProductService.getProducts(function (results) {
            $scope.productList = results;
            $ionicLoading.hide();
        });

//        //点击详情
//        $scope.more = function (proTypeMaxId) {
//            $location.path('/' + $rootScope.subsiteCode + '/product-list/' + proTypeMaxId);
//        };
//        //根据输入内容，查询
//        $scope.search = function (productName) {
//            var elem = document.getElementById('productName');
//            // alert(elem.value);
//            $location.path('/' + $rootScope.subsiteCode + '/product-search/' + elem.value);
//        };


    })

    //团购
    .controller('CustomersCtrl', function ($scope, $rootScope, $ionicLoading, CustomerService) {
        $ionicLoading.show({
            content: '加载数据',
            animation: 'fade-in',
            showBackdrop: false,
            maxWidth: 200,
            showDelay: 100
        });
        CustomerService.getDatas(function (result) {
            $ionicLoading.hide();
            $scope.productList = result;
        });
    })

    //团购-详情
    .controller('CustomersDetailsCtrl', function ($scope, $ionicLoading, $rootScope, CustomerService) {
        $ionicLoading.show({
            content: '加载数据',
            animation: 'fade-in',
            showBackdrop: false,
            maxWidth: 200,
            showDelay: 100
        });
        CustomerService.getDetailsData(function (result) {
            $scope.datas = result;
            console.log(result);
            $ionicLoading.hide();
        });
    })


//优惠信息
    .controller('CartCtrl', function ($scope, ProductDetailService) {
        ProductDetailService.getcartsList(function (datas) {
            $scope.datas = datas.data;
        });
    })

//产品列表页
    .controller('productListCtrl', function ($scope, $ionicLoading, $rootScope, productListService) {
        $ionicLoading.show({
            content: '加载数据',
            animation: 'fade-in',
            showBackdrop: false,
            maxWidth: 200,
            showDelay: 100
        });
        productListService.getFruitsAsync(function (results) {
            $scope.productList = results;
            $ionicLoading.hide();
        });

    })

//产品类型列表页
    .controller('ClassCtrl', function ($scope, $ionicLoading, $rootScope, $location, productListService) {
        $ionicLoading.show({
            content: '加载数据',
            animation: 'fade-in',
            showBackdrop: false,
            maxWidth: 200,
            showDelay: 100
        });

        $scope.gotoCata = function (id) {
            var url = '#/' + $rootScope.subsiteCode + '/products?categoryId=' + id;
            window.location.assign(url);
        };

        productListService.getProductTypeList(function (results) {
            $ionicLoading.hide();
            $scope.productTypeList = results.data;
        });

    })

//产品搜索
    .controller('productSearchCtrl', function ($scope, $stateParams, $ionicLoading, productSearchService) {
        $ionicLoading.show({
            content: '加载数据',
            animation: 'fade-in',
            showBackdrop: false,
            maxWidth: 200,
            showDelay: 100
        });
        productSearchService.getFruitsAsync(function (results) {
            $ionicLoading.hide();
            $scope.productList = results;
        });
    })

//相册集列表
    .controller('PhotoAlbumCtrl', function ($scope, $ionicLoading, PhotoAlbumService) {
        $ionicLoading.show({
            content: '加载数据',
            animation: 'fade-in',
            showBackdrop: false,
            maxWidth: 200,
            showDelay: 100
        });
        PhotoAlbumService.getPhotoAlbum(function (result) {
            $scope.photoAlbums = result.showImgList;
            $ionicLoading.hide();
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
