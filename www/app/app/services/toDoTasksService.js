'use strict';
app.factory('toDoTasksService', ['$http', 'ngAuthSettings', function ($http, ngAuthSettings) {

    var serviceBase = ngAuthSettings.apiServiceBaseUri;

    var toDoTasksServiceFactory = {};

    var _getToDoTasks = function () {

        return $http.get(serviceBase + 'api/ToDoTasks').then(function (results) {
            return results;
        });
    };

    toDoTasksServiceFactory.getToDoTasks = _getToDoTasks;

    return toDoTasksServiceFactory;

}]);