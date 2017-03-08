var weatherApp = angular.module('weatherApp', ['ngRoute']);

weatherApp.config(function ($routeProvider, $locationProvider, $sceProvider) {
    //$sceProvider.enabled(false);
    
    $locationProvider.html5Mode(false).hashPrefix('');
    $routeProvider
        .when('/', {
        templateUrl: 'pages/home.html',
        controller: 'homeController'
    })
    .when('/forecast', { 
        templateUrl : 'pages/forecast.html',
        controller: 'forecastController'
    })
    .when('/forecast/:days', { 
        templateUrl : 'pages/forecast.html',
        controller: 'forecastController'
    });
});

weatherApp.controller('homeController', ['$scope', 'cityService', function($scope,  cityService){
        $scope.city = cityService.city;
        $scope.$watch('city', function() {
            cityService.city = $scope.city;
        });
}]); 

weatherApp.controller('forecastController', ['$scope', '$http', '$routeParams', 'cityService', function($scope, $http, $routeParams, cityService){
        $scope.city = cityService.city;
        $scope.days = $routeParams.days || '2';
    
        $http.get('http://api.openweathermap.org/data/2.5/forecast/daily?q='+ $scope.city + '&appid=38eb85aa22b77bf1aae983bdef4e7c45')
            .then(function(response) {
            $scope.weatherResult = response.data;
        });
    
        $scope.convertToCelcius = function(degK) {
            return Math.round(degK - 273.15);
        }
        
        $scope.convertToDate = function(dt) {
            return new Date(dt * 1000);
        }
      
}]); 

weatherApp.service('cityService', function() {
    this.city = 'London, UK';
});


weatherApp.directive('weatherReport', function() {
   return {
       restrict: 'E',
       templateUrl : 'directives/weatherReport.html',
       replace: true,
       scope: {
           weatherDay: '=',
           convertToStandard: '&',
           convertToDate: '&',
           dateFormat: '@'
       }
   } 
});

