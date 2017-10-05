
myApp.config(['$routeProvider', function($routeProvider){
    $routeProvider
     .when('/',{
       templateUrl : 'view/index-view.html',
       controller : 'indexController',
       controllerAs : 'myIndex'
     })
     .when('/filter',{
       templateUrl : 'view/filter-view.html',
       controller : 'mainController',
       controllerAs : 'myScorecard'
     })
     .when('/filter/team',{
       templateUrl : 'view/team-view.html',
       controller : 'teamController',
       controllerAs : 'myTeam'
     })
     .when('/stats',{
       templateUrl : 'view/stats-view.html',
       controller : 'statsController',
       controllerAs : 'myStats'
     })
     .when('/filter/team/:currentTeam',{
       templateUrl : 'view/singleTeam-view.html',
       controller : 'singleTeamController',
       controllerAs : 'mySingleTeam'
     })
     .when('/filter/matchday',{
       templateUrl : 'view/matchday-view.html',
       controller : 'matchdayController',
       controllerAs : 'myMatchday'
     })
     .when('/filter/matchday/:currentMatchday',{
       templateUrl : 'view/day-view.html',
       controller : 'dayController',
       controllerAs : 'myDay'
     })
     .when('/filter/matchday/:codeId1/:codeId2/:matchDate/:teamOne/:teamTwo/:teamOneKey/:teamTwoKey/:teamOneScore/:teamTwoScore',{   // edited by Ganapathy
       templateUrl : 'view/singleMatchday-view.html',
       controller : 'matchdayControllerSingle',
       controllerAs : 'myMatchdaySingle'
     })
     .when('/filter/year',{
       templateUrl : 'view/year-view.html',
       controller : 'yearController',
       controllerAs : 'myYear'
     })
     .when('/filter/date',{
       templateUrl : 'view/date-view.html',
       controller : 'dateController',
       controllerAs : 'mydate'
     })
     .when('/filter/date/:selectedDate',{
       templateUrl : 'view/single-date-view.html',
       controller : 'singleDateController',
       controllerAs : 'mySingleDate'
     })
     .otherwise({
       template: '<h1> Not Found </h1>'
     });

}]);
