/**
 * Created by joeramone on 17/10/2016.
 */
angular.module('starter.controllers')
        .controller('ClientMenuCtlr', ['$scope','$state','User','$ionicLoading',
        function ($scope, $state, User, $ionicLoading) {
            $scope.user = {
                name:''
            };
        $ionicLoading.show({
            template: 'Carregando...'
        })
        User.authenticated({},function (data) {
            $scope.user = data.data;
            $ionicLoading.hide();
        },function (errorData) {
            $ionicLoading.hide();
        })

    }]);