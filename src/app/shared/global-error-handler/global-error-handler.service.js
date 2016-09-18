;(function() {
    'use strict';

    angular
        .module('global-error-handler')
        .factory('errorService', errorService);

    function errorService($mdToast) {
        var service = {
            message: '',
            serverError: serverError
        };
        return service;
        function serverError( errorMessage ) {
            this.message = errorMessage;
            $mdToast.show( {
                template: '<md-toast>' + this.message + '</md-toast>',
                hideDelay: 3000,
                position: 'bottom left'
            });
        }
    }
})();