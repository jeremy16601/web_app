angular.module('starter.services', [])
    .config(function ($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    })
    //获取导航
    .factory('InitService', function ($http, $stateParams, $rootScope) {
        $rootScope.subsiteCode = $stateParams.pid;

    })

    //HomeService
    .factory('HomeService', function ($stateParams, $rootScope) {
        $rootScope.subsiteCode = $stateParams.pid;
    })

    //新闻数据
    .factory('NewsService', function ($http, $stateParams, $rootScope) {
        $rootScope.subsiteCode = $stateParams.pid;
        return {
            getnewsList: function (callback) {
                $http.get($rootScope.url + 'act=newsList&subsiteCode=' + $rootScope.subsiteCode, {
                    cache: true
                }).success(callback);
            },
            getnewsDetail: function (callback) {
                $http.get($rootScope.url + 'act=newsContent&subsiteCode=' + $rootScope.subsiteCode + '&newsId=' + $stateParams.newsId, {
                    cache: true
                }).success(callback);
            }
        }

    })

    //企业列表
    .factory('CompanyListService', function ($http, $rootScope, $stateParams) {
        $rootScope.subsiteCode = $stateParams.pid
        return {
            getCompanyList: function (callback) {
                $http.post($rootScope.url + 'act=clientsView&subsiteCode=' + $rootScope.subsiteCode, {
                    cache: true
                }).success(callback);
            }
        }
    })

    //企业详情
    .factory('CompanyDetailsService', function ($http, $rootScope, $stateParams) {
        $rootScope.subsiteCode = $stateParams.pid
        return {
            getCompanyDetail: function (callback) {
                $http.post($rootScope.url + 'act=clientsView&subsiteCode=' + $rootScope.subsiteCode, {
                    cache: true
                }).success(callback);
            }
        }
    })

    //人才招聘、关于我们、二维码 、发送留言
    .factory('IndustryService', function ($http, $location, $ionicPopup, $rootScope, $stateParams) {
        $rootScope.subsiteCode = $stateParams.pid;
        return {
            getAboutUs: function (callback) {
                $http.get($rootScope.url + 'act=relatedEnterprise&subsiteCode=' + $rootScope.subsiteCode + '&alias=about_us', {
                    cache: true
                }).success(callback);
            },
            getRecruitment: function (callback) {
                $http.get($rootScope.url + 'act=relatedEnterprise&subsiteCode=' + $rootScope.subsiteCode + '&alias=recruitment', {
                    cache: true
                }).success(callback);
            },
            getQRcode: function (callback) {
                $http.get($rootScope.url + 'act=relatedEnterprise&subsiteCode=' + $rootScope.subsiteCode + '&alias=dimensional_code', {
                    cache: true
                }).success(callback);
            },
            setMessage: function (message, callback) {
                var data = {
                        linkPhone: message.contacts,
                        content: message.contents,
                        senderName: message.name
                    },
                    transFn = function (data) {
                        return $.param(data);
                    },
                    postCfg = {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                        },
                        transformRequest: transFn
                    };
                $http.post($rootScope.url + 'act=leaveMessage&subsiteCode=' + $rootScope.subsiteCode, data, postCfg).success(function (data) {
                    if (data.succeed == 000) {
                        var alertPopup = $ionicPopup.alert({
                            title: '留言成功',
                            template: '<p>留言成功</p>'
                        });
                        alertPopup.then(function (res) {
                            $window.history.back();
                        });
                    } else {
                        $ionicPopup.alert({
                            title: '留言失败',
                            template: '<p>留言失败</p>',
                            buttons: [
                                {
                                    type: 'button-assertive'
                                }
                            ]
                        });
                    }
                });
            }
        }

    })

    //预约
    .factory('yuyueService', function ($http, $location, $ionicPopup, $window, $stateParams, $rootScope) {
        $rootScope.subsiteCode = $stateParams.pid;
        return {
            addYuyue: function (yudingInfo) {
                console.log(yudingInfo);
                var data = {
                        appId: yudingInfo.appId,
                        typeId: yudingInfo.typeId,
                        linkMan: yudingInfo.linkMan,
                        linkPhone: yudingInfo.linkPhone,
                        appTime: yudingInfo.appTime,
                        remark: yudingInfo.remark
                    },
                    transFn = function (data) {
                        return $.param(data);
                    },
                    postCfg = {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                        },
                        transformRequest: transFn
                    };
                $http.post($rootScope.url + 'act=createAppointment&subsiteCode=' + $rootScope.subsiteCode, data, postCfg).success(function (data) {
                    if (data.succeed == 000) {
                        var alertPopup = $ionicPopup.alert({
                            title: '预约成功',
                            template: '<p>预约成功</p>'
                        });
                        alertPopup.then(function (res) {
                            $window.history.back();
                        });
                    } else {
                        $ionicPopup.alert({
                            title: '预约失败',
                            template: '<p>预约失败</p>'
                        });
                    }

                });
            },
            getYuyueInfo: function (callback) {
                $http.get($rootScope.url + 'act=appointmentContent&subsiteCode=' + $rootScope.subsiteCode).success(callback);
            }
        };
    })

    //产品搜索
    .factory('productSearchService', function ($http, $stateParams, $rootScope) {
        $rootScope.subsiteCode = $stateParams.pid;
        return {
            getFruitsAsync: function (callback) {
                $http.post($rootScope.url + 'act=searchProByName&subsiteCode=' + $rootScope.subsiteCode + '&productName=' + $stateParams.productName).success(callback);
            }
        };
    })

    //产品数据
    .factory('ProductService', function ($http, $stateParams, $rootScope) {
        $rootScope.subsiteCode = $stateParams.pid;

        return {
            getProducts: function (callback) {
                var page = $stateParams.page;
                var categoryId = $stateParams.categoryId;
                if (page == null) {
                    page = 1;
                } else if (categoryId == null) {
                    categoryId = 1;
                }
                $http.get($rootScope.url + '/goods?categoryId=' + categoryId + '&page=' + page, {
                    cache: true
                }).success(callback);
            }
        };
    })

    //产品category数据
    .factory('productListService', function ($http, $stateParams, $rootScope) {
        $rootScope.subsiteCode = $stateParams.pid;
        return {
            getProductTypeList: function (callback) { //+ $stateParams.currentPage
                $http.get($rootScope.url + '/category/list', {
                    cache: true
                }).success(callback);
            }
        };
    })

    //产品详情
    .factory('ProductDetailService', function ($http, $stateParams, $window, localStorageService, $rootScope) {
        $rootScope.subsiteCode = $stateParams.pid;
        return {
            getFruitsAsync: function (callback) {
                $http.get($rootScope.url + '/goods/' + $stateParams.proId, {
                    cache: true
                }).success(callback);
            },
            addToCart: function (goodsId) {
                //添加商品到购物车
                var data = {
                        'goodsId': goodsId,
                        'userId': localStorageService.get('id')
                    },
                    transFn = function (data) {
                        return $.param(data, true);
                    },
                    postCfg = {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                        },
                        transformRequest: transFn
                    };

                $http.post($rootScope.url + '/goods/add2Cart', data, postCfg).success(function (data) {
                    if (data.success) {
                        alert('添加成功！');
                        $window.location.reload();
                    } else {
                        alert('添加失败:' + data.data);
                    }
                });
            } ,//从购物车删除
            delToCart:function(goodsId){
                //添加商品到购物车
                var data = {
                        'goodsId': goodsId,
                        'userId': localStorageService.get('id')
                    },
                    transFn = function (data) {
                        return $.param(data, true);
                    },
                    postCfg = {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                        },
                        transformRequest: transFn
                    };
                $http.post($rootScope.url + '/goods/removeFromCart', data, postCfg).success(function (data) {
                    if (data.success) {
                        console.log('从购物移除成功！');
//                        $window.location.reload();
                    } else {
                        console.log('移除失败:' + data.data);
                    }
                });
            }
            //添加到购物车，然后下单
            ,addToOrder: function (goodsId) {
                //添加商品到购物车
                var data = {
                        'goodsId': goodsId,
                        'userId': localStorageService.get('id')
                    },
                    transFn = function (data) {
                        return $.param(data, true);
                    },
                    postCfg = {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                        },
                        transformRequest: transFn
                    };

                $http.post($rootScope.url + '/goods/add2Cart', data, postCfg).success(function (data) {
                    if (data.success) {
                        //添加成功后，去付款页面
                        $window.location.assign('#/201407220000400/pay');
                    } else {
                        alert('服务器异常，请检查网络！');
                    }
                });
            },
            getcartsList: function (callback) { //购物车列表
                if (localStorageService.get('id') == null) {
                    var url = '#/' + $rootScope.subsiteCode + '/login';
                    window.location.assign(url);
                } else {
                    $http.get($rootScope.url + '/goods/cart?userId=' + localStorageService.get('id')).success(callback);
                }
            }
        };
    })

