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
