'use strict';
app.factory('executedTasksService', ['$http', 'ngAuthSettings', function ($http, ngAuthSettings) {

    var serviceBase = ngAuthSettings.apiServiceBaseUri;

    var executedTasksServiceFactory = {};

    var _getExecutedTasks = function () {

        return $http.get(serviceBase + 'api/ExecutedTasks').then(function (results) {
            return results;
        });
    };

    executedTasksServiceFactory.getExecutedTasks = _getExecutedTasks;

    return executedTasksServiceFactory;

}]);