//支付
    .factory('PayService', function ($http, $stateParams, localStorageService, $rootScope,ProductDetailService) {
        $rootScope.subsiteCode = $stateParams.pid;
        return {
            getFruitsAsync: function (callback) {
                $http.get($rootScope.url + 'act=productDetail&subsiteCode=' + $rootScope.subsiteCode + '&proId=' + $stateParams.proId).success(callback);
            },
            //确认订单
            setProductOrder: function (callback) {
                var orderInfo = {
                        addressId: localStorageService.get('addressYoo').id,
                        userId: localStorageService.get('id'),
                        payMethod: 2
                    },
                    transFn = function (orderInfo) {
                        return $.param(orderInfo);
                    },
                    postCfg = {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                        },
                        transformRequest: transFn
                    };
                console.log('orderInfo=='+orderInfo.addressId);
                $http.post($rootScope.url + '/order/create', orderInfo, postCfg).success(function (data) {
                    //付款成功
                    if (data.success) {
                        var url = '#/' + $rootScope.subsiteCode + '/pay-ok?username='+data.data.username+'&orderNum='+data.data.num+
                            '&amount='+data.data.amount+'&address='+data.data.address;
                        window.location.assign(url);

                        console.log('goodsID=='+data.data.item[0].goodsDetail.id);
                        //清空购物车
                        var data = {
                                'goodsId': data.data.items[0].id,
                                'userId': localStorageService.get('id')
                            },
                            transFn = function (data) {
                                return $.param(data, true);
                            },
                            postCfg = {
                                headers: {
                                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                },
                                transformRequest: transFn
                            };
                        $http.post($rootScope.url + '/goods/removeFromCart', data, postCfg).success(function (data) {
                            if (data.success) {
                                console.log('从购物移除成功！');
                            } else {
                                console.log('移除失败:' + data.data);
                            }
                        });
                    }else{
                        console.log('order faild!' + data.data);
                    }

                });
            }
        };
    })
    //团购
    .factory('CustomerService', function ($http, $stateParams, $rootScope) {
        $rootScope.subsiteCode = $stateParams.pid;
        return {
            getDatas: function (callback) {
                $http.post($rootScope.url + 'act=groupList&subsiteCode=' + $rootScope.subsiteCode, {
                    cache: true
                }).success(callback);
            },
            getDetailsData: function (callback) {
                //$rootScope.url +
                $http.get($rootScope.url + 'act=groupContent&subsiteCode=' + $rootScope.subsiteCode + '&groupId=' + $stateParams.groupId, {
                    cache: true
                }).success(callback);
            }
        };
    })

