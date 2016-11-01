/**
 * Created by joeramone on 17/10/2016.
 */
angular.module('starter.controllers')
        .controller('DeliverymanMenuCtlr', ['$scope','$state','UserData','$ionicLoading',
        function ($scope, $state, UserData, $ionicLoading) {
            $scope.user = {
                name:''
            };
            $scope.user = UserData.get();
    }]);