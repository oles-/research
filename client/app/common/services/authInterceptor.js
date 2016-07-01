'use strict';

define(['angular'], function(angular) {

    function authInterceptor($rootScope, $q, $cookieStore, $location) {
        return {
            // Add authorization token to headers
            request: function (config) {
              config.headers = config.headers || {};

              if (config.url && config.url.indexOf('http') !== -1 && $cookieStore.get('token')) {
                config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
              }
              return config;
            },

            // Intercept 401s and redirect you to login
            responseError: function(response) {
              if(response.status === 401) {
                $location.path('/login');
                // remove any stale tokens
                $cookieStore.remove('token');
                return $q.reject(response);
              }
              else {
                return $q.reject(response);
              }
            }
        };
    }

    angular.module('researchApp.Routers')
        .factory('authInterceptor', authInterceptor);

    authInterceptor.$inject = ['$rootScope', '$q', '$cookieStore', '$location'];

    angular.module('researchApp.Routers').config(function($httpProvider) {
        $httpProvider.interceptors.push('authInterceptor');
    });
});