//优惠信息
    .factory('SpecialOffersService', function ($http, $stateParams, $rootScope) {
        $rootScope.subsiteCode = $stateParams.pid;
        return {
            getDatas: function (callback) {
                $http.post($rootScope.url + 'act=discountList&subsiteCode=' + $rootScope.subsiteCode, {
                    cache: true
                }).success(callback);
            }
        };
    })

//相册
    .factory('PhotoAlbumService', function ($http, $stateParams, $rootScope) {
        $rootScope.subsiteCode = $stateParams.pid;
        return {
            getPhotoAlbum: function (callback) {
                $http.get($rootScope.url + 'act=showImgList&subsiteCode=' + $rootScope.subsiteCode, {
                    cache: true
                }).success(callback);
            },
            getPhotoList: function (callback) {
                $http.get($rootScope.url + 'act=getImgListBySId&subsiteCode=' + $rootScope.subsiteCode + '&showImgId=' + $stateParams.albumId, {
                    cache: true
                }).success(callback);
            }
        };
    })

//根据用户名查询用户信息
    .factory('UsersService', function ($http, $stateParams, localStorageService, $window, $location, $rootScope) {
        $rootScope.subsiteCode = $stateParams.pid;
        return {

            getUserInfo: function (callback) {
                if (localStorageService.get('id') == null) {
                    var url = '#/' + $rootScope.subsiteCode + '/login';
                    window.location.assign(url);
                } else {
                    $http.get($rootScope.url + '/user/getInfo?id=' + localStorageService.get('id'), {
                        cache: true
                    }).success(callback);
                }
            },
            //得到会员收货地址
            getUserAddressList: function (callback) {
                $http.get($rootScope.url + '/user/getAddresses?id=' + localStorageService.get('id')).success(callback);
            },
            //得到会员余额
            getUserAccount: function (callback) {
                $http.get($rootScope.url + '/user/account?id=' + localStorageService.get('id')).success(callback);
            },
            //完善个人信息
            setUserDetailInfo: function (users) {
                var udata = {
                        userId: users.userId,
                        email: users.email,
                        phone: users.phone,
                        qq: users.qq
                    },
                    transFn = function (udata) {
                        return $.param(udata);
                    },
                    postCfg = {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                        },
                        transformRequest: transFn
                    };
                $http.post($rootScope.url + 'act=updateUser&subsiteCode=' + $rootScope.subsiteCode, udata, postCfg).success(function (data) {
                    if (data.succeed == "000") {
                        $window.history.back();
                    }
                });
            },
            //添加用户收货地址
            addAddress: function (address) {
                var data = {
                        province: address.province,
                        city: address.city,
                        district: address.district,
                        street: address.street,
                        username: address.username,
                        phone: address.phone,
                        "user.id": localStorageService.get('id'),
                        default: true
                    },
                    transFn = function (data) {
                        return $.param(data);
                    },
                    postCfg = {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                        },
                        transformRequest: transFn
                    };
                $http.post($rootScope.url + '/user/addAddress', data, postCfg).success(function (data) {
                    if (data.success) {
                        //保存默认地址
                        localStorageService.set('addressYoo', data.data);
                        $window.history.back();
                    }
                });

            },
            //删除地址
            delAddress: function (userAddId) {
                $http.get($rootScope.url + 'act=userAddressDelete&subsiteCode=' + $rootScope.subsiteCode + '&userAddId=' + userAddId).success(function (data) {
                    if (data.succeed == "000") {
                        $window.location.reload();
                    }
                });
            }

        };
    })

