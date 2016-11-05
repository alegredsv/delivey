/**
 * Created by awichmann on 19/10/2016.
 */
angular.module('starter.services')
.factory('$map',function () {
    return{
        center: {
            latitude: 0,
            longitude: 0
        },
        zoom: 15

    };
    
});