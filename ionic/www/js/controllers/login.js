/**
 * Created by joeramone on 12/10/2016.
 */
angular.module('starter.controllers')
    .controller('LoginCtlr', ['$scope','OAuth','OAuthToken','$ionicPopup','$state','$q','User','UserData',
        function ($scope, OAuth,OAuthToken, $ionicPopup, $state,$q, User,UserData) {
        $scope.user = {
            username:'',
            password:''
        }
            UserData.set(null);
            OAuthToken.removeToken();
        
          $scope.login = function () {
           var promise =  OAuth.getAccessToken($scope.user);
            promise.then(function(data){
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