/**
 * Created by joeramone on 17/10/2016.
 */
angular.module('starter.controllers')
    .controller('ClientViewDeliveryCtlr', ['$scope','$state','$ionicLoading','$cart',
        'ClientOrder','$stateParams','$ionicPopup','UserData','$pusher','$window',
        function ($scope, $state, $ionicLoading, $cart,Order,$stateParams,$ionicPopup,UserData,$pusher,$window) {
var iconUrl = 'http://maps.google.com/mapfiles/kml/pal2/';
            $scope.map = {
                center: {
                    latitude: -30.0333,
                    longitude:  -51.2000
                },
                zoom: 15};

            $scope.markers = [];

            $scope.order = [];
            $ionicLoading.show({
                template: 'Carregando...'
            });

            Order.get({id:$stateParams.id, include:"itens,cupom"},function (data) {
                $scope.order = data.data;
                $ionicLoading.hide();
                if(data.data.status == 1){
                    initMarkers();
                }else{
                    $ionicPopup.alert({
                        title:'Advertência',
                        template:'Pedido ainda não esta sendo entregue!'
                    })
                }
            }, function (errorData) {
                $ionicLoading.hide();
            });

            function initMarkers(order) {
                var client = UserData.get().client.data;

                var address = client.zipcode+', '+client.address+', '+client.city+' - '+client.state;
                createMarkerClient(address);
                watchPositionDeliveryman(order.hash);
            }

            function createMarkerClient(address) {
                var geocoder = new google.maps.Geocoder();
                geocoder.geocode({
                    address:address
                },function (results, status) {
                    if(status == google.maps.GeocoderStatus.OK){
                            var lat,long;
                        lat = results[0].geometry.location.lat();
                        long = results[0].geometry.location.lng();
                        $scope.markers.push({
                            id:'client',
                            coords:{
                                latitude:lat,
                                longitude:long
                            },
                            options:{
                                title:"Local de entrega",
                                icon:iconUrl+'icon2.png'
                            }
                        })
                    }else{
                        $ionicPopup.alert({
                            title:'Advertência',
                            template:'Não foi possível localizar seu endereço!'
                        });
                    }
                })
            }
            
            function watchPositionDeliveryman(channel) {
                var pusher = $pusher($window.client);
                channel = pusher.subscribe(channel);
                channel.bind('CodeDelivery\\Events\\GetLocationDeliveryman',function (data) {
                    console.log(data);
                });
            }


    }]);