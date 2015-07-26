'use strict';
app.controller('toDoTasksController', ['$scope', 'toDoTasksService', function ($scope, toDoTasksService) {

    $scope.tasks = [];

    $scope.message = '';

    toDoTasksService.getToDoTasks().then(function (results) {

        $scope.tasks = results.data;

    }, function (error) {
        //alert(error.data.message);
    });


    $("#phContentHeader").html("<i class='fa fa-dashboard'></i>&nbsp; Текущие&nbsp;<small>задачи</small>");
    $(".breadcrumb").html("<li><a href='#/todotasks'>Главная</a></li><li class='active'>Невыполненные задачи</li>");

    $("#mnuToDoTasks").addClass("active");
    $("#mnuExecutedTasks").removeClass("active");

}]);