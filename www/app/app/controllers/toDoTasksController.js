'use strict';
app.controller('toDoTasksController', ['$scope', '$routeParams', '$location', '$timeout', '$route', 'toDoTasksService', function ($scope, $routeParams, $location, $timeout, $route, toDoTasksService) {

    $scope.tasks = [];

    $scope.savedSuccessfully = false;
    $scope.message = "";

    $scope.task = {
        title: "",
        description: ""
    };

    //Method to Get Sibgle Category by Id
    var _getTask = function (Id) {
        toDoTasksService.getTask(Id).then(function (result) {
            var res = result.data;
            $scope.task = {
                id: res.id,
                title: res.title,
                printForm: res.printForm,
                linkToTask:res.linkToTask,
                taskList:res.taskList,
                  };

            $("#htmlPrintDoc").html($scope.task.printForm);
        },
                  function (error) {
                      $scope.message = 'Ошибка в процессе загрузки! ';
                  });
    }
    $scope.getTask = _getTask;


    // Method to Update
    $scope.introduceTask = function (id) {

        toDoTasksService.introduceTask(id, $scope.task).then(function (response) {

            $scope.savedSuccessfully = true;
            $scope.message = "Вы подтвердили прочтение!";
            startTimer();

        },
         function (response) {
             //var errors = [];
             //for (var key in response.data.modelState) {
             //    for (var i = 0; i < response.data.modelState[key].length; i++) {
             //        errors.push(response.data.modelState[key][i]);
             //    }
             //}
             //$scope.message = "Ошибка подтверждения: " + errors.join(' ');

             $scope.message = "Ошибка подтверждения: " + response.data.message;

         });
    };

    var startTimer = function () {
        var timer = $timeout(function () {
            $timeout.cancel(timer);
            $location.path('/todotasks');
            $route.reload();
        }, 1000);
    }


    // Get single category by id or list without id
    var idParam = $routeParams.id;
    if (idParam != undefined) {
        _getTask(idParam);
    } else {
        toDoTasksService.getToDoTasks().then(function (results) {
            $scope.tasks = results.data;
        }, function (error) {
            $scope.message = "Ошибка в процессе загрузки!";
        });
    }

    $scope.go = function (path) {
        $location.path(path);
    };

    


    // routing navigation panel
    switch ($route.current.templateUrl) {
        case 'app/views/toDoTasks.html':
            $("#phContentHeader").html("<i class='fa fa-dashboard'></i>&nbsp; Текущие&nbsp;<small>задачи</small>");
            $(".breadcrumb").html("<li><a href='#/todotasks'>Главная</a></li><li class='active'>Невыполненные задачи</li>");
            break;
        case 'app/views/introduceTaskExecute.html':
            $("#phContentHeader").html("<i class='fa fa-fire'></i>&nbsp; Ознакомление &nbsp;<small>подтвердите прочтение</small>");
            $(".breadcrumb").html("<li><a href='#/todotasks'>Главная</a></li><li><a href='#/todotasks'>Активные задачи</a></li><li class='active'>Ознакомление</li>");
            break;
     }

    $("#mnuToDoTasks").addClass("active");
    $("#mnuExecutedTasks").removeClass("active");

}]);