// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

angular.module('starter.controllers',[]);
angular.module('starter.services',[]);
angular.module('starter', ['ionic','starter.controllers','starter.services','angular-oauth2','ngResource','ngCordova'])
    .constant('appConfig',{
       //baseUrl:'http://delivery.app'
       //  baseUrl:'http://192.168.10.10', //casa
       // baseUrl:'http://192.168.1.6:8000'
       //  baseUrl:'http://54.244.77.187/delivey' //amazon
     //baseUrl:'http://homestead.app:8000' // servi   ço
      baseUrl:' http://54.186.133.157/delivey/public' //amazon2


    })
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.config(function ($stateProvider, $urlRouterProvider, OAuthProvider, OAuthTokenProvider,appConfig, $provide) {
   
    OAuthProvider.configure({
        baseUrl: appConfig.baseUrl,
       clientId: 'appid02',
      // clientId: 'apiid01',
        clientSecret: 'secret', // optional
        grantPath: '/oauth/access_token'
    });
    OAuthTokenProvider.configure({
        name: 'token',
        options: {
            secure: false
        }
    });

  $stateProvider
      .state('login',{
         url:'/login',
         templateUrl:'templates/login.html',
          controller:'LoginCtlr'
        })
      .state('home',{
      url:'/home',
      templateUrl:'templates/home.html',
       controller:'HomeCtlr'
     })
      .state('client',{
          abstract:true,
          url:'/client',
          templateUrl:'templates/client/menu.html',
          controller: 'ClientMenuCtlr'
      })
      //area de pedidos
      .state('client.checkout',{
            url: '/checkout',
            templateUrl:'templates/client/checkout.html',
             controller:'ClientCheckoutCtlr',
             cache: false
        })

      .state('client.order',{
          url: '/order',
          templateUrl:'templates/client/order.html',
          controller:'ClientOrderCtlr',
          cache: false
        })
        //detalhes dos itens
      .state('client.checkout_item_detail',{
          url: '/checkout/detail/:index',
          templateUrl:'templates/client/checkout-detail.html',
          controller:'ClientCheckoutDetailCtlr'
      })

      .state('client.checkout_successful',{
          url: '/checkout/successful',
          templateUrl:'templates/client/successful.html',
          controller:'ClientCheckoutSuccessfulCtlr',
          cache: false
      })
        //listagem de produtos
      .state('client.view_products',{
          url: '/view_products',
          templateUrl:'templates/client/view-products.html',
          controller:'ClientViewProductCtlr'
      })

    $urlRouterProvider.otherwise('/login');


    $provide.decorator('OAuthToken',['$localStorage','$delegate', function ($localStorage,$delegate) {
        Object.defineProperties($delegate,{
            setToken:{
                value : function (data) {
                   return $localStorage.setObject('token',data);
                },
                enumerable:true,
                configurable: true,
                writable: true
            },
            getToken:{
                value : function () {
                    return $localStorage.getObject('token');
                },
                enumerable:true,
                configurable: true,
                writable: true
            },
            removeToken:{
                value : function () {
                    $localStorage.setObject('token',null);
                },
                enumerable:true,
                configurable: true,
                writable: true
            }
        });
        return $delegate;
    }]);
     //    .state('home.a',{
     //      url:'/a',
     //      templateUrl:'/templates/home-a.html'
     //    })
     //    .state('home.b',{
     //      url:'/b',
     //      templateUrl:'/templates/home-b.html'
     //    })
     // .state('main',{
     //    url:'/main',
     //    templateUrl:'/templates/main.html'
     //  })
     //    .state('main.a',{
     //      url:'/a',
     //      templateUrl:'/templates/main-a.html'
     //    })
     //    .state('main.b',{
     //      url:'/b',
     //      templateUrl:'/templates/main-b.html'
     //    })


})
    .service('cart', function () {
        this.items = [];
    })
;