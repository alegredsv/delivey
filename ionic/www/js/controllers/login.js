/**
 * Created by joeramone on 12/10/2016.
 */
angular.module('starter.controllers')
    .controller('LoginCtlr', ['$scope','OAuth','OAuthToken','$ionicPopup','$state','$q','User','UserData','$localStorage','$ionicPush','$rootScope',
        function ($scope, OAuth,OAuthToken, $ionicPopup, $state,$q, User,UserData,$localStorage,$ionicPush,$rootScope) {
        $scope.user = {
            username:'',
            password:''
        }
            UserData.set(null);
            OAuthToken.removeToken();
            $ionicPush.register().then(function(t) {

                return $ionicPush.saveToken(t);
            }).then(function(t) {
                console.log('Token saved:', t.token);
                $localStorage.set('device_token',t.token);
            });


            $rootScope.$on('cloud:push:notification', function(event, data) {
                var msg = data.message;
                alert(msg.title + ': ' + msg.text);
            });
          $scope.login = function () {
           var promise =  OAuth.getAccessToken($scope.user);
            promise
                .then(function(data){
                    var token = $localStorage.get('device_token');
                    return User.updateDeviceToken({},{device_token:token}).$promise;
                })


                .then(function(data){
                return User.authenticated({include:'client'}).$promise;
            }).then(function (data) {
                UserData.set(data.data);

                if(data.data.role == 'client') {
                    $state.go('client.checkout');
                }else if(data.data.role=='deliveryman'){
                    $state.go('deliveryman.order');
                }
            } , function (responseError) {
                UserData.set(null);
                OAuthToken.removeToken();
                $ionicPopup.alert({
                    title:'Advertência',
                    template:'Login e/ou senha inválidos'
                })
            });
        }
}]);