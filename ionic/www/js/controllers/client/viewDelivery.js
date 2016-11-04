/**
 * Created by joeramone on 17/10/2016.
 */
angular.module('starter.controllers')
    .controller('ClientViewDeliveryCtlr', ['$scope','$state','$ionicLoading',
        'ClientOrder','$stateParams','$ionicPopup','UserData','$pusher','$window',
        function ($scope, $state, $ionicLoading,Order,$stateParams,$ionicPopup,UserData,$pusher,$window) {
var iconUrl = 'http://maps.google.com/mapfiles/kml/pal2/';
            $scope.map = {
                center: {
                    latitude: 0,
                    longitude: 0
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
                    initMarkers(data.data);
                }else{
                    $ionicPopup.alert({
                        title:'Advertência',
                        template:'Pedido ainda não esta sendo entregue!'
                    })
                }
            }, function (errorData) {
                $ionicLoading.hide();
            });
            
            $scope.$watch('markers.length', function (value) {
                if(value == 2){
                    createBounds();
                }
            })

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
                    var lat = data.geo.lat,long = data.geo.long;
                    if($scope.markers.length <= 1){
                        $scope.markers.push({
                            id:'deliveryman',
                            coords:{
                                latitude:lat,
                                longitude:long
                            },
                            options:{
                                title:"Entregador",
                                icon:iconUrl+'icon47.png'
                            }
                        });
                        return;
                    }
                    for(var key in $scope.markers){
                        if($scope.markers[key].id == 'deliveryman'){
                            $scope.markers[key].coords = {
                                latitude:lat,
                                longitude:long
                            }
                        }
                    }
                });
            }

            function createBounds() {
                var bounds = new google.maps.LatLngBounds();
                var latlng;
                angular.forEach($scope.markers, function (value) {
                    latlng = new google.maps.LatLng(Number(value.coords.latitude),Number(value.coords.longitude));
                    bounds.extend(latlng);
                });
                $scope.map.bounds = {
                    northeast:{
                        latitude: bounds.getNorthEast().lat(),
                        longitude: bounds.getNorthEast().lng()
                    },
                    southwest:{
                        latitude: bounds.getSouthWest().lat(),
                        longitude: bounds.getSouthWest().lng()
                    }
                };
            }

    }]);