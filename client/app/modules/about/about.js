'use strict';

define(['angular',
  'modules/about/about.controller'
  ], function (angular) {

  return angular.module('researchApp.Routers')
    .config(function ($stateProvider) {
      $stateProvider
	    .state('about', {
	      url: "/about",
	      templateUrl: 'app/modules/about/about.html',
	      controller: 'AboutCtrl'
	    })
    });
});
