/**
 * Created by joeramone on 12/10/2016.
 */
angular.module('starter.controllers',[])
    .controller('LoginCtlr', ['$scope','OAuth','$ionicPopup','$state', function ($scope, OAuth, $ionicPopup, $state) {
        $scope.user = {
            username:'',
            password:''
        }
        $scope.login = function () {
            OAuth.getAccessToken($scope.user).then(function(data){
                $state.go('home');
            }, function (responseError) {
                console.log('login erro');
                $ionicPopup.alert({
                    title:'Advertência',
                    template:'Login e/ou senha inválidos'
                })
            })
        }
}]);