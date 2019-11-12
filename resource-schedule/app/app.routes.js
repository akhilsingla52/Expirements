angular.module('MyApp')

.config(['$stateProvider', '$urlRouterProvider', '$provide', 'localStorageServiceProvider', 'growlProvider', '$httpProvider',
	function($stateProvider, $urlRouterProvider, $provide, localStorageServiceProvider, growlProvider, $httpProvider) {	
        growlProvider.globalTimeToLive(3000);

        /**
        * Provider definition 
        */
        $provide.decorator('$state', ['$delegate', '$rootScope',
            function($delegate, $rootScope) {
                $rootScope.$on('$stateChangeStart', function(event, state, params) {
                    $delegate.params = params;
                });
                return $delegate;
            }
        ]);
    
        /**
        * HttpProvider Interceptors definition 
        */
        $httpProvider.interceptors.push(['$q', 'localStorageService', 'growl', '$location',
            function($q, localStorageService, growl, $location) {
                return {
                    'request': function(config){
                        config.headers['Cache-Control'] = 'no-cache, max-age=0, must-revalidate, no-store';
                        return config || $q.when(config);
                    },
                    'requestError' : function(rejection){
                        return $q.reject(rejection);
                    },
                    'response': function(response) {
                        return response || $q.when(response);
                    },
                    'responseError': function(rejection) {
                        return $q.reject(rejection);
                    }
                }
            }
        ]);


        /**
        * Routes definition for navigation
        */
        $stateProvider
            .state('resource', {
                url : '/resource',
                templateUrl: 'app/components/resource/resource.view.html',
                authenticate: false,
                data : {'headerName' : 'XYZ', 'pageName' : 'RESOURCE'}
            })
      
        $urlRouterProvider.otherwise('/');


    }
]);