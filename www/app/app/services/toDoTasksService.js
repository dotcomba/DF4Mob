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

    //Get Task by Id
    toDoTasksServiceFactory.getTask = function (Id) {
        return $http.get(serviceBase + "api/ToDoTasks/getbyid/" + Id);
    }

    //Introduce the Task
    toDoTasksServiceFactory.introduceTask = function (Id, task) {
        var result = $http({
            method: "put",
            url: serviceBase + "api/ToDoTasks/introducetaskupdate/" + Id,
            data: task
        });
        return result;
    }

    return toDoTasksServiceFactory;

}]);