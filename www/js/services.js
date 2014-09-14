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
    .factory('ProductDetailService', function ($http, $stateParams,$window,localStorageService, $rootScope) {
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
            }
        };
    })

//支付
    .factory('PayService', function ($http, $stateParams, $rootScope) {
        $rootScope.subsiteCode = $stateParams.pid;
        return {
            getFruitsAsync: function (callback) {
                $http.get($rootScope.url + 'act=productDetail&subsiteCode=' + $rootScope.subsiteCode + '&proId=' + $stateParams.proId).success(callback);
            },
            //生成订单
            setProductOrder: function (order, callback) {
                var orderInfo = {
                        proId: order.proId,
                        standardId: order.standardId,
                        linkMan: order.linkMan,
                        linkPhone: order.linkPhone,
                        num: order.num,
                        remark: order.remark,
                        payType: order.payType
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
                console.log(orderInfo);
                $http.post($rootScope.url + 'act=createOrderList&subsiteCode=' + $rootScope.subsiteCode, orderInfo, postCfg).success(callback);
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
    .factory('UsersService', function ($http, $stateParams, $window, $location, $rootScope) {
        $rootScope.subsiteCode = $stateParams.pid;
        return {
            getUserInfo: function (callback) {
                $http.get($rootScope.url + '/user/getInfo?id=' + $stateParams.id, {
                    cache: true
                }).success(callback);
            },
            //得到会员收货地址
            getUserAddressList: function (callback) {
                $http.get($rootScope.url + '/user/getAddresses?id=' + $stateParams.id).success(callback);
            },
            //得到会员余额
            getUserAccount: function (callback) {
                $http.get($rootScope.url + '/user/account?id=' + $stateParams.id).success(callback);
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
                        address: address.address,
                        linkMan: address.linkMan,
                        linkPhone: address.linkPhone
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
                $http.post($rootScope.url + 'act=userAddressAdd&subsiteCode=' + $rootScope.subsiteCode, data, postCfg).success(function (data) {
                    if (data.succeed == "000") {
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
    .factory('UserOrderService', function ($http, $stateParams, $rootScope) {
        $rootScope.subsiteCode = $stateParams.pid;
        currentPage = 0;
        return {
            getNextOrderList: function (callback) {
                currentPage++;
                $http.get($rootScope.url + '/order/list?userId=' + $stateParams.userId).success(callback);
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
                        $rootScope.userid = data.data;
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
