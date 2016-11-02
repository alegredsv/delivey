/**
 * Created by joeramone on 17/10/2016.
 */
angular.module('starter.controllers')
    .controller('DeliverymanViewOrderCtlr', ['$scope','$stateParams','DeliverymanOrder','$ionicLoading',
        '$cordovaGeolocation','$ionicPopup',
        function ($scope, $stateParams, DeliverymanOrder, $ionicLoading,$cordovaGeolocation,$ionicPopup) {
        var watch;
        $scope.order = [];
        $ionicLoading.show({
            template: 'Carregando...'
        });

        DeliverymanOrder.get({id:$stateParams.id, include:"itens,cupom"},function (data) {
            $scope.order = data.data;
            $ionicLoading.hide();
        }, function (errorData) {
            $ionicLoading.hide();
        });

         $scope.goToDelivery = function () {
              $ionicPopup.alert({
                   title:'Advertência',
                   template:'Para calcelar a localização, pressione OK!'
               }).then(function () {
                  stopWatchPosition();
              });
               DeliverymanOrder.updateStatus({id:$stateParams.id},{status:1},function (data) {

                   //geo
                   var watchOptions = {
                       timeout: 3000,
                       enableHighAccuracy: false
                   };
                    watch = $cordovaGeolocation.watchPosition(watchOptions);
                    watch.then(null,function (responseError) {

                    },function (position) {
                       DeliverymanOrder.geo({id:$stateParams.id},{
                           lat:position.coords.latitude,
                           long:position.coords.longitude
                       })
                    });
               });
           };
            
            function stopWatchPosition() {
                if(watch && typeof watch == 'object' && watch.hasOwnProperty('watchID')){
                    $cordovaGeolocation.clearWatch(watch.watchID);
                }
            }
    }]);