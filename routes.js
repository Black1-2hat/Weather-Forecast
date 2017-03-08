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
