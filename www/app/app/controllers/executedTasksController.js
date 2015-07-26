'use strict';
app.controller('executedTasksController', ['$scope', 'executedTasksService', function ($scope, executedTasksService) {

    $scope.tasks = [];

    $scope.message = '';

    executedTasksService.getExecutedTasks().then(function (results) {

        $scope.tasks = results.data;

    }, function (error) {
        //alert(error.data.message);
    });


    $("#phContentHeader").html("<i class='fa fa-connectdevelop'></i>&nbsp; Выполненные&nbsp;<small>задачи</small>");
    $(".breadcrumb").html("<li><a href='#/todotasks'>Главная</a></li><li class='active'>Выполненные задачи</li>");

    $("#mnuToDoTasks").removeClass("active");
    $("#mnuExecutedTasks").addClass("active");
    

}]);