//用户订单
    .factory('UserOrderService', function ($http, $stateParams, localStorageService, $rootScope) {
        $rootScope.subsiteCode = $stateParams.pid;
        currentPage = 0;
        return {
            getNextOrderList: function (callback) {
                currentPage++;
                if (localStorageService.get('id') == null) {
                    var url = '#/' + $rootScope.subsiteCode + '/login';
                    window.location.assign(url);
                } else {
                    $http.get($rootScope.url + '/order/list?userId=' + localStorageService.get('id')).success(callback);
                }
            }
        };
    })

//用户会员卡
    .factory('UserCardService', function ($http, $stateParams, $rootScope) {
        $rootScope.subsiteCode = $stateParams.pid;
        return {
            getCardInfo: function (callback) {
                $http.get($rootScope.url + 'act=myUserCardView&subsiteCode=' + $rootScope.subsiteCode, {
                    cache: true
                }).success(callback);
            },
            //完善用户信息
            updateUserInfo: function (users) {
                $http.get($rootScope.url + 'act=updateUser&subsiteCode=' + $rootScope.subsiteCode + '&userId=' + users.userId).success(callback);
            }
        };
    })

//用户登陆
    .factory('LoginService', function ($http, localStorageService, $stateParams, $window, $rootScope) {
        $rootScope.subsiteCode = $stateParams.pid;
        return {
            //注册
            sign: function (sign) {
                var data = {
                        'username': sign.username,
                        'email': sign.email,
                        'phone': sign.phone,
                        'password': sign.password,
                        'rePassword': sign.rePassword
                    },
                    transFn = function (data) {
                        return $.param(data, true);
                    },
                    postCfg = {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                        },
                        transformRequest: transFn
                    };

                $http.post($rootScope.url + '/user/register', data, postCfg).success(function (data) {
                    if (data.success) {
                        localStorageService.set('id', data.data);
                        $window.location.assign('#/201407220000400/user?id=' + data.data);
                    } else {
                        alert('注册失败:' + data.data);
                    }
                });
            },
            //登陆
            login: function (user) {
                $http.get($rootScope.url + '/user/login?emailOrPhone=' + user.emailOrPhone + '&password=' + user.password).success(function (data) {
                    if (data.success) {
                        localStorageService.set('id', data.data);
                        $window.location.assign('#/201407220000400/user?id=' + data.data);
                    }
                });
            }
        }
    })

//签到
    .factory('SignInService', function ($http, $stateParams, $rootScope) {
        $rootScope.subsiteCode = $stateParams.pid;
        return {
            signIn: function (callback) {
                $http.get($rootScope.url + 'act=signIn&subsiteCode=' + $rootScope.subsiteCode).success(callback);
            },
            signInList: function (callback) {
                $http.get($rootScope.url + 'act=getSignInList&subsiteCode=' + $rootScope.subsiteCode).success(callback);
            }
        }
    });
