app.config(['$locationProvider', '$urlRouterProvider', '$stateProvider', '$urlMatcherFactoryProvider', ($locationProvider, $urlRouterProvider, $stateProvider, $urlMatcherFactoryProvider) => {
  // Enable HTML5 mode for URL access
  $locationProvider.html5Mode(true);

  // Don't require a perfect URL match (trailing slashes, etc)
  $urlMatcherFactoryProvider.strictMode(false);
  /*
  // If no path could be found, send user to 404 error
  $urlRouterProvider.otherwise(($injector, $location) => {
    $injector.get('$state').go('error.404', null, {location: false});
    return $location.path();
  });
  */

  // Master State Provider
  // All states are defined and configured on this object
  $stateProvider
   // Errors
    .state('error', {
      abstract: true,
      url: '/error',
      templateUrl: 'errors/error.html',
    })

    // 404 Error - Resource Not Found
    .state('error.404', {
      url: '/404',
      templateUrl: 'errors/404.html'
    })

    // Setup Main state
    .state('main', {
      abstract: true,
      views: {
        "@": {
          templateUrl: 'main/main.html',
          controller: 'controller.main'
        }
      }
    })

    // Dashboard Overview/POG Listing
    .state('main.home', {
      url: '/',
      templateUrl: 'main/home/home.html',
      controller: 'controller.main.home'
    })

    // Dashboard Overview/POG Listing
    .state('main.nytimes', {
      url: '/nytimes',
      templateUrl: 'main/nytimes/nytimes.html',
      controller: 'controller.main.nytimes'
    })

    // Dashboard Overview/POG Listing
    .state('main.binding', {
      url: '/binding',
      templateUrl: 'main/binding/binding.html',
      controller: 'controller.main.binding'
    })

    // Dashboard Overview/POG Listing
    .state('main.directive', {
      url: '/directive',
      templateUrl: 'main/directive/directive.html',
      controller: 'controller.main.directive'
    })

    // Templates
    .state('main.templates', {
      url: '/templates',
      templateUrl: 'main/templates/templates.html',
      controller: 'controller.main.templates'
    })

}]);
