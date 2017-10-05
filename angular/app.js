var myApp = angular.module('scorecardApp',['ngRoute']);





myApp.directive('jquery',function(){
    return {
          link: function(scope, element, attribute){

            $(document).ready(function()
            {
              $('#year15').hide();
              $('.year16').hide();
              $('.xx').hide();
              $('.teamWise15').hide();
              $('.teamWise16').hide();
              $('.teamYearOne').hide();
              $('.teamYearTwo').hide();
              $('.select15').on('click',function()
              {
                $('#year15').show(200);
                $('.year16').hide();
                $('.teamWise15').hide();
                $('.teamWise16').hide();
              });
              $('.select16').on('click',function()
              {
                $('#year15').hide();
                $('.year16').show(200);
                $('.teamWise15').hide();
                $('.teamWise16').hide();
              });
              $('.selectTeamWise').on('click',function()
              {
                $('#year15').hide();
                $('.year16').hide();
                $('.teamWise15').show(200);
                $('.teamWise16').show(200);
              });

              $('.teamOne').on('click',function()
              {
                $('.teamYearOne').show(200);
                $('.teamYearTwo').hide(200);
              });
              $('.teamTwo').on('click',function()
              {
                $('.teamYearTwo').show(100);
                $('.teamYearOne').hide(200);
              });

            });


          },


  };

});
myApp.controller('mainController',['$http',function($http){
var allTeams = new Array() ;
  var main = this;

  this.scorecard = [];
  this.teams = [];
  main.years = ['2015-16','2016-17'];
  this.baseUrl = "https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.json";
  var select = document.getElementsByClassName('dropbtnMatchDay');
  this.listTeamsName = function()
  {
     $http({
       method : 'GET',
       url : main.baseUrl
     }).then(function successCallBack(response){

            var matchDay = response.data.rounds; // For getting the whole Array

            // To get the teams name : START
            var data = response.data.rounds[0].matches;
            var strOne=new Array();
            var strTwo=new Array();
            for (var i = 0; i < data.length; i++) {
              strOne[i] = data[i].team1.name;
              strTwo[i] = data[i].team2.name;
            }

            console.log(matchDay);
            var matchSchedule = new Array();
            for (var i = 0; i < matchDay.length; i++) {
              matchSchedule[i] = matchDay[i].name;
            }
            console.log(data);
            console.log(matchSchedule);
            console.log(strOne);
            console.log(strTwo);

            allTeams = strOne.concat(strTwo);
            console.log(allTeams);
            // END
            main.matchDay = matchSchedule;
            main.names = allTeams;


     }, function errorCallBack(response){
            alert('check console');
            console.log(response);
     });
  }


}]);

myApp.controller('indexController',['$http',function($http){

  this.baseUrl = "https://raw.githubusercontent.com/openfootball/football.json/master/2016-17/en.1.json";
  this.indexDetails = [];
  var main=this;
  this.arrangeIndexPage = function(){
    $http({
      method : 'GET',
      url : main.baseUrl
    }).then(function successCallBack(response){

          var dataTwo = response.data.rounds;
          console.log(dataTwo);
          var matchDay = new Array();
          var matches = new Array();
          for (var i = 0; i < dataTwo.length; i++) {

             matches[i] = dataTwo[i].matches;
          }
          main.indexDetails = matches;
          console.log(matches);
          var newArray = [];
          for (var i = 0; i < matches.length; i++) {
            var curr = matches[i];
            for (var j = 0; j < curr.length; j++) {
              newArray.push(curr[j]);
            }
          }

    }, function errorCallBack(response){

    });
  }

  this.arrangeIndexPage();

}]);

myApp.controller('matchdayController',['$http',function($http){

  this.baseUrl = "https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.json";
  var main=this;
  this.matchdayValue = [];
  this.arrangeMatchdayPage = function(){
    $http({
      method : 'GET',
      url : main.baseUrl
    }).then(function successCallBack(response){
          var matchDay = response.data.rounds;
          console.log(matchDay);
          var matchSchedule = new Array();
          for (var i = 0; i < matchDay.length; i++) {
            matchSchedule[i] = matchDay[i].name;
          }
          console.log(matchSchedule);
          matchSchedule[0] = "Matchday 1";
          main.matchdayValue = matchSchedule;


    }, function errorCallBack(response){

    });
  }


}]);

myApp.controller('yearController',['$http',function($http){

  this.baseUrl = "https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.json";
  var main=this;
  this.arrangeyearPage = function(){
    $http({
      method : 'GET',
      url : main.baseUrl
    }).then(function successCallBack(response){


    }, function errorCallBack(response){

    });
  }


}]);

myApp.controller('dateController',['$http','$scope',function($http,$scope){

  this.baseUrl = "https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.json";
  var main=this;
  var sortedDate;
  var date = new Date();
  $scope.currentDate = function()
  {
    date = $scope.takeDate;
    console.log($scope.takeDate);
    var yyyy  = date.getFullYear();
    var mm = date.getMonth() + 1;
    if(mm==1 || mm==2 || mm==3 || mm==4 || mm==5 ||mm==6 || mm==7 || mm==8 || mm==9)
    {
      mm = "0"+mm;
    }

    var dd = date.getDate();

    if(dd==1 || dd==2 || dd==3 || dd==4 || dd==5 ||dd==6 || dd==7 || dd==8 || dd==9)
    {
      dd = "0"+dd;
    }
    console.log(yyyy);
    console.log(dd);
    console.log(mm);
    var newDate = yyyy+"-"+mm+"-"+dd;
    sortedDate = newDate;
    main.displayDate = sortedDate;
    console.log(newDate);
    console.log(date);
    console.log(sortedDate);
}

  this.arrangeDatePage = function(){
    $http({
      method : 'GET',
      url : main.baseUrl
    }).then(function successCallBack(response){
      console.log(response);



    }, function errorCallBack(response){

    });
  }


}]);

myApp.controller('singleDateController',['$http','$routeParams',function($http,$routeParams){

  this.baseUrl = "https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.json";
  this.base2Url = "https://raw.githubusercontent.com/openfootball/football.json/master/2016-17/en.1.json";
  var main=this;
  this.presentDate = $routeParams.selectedDate;
   console.log(this.presentDate);
  var currDate = this.presentDate;
  this.arrangeSingleDatePage = function(){
    $http({
      method : 'GET',
      url : main.baseUrl
    }).then(function successCallBack(response){
      var data = response.data.rounds;
       console.log(data);
       var dict =[];
       var next = new Array();
       for (var i = 0; i < data.length; i++) {
         next[i]=data[i].matches;

       }
       console.log(next);
       for(var i = 0; i < next.length; i++){
           for(var j = 0; j < next[i].length; j++){
                   dict.push(next[i][j]);
           }
       }
       console.log(dict);
       var newDict = [];
       for (var i = 0; i < dict.length; i++) {
         if(dict[i].date == currDate)
         {
           newDict.push(dict[i]);
         }
       }
       console.log(newDict);

       main.singleDateViews = newDict;
    }, function errorCallBack(response){

    });
  }

  this.arrangeSingleDate2Page = function(){
    $http({
      method : 'GET',
      url : main.base2Url
    }).then(function successCallBack(response){
      var data = response.data.rounds;
       console.log(data);
       var dict =[];
       var next = new Array();
       for (var i = 0; i < data.length; i++) {
         next[i]=data[i].matches;

       }
       console.log(next);
       for(var i = 0; i < next.length; i++){
           for(var j = 0; j < next[i].length; j++){
                   dict.push(next[i][j]);
           }
       }
       console.log(dict);
       var newDict = [];
       for (var i = 0; i < dict.length; i++) {
         if(dict[i].date == currDate)
         {
           newDict.push(dict[i]);
         }
       }
       console.log(newDict);

       main.singleDate2Views = newDict;
    }, function errorCallBack(response){

    });
  }


}]);

myApp.controller('teamController',['$http',function($http){

  this.baseUrl = "https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.json";
  var main=this;
  this.teamValue = [];
  this.arrangeTeamPage = function(){
    $http({
      method : 'GET',
      url : main.baseUrl
    }).then(function successCallBack(response){
      var data = response.data.rounds[0].matches;
      var strOne=new Array();
      var strTwo=new Array();
      for (var i = 0; i < data.length; i++) {
        strOne[i] = data[i].team1.name;
        strTwo[i] = data[i].team2.name;
      }
      allTeams = strOne.concat(strTwo);
      console.log(allTeams);

      main.teamValue = allTeams;

    }, function errorCallBack(response){

    });
  }


}]);
myApp.controller('dayController',['$http','$routeParams',function($http,$routeParams){

  this.baseUrl = "https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.json";
  var main=this;
  this.dayViews = [];
  this.matchdayCurrent = $routeParams.currentMatchday;
  console.log(this.matchdayCurrent);
  this.arrangeDayPage = function(){
    $http({
      method : 'GET',
      url : main.baseUrl
    }).then(function successCallBack(response){

          var details = new Array();
          var newDetails = new Array();
          var data  = response.data.rounds;
          data[0].name = "Matchday 1";
          console.log(data);
          for (var i = 0; i < data.length; i++) {
            if(data[i].name == main.matchdayCurrent)
            {
              details[i] = data[i].matches;
            }
          }
          console.log(details);

          for (var i = 0; i < details.length; i++) {
             var test = details[i];
             if(test != null)
             {
             for (var j = 0; j < test.length; j++) {
                  newDetails[j] = test[j];
             }
           }
          }
          console.log(newDetails);
          main.dayViews = newDetails;

    }, function errorCallBack(response){

    });
  }

this.baseUrl2 = "https://raw.githubusercontent.com/openfootball/football.json/master/2016-17/en.1.json";
this.day2Views = [];
this.arrangeDay2Page = function(){
    $http({
      method : 'GET',
      url : main.baseUrl2
    }).then(function successCallBack(response){
          console.log(response);
          var details = new Array();
          var newDetails = new Array();
          var data  = response.data.rounds;
          console.log(data);
          for (var i = 0; i < data.length; i++) {
            if(data[i].name == main.matchdayCurrent)
            {
              details[i] = data[i].matches;
            }
          }
          console.log(details);

          for (var i = 0; i < details.length; i++) {
             var test = details[i];
             if(test != null)
             {
             for (var j = 0; j < test.length; j++) {
                  newDetails[j] = test[j];
             }
           }
          }
          console.log(newDetails);
          main.day2Views = newDetails;
          console.log(main.day2Views);

    }, function errorCallBack(response){

    });
  }




}]);


myApp.controller('singleTeamController',['$http','$routeParams',function($http,$routeParams){

  this.baseUrl = "https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.json";
  this.base2Url = "https://raw.githubusercontent.com/openfootball/football.json/master/2016-17/en.1.json";
  var main=this;
  this.team = $routeParams.currentTeam;
  console.log(this.team);
  var currentTeam = this.team;
  this.singleTeamViews=[];
  this.singleTeam2Views=[];
  this.arrangeSingleTeamPage = function(){
    $http({
      method : 'GET',
      url : main.baseUrl
    }).then(function successCallBack(response){
            var data = response.data.rounds;

            var next = new Array();
            var firstTeam = new Array();
            var secondTeam = new Array();

            for (var i = 0; i < data.length; i++) {
              next[i]=data[i].matches;

            }
            console.log(data);
            console.log(next);
            var dict=[];
            var newDict = [];
            for(var i = 0; i < next.length; i++){
                for(var j = 0; j < next[i].length; j++){
                        dict.push(next[i][j]);
                }
            }

            console.log(dict);
            for (var i = 0; i < dict.length; i++) {
              if(dict[i].team1.name == currentTeam || dict[i].team2.name == currentTeam)
              {
                newDict.push(dict[i]);
              }
            }
            console.log(newDict);
            main.singleTeamViews = newDict;
            console.log(main.singleTeamViews);




    }, function errorCallBack(response){

    });
  }

  this.arrangeSingleTeam2Page = function(){
    $http({
      method : 'GET',
      url : main.base2Url
    }).then(function successCallBack(response){
            var data = response.data.rounds;

            var next = new Array();
            var firstTeam = new Array();
            var secondTeam = new Array();

            for (var i = 0; i < data.length; i++) {
              next[i]=data[i].matches;

            }
            console.log(data);
            console.log(next);
            var dict=[];
            var newDict = [];
            for(var i = 0; i < next.length; i++){
                for(var j = 0; j < next[i].length; j++){
                        dict.push(next[i][j]);
                }
            }

            console.log(dict);
            for (var i = 0; i < dict.length; i++) {
              if(dict[i].team1.name == currentTeam || dict[i].team2.name == currentTeam)
              {
                newDict.push(dict[i]);
              }
            }
            console.log(newDict);
            main.singleTeam2Views = newDict;
            console.log(main.singleTeam2Views);




    }, function errorCallBack(response){

    });
  }




}]);

myApp.controller('statsController',['$http','$routeParams',function($http,$routeParams){

  this.baseUrl = "https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.json";
  this.base2Url = "https://raw.githubusercontent.com/openfootball/football.json/master/2016-17/en.1.json";
  var main=this;
  this.teamFlow = [];
  this.arrangeStatsPage = function(){
    $http({
      method : 'GET',
      url : main.baseUrl
    }).then(function successCallBack(response){
           var allTeams = new Array();
           var dataOne = response.data.rounds[0].matches;
           var strOne=new Array();
           var strTwo=new Array();
           for (var i = 0; i < dataOne.length; i++) {
              strOne[i] = dataOne[i].team1.name;
              strTwo[i] = dataOne[i].team2.name;
           }

           allTeams = strOne.concat(strTwo);

            var data = response.data.rounds;
            var matches = new Array();
            console.log(data);
            for (var i = 0; i < data.length; i++) {
              matches[i] = data[i].matches;
            }
            console.log(matches);
            var whole = new Array() ;
            for (var i = 0; i < matches.length; i++) {
                var tryMe = matches[i];
                for (var j = 0; j < tryMe.length; j++) {
                  whole.push(tryMe[j]);
                }
              }
            console.log(whole);
            console.log(allTeams);


            var teamTotalGoals0 = new Array();
            var teamTotalGoals1 = new Array();
            var teamTotalGoals2 = new Array();
            var teamTotalGoals3 = new Array();
            var teamTotalGoals4 = new Array();
            var teamTotalGoals5 = new Array();
            var teamTotalGoals6 = new Array();
            var teamTotalGoals7 = new Array();
            var teamTotalGoals8 = new Array();
            var teamTotalGoals9 = new Array();
            var teamTotalGoals10 = new Array();
            var teamTotalGoals11 = new Array();
            var teamTotalGoals12 = new Array();
            var teamTotalGoals13 = new Array();
            var teamTotalGoals14 = new Array();
            var teamTotalGoals15 = new Array();
            var teamTotalGoals16 = new Array();
            var teamTotalGoals17 = new Array();
            var teamTotalGoals18 = new Array();
            var teamTotalGoals19 = new Array();


            for (var i = 0; i < whole.length; i++) {
              if(allTeams[0] == whole[i].team1.name)
              {
                teamTotalGoals0.push(whole[i].score1);
              }
              else if(allTeams[0] == whole[i].team2.name)
              {
                teamTotalGoals0.push(whole[i].score2);
              }
            }
            for (var i = 0; i < whole.length; i++) {
              if(allTeams[1] == whole[i].team1.name)
              {
                teamTotalGoals1.push(whole[i].score1);
              }
              else if(allTeams[1] == whole[i].team2.name)
              {
                teamTotalGoals1.push(whole[i].score2);
              }
            }
            for (var i = 0; i < whole.length; i++) {
              if(allTeams[2] == whole[i].team1.name)
              {
                teamTotalGoals2.push(whole[i].score1);
              }
              else if(allTeams[2] == whole[i].team2.name)
              {
                teamTotalGoals2.push(whole[i].score2);
              }
            }
            for (var i = 0; i < whole.length; i++) {
              if(allTeams[3] == whole[i].team1.name)
              {
                teamTotalGoals3.push(whole[i].score1);
              }
              else if(allTeams[3] == whole[i].team2.name)
              {
                teamTotalGoals3.push(whole[i].score2);
              }
            }
            for (var i = 0; i < whole.length; i++) {
              if(allTeams[4] == whole[i].team1.name)
              {
                teamTotalGoals4.push(whole[i].score1);
              }
              else if(allTeams[4] == whole[i].team2.name)
              {
                teamTotalGoals4.push(whole[i].score2);
              }
            }
            for (var i = 0; i < whole.length; i++) {
              if(allTeams[5] == whole[i].team1.name)
              {
                teamTotalGoals5.push(whole[i].score1);
              }
              else if(allTeams[5] == whole[i].team2.name)
              {
                teamTotalGoals5.push(whole[i].score2);
              }
            }
            for (var i = 0; i < whole.length; i++) {
              if(allTeams[6] == whole[i].team1.name)
              {
                teamTotalGoals6.push(whole[i].score1);
              }
              else if(allTeams[6] == whole[i].team2.name)
              {
                teamTotalGoals6.push(whole[i].score2);
              }
            }
            for (var i = 0; i < whole.length; i++) {
              if(allTeams[7] == whole[i].team1.name)
              {
                teamTotalGoals7.push(whole[i].score1);
              }
              else if(allTeams[7] == whole[i].team2.name)
              {
                teamTotalGoals7.push(whole[i].score2);
              }
            }
            for (var i = 0; i < whole.length; i++) {
              if(allTeams[8] == whole[i].team1.name)
              {
                teamTotalGoals8.push(whole[i].score1);
              }
              else if(allTeams[8] == whole[i].team2.name)
              {
                teamTotalGoals8.push(whole[i].score2);
              }
            }
            for (var i = 0; i < whole.length; i++) {
              if(allTeams[9] == whole[i].team1.name)
              {
                teamTotalGoals9.push(whole[i].score1);
              }
              else if(allTeams[9] == whole[i].team2.name)
              {
                teamTotalGoals9.push(whole[i].score2);
              }
            }
            for (var i = 0; i < whole.length; i++) {
              if(allTeams[10] == whole[i].team1.name)
              {
                teamTotalGoals10.push(whole[i].score1);
              }
              else if(allTeams[10] == whole[i].team2.name)
              {
                teamTotalGoals10.push(whole[i].score2);
              }
            }
            for (var i = 0; i < whole.length; i++) {
              if(allTeams[11] == whole[i].team1.name)
              {
                teamTotalGoals11.push(whole[i].score1);
              }
              else if(allTeams[11] == whole[i].team2.name)
              {
                teamTotalGoals11.push(whole[i].score2);
              }
            }
            for (var i = 0; i < whole.length; i++) {
              if(allTeams[12] == whole[i].team1.name)
              {
                teamTotalGoals12.push(whole[i].score1);
              }
              else if(allTeams[12] == whole[i].team2.name)
              {
                teamTotalGoals12.push(whole[i].score2);
              }
            }
            for (var i = 0; i < whole.length; i++) {
              if(allTeams[13] == whole[i].team1.name)
              {
                teamTotalGoals13.push(whole[i].score1);
              }
              else if(allTeams[13] == whole[i].team2.name)
              {
                teamTotalGoals13.push(whole[i].score2);
              }
            }
            for (var i = 0; i < whole.length; i++) {
              if(allTeams[14] == whole[i].team1.name)
              {
                teamTotalGoals14.push(whole[i].score1);
              }
              else if(allTeams[14] == whole[i].team2.name)
              {
                teamTotalGoals14.push(whole[i].score2);
              }
            }
            for (var i = 0; i < whole.length; i++) {
              if(allTeams[15] == whole[i].team1.name)
              {
                teamTotalGoals15.push(whole[i].score1);
              }
              else if(allTeams[15] == whole[i].team2.name)
              {
                teamTotalGoals15.push(whole[i].score2);
              }
            }
            for (var i = 0; i < whole.length; i++) {
              if(allTeams[16] == whole[i].team1.name)
              {
                teamTotalGoals16.push(whole[i].score1);
              }
              else if(allTeams[16] == whole[i].team2.name)
              {
                teamTotalGoals16.push(whole[i].score2);
              }
            }
            for (var i = 0; i < whole.length; i++) {
              if(allTeams[17] == whole[i].team1.name)
              {
                teamTotalGoals17.push(whole[i].score1);
              }
              else if(allTeams[17] == whole[i].team2.name)
              {
                teamTotalGoals17.push(whole[i].score2);
              }
            }
            for (var i = 0; i < whole.length; i++) {
              if(allTeams[18] == whole[i].team1.name)
              {
                teamTotalGoals18.push(whole[i].score1);
              }
              else if(allTeams[18] == whole[i].team2.name)
              {
                teamTotalGoals18.push(whole[i].score2);
              }
            }
            for (var i = 0; i < whole.length; i++) {
              if(allTeams[19] == whole[i].team1.name)
              {
                teamTotalGoals19.push(whole[i].score1);
              }
              else if(allTeams[19] == whole[i].team2.name)
              {
                teamTotalGoals19.push(whole[i].score2);
              }
            }


            var sum0 = teamTotalGoals0.reduce(function(a, b) { return a + b; }, 0);
            var sum1 = teamTotalGoals1.reduce(function(a, b) { return a + b; }, 0);
            var sum2 = teamTotalGoals2.reduce(function(a, b) { return a + b; }, 0);
            var sum3 = teamTotalGoals3.reduce(function(a, b) { return a + b; }, 0);
            var sum4 = teamTotalGoals4.reduce(function(a, b) { return a + b; }, 0);
            var sum5 = teamTotalGoals5.reduce(function(a, b) { return a + b; }, 0);
            var sum6 = teamTotalGoals6.reduce(function(a, b) { return a + b; }, 0);
            var sum7 = teamTotalGoals7.reduce(function(a, b) { return a + b; }, 0);
            var sum8 = teamTotalGoals8.reduce(function(a, b) { return a + b; }, 0);
            var sum9 = teamTotalGoals9.reduce(function(a, b) { return a + b; }, 0);
            var sum10 = teamTotalGoals10.reduce(function(a, b) { return a + b; }, 0);
            var sum11 = teamTotalGoals11.reduce(function(a, b) { return a + b; }, 0);
            var sum12 = teamTotalGoals12.reduce(function(a, b) { return a + b; }, 0);
            var sum13 = teamTotalGoals13.reduce(function(a, b) { return a + b; }, 0);
            var sum14 = teamTotalGoals14.reduce(function(a, b) { return a + b; }, 0);
            var sum15 = teamTotalGoals15.reduce(function(a, b) { return a + b; }, 0);
            var sum16 = teamTotalGoals16.reduce(function(a, b) { return a + b; }, 0);
            var sum17 = teamTotalGoals17.reduce(function(a, b) { return a + b; }, 0);
            var sum18 = teamTotalGoals18.reduce(function(a, b) { return a + b; }, 0);
            var sum19 = teamTotalGoals19.reduce(function(a, b) { return a + b; }, 0);


            var sortedSum = new Array();
            sortedSum.push(sum0,sum1,sum2,sum3,sum4,sum5,sum6,sum7,sum8,sum9,sum10,sum11,sum12,sum13,sum14,sum15,sum16,sum17,sum18,sum19);
            var rawSum = sortedSum;
            console.log(allTeams);
            console.log(sortedSum);
            console.log(sum11);
            console.log(allTeams[11]);
            main.lowestScorer = allTeams[11];
            main.lowestGoal = sum11;
            console.log(sum19);
            console.log(allTeams[19]);
            main.highestScorer = allTeams[19];
            main.highestGoal = sum19;
            var dict = [];
            var r = {},i,allTeams,rawSum;

            for (i = 0; i < allTeams.length; i++) {
                 r[allTeams[i]] = rawSum[i];
                 dict.push({

                     name:   allTeams[i],
                     goals: rawSum[i]
                 });

               }
            console.log(r);
            dict.sort(function(a, b) {
              return parseInt(a.goals) - parseInt(b.goals);
            });
            console.log(dict);
            var newDict = dict.reverse();
            console.log(newDict);
            var i = 0 ;
            var result = newDict.map(function(el) {
            var o = Object.assign({}, el);
            o.id = i+1;
            i++;
            return o;
         })
            main.ranking = result;
            console.log(main.ranking);





            var winner = [];
            for (var i = 0; i < whole.length; i++) {
               if(whole[i].score1 > whole[i].score2)
                 {
                    winner.push(whole[i].team1.name);
                 }
               else
                 {
                    winner.push(whole[i].team2.name);
                 }
            }
            console.log(winner);

            var obj = { };
            for (var i = 0, j = winner.length; i < j; i++) {
               if (obj[winner[i]]) {
                   obj[winner[i]]++;
               }
               else {
                   obj[winner[i]] = 1;
               }
            }

            main.teamFlow = obj;
            console.log(obj);
            var result = [];

            for(var key in obj)
            {
               if(obj.hasOwnProperty(key))
               {
                 result.push({
                     name: key,
                     wins: obj[key]
                  });
                }
              }
            console.log(result);

            result.sort(function(a, b) {
              return parseInt(a.wins) - parseInt(b.wins);
            });
            console.log(result);
            var newResult = result.reverse();
            console.log(newResult);



            var perTeamWins = newResult;
            var totalMatchesPlayed = 38;
            var perTeamScores = newDict;

            var perTeamLoss = [];
            for (var i = 0; i < perTeamWins.length; i++) {
              perTeamLoss.push({
                name: perTeamWins[i].name,
                loss: 38 - perTeamWins[i].wins
              });
            }

            console.log(totalMatchesPlayed);
            console.log(perTeamLoss);
            console.log(perTeamWins);
            console.log(perTeamScores);
            var wholeArray = [];
            for (var i = 0; i < whole.length; i++) {
              if(perTeamWins[i] == null || perTeamLoss[i] == null)
              {
                i++;
              }
              else
              {
                   wholeArray.push({
                     name : perTeamWins[i].name,
                     totalMatches : 38,
                     wins : perTeamWins[i].wins,
                     loss: perTeamLoss[i].loss
                   });
              }
            }
            console.log(wholeArray);

            main.teamFlow = wholeArray;
            console.log(main.teamFlow);





    }, function errorCallBack(response){

    });
  }




  this.arrangeStats2Page = function(){
    $http({
      method : 'GET',
      url : main.base2Url
    }).then(function successCallBack(response){
           var allTeams = new Array();
           var dataOne = response.data.rounds[0].matches;
           var strOne=new Array();
           var strTwo=new Array();
           for (var i = 0; i < dataOne.length; i++) {
              strOne[i] = dataOne[i].team1.name;
              strTwo[i] = dataOne[i].team2.name;
           }

           allTeams = strOne.concat(strTwo);

            var data = response.data.rounds;
            var matches = new Array();
            console.log(data);
            for (var i = 0; i < data.length; i++) {
              matches[i] = data[i].matches;
            }
            console.log(matches);
            var whole = new Array() ;
            for (var i = 0; i < matches.length; i++) {
                var tryMe = matches[i];
                for (var j = 0; j < tryMe.length; j++) {
                  whole.push(tryMe[j]);
                }
              }
            console.log(whole);
            console.log(allTeams);

            var teamTotalGoals0 = new Array();
            var teamTotalGoals1 = new Array();
            var teamTotalGoals2 = new Array();
            var teamTotalGoals3 = new Array();
            var teamTotalGoals4 = new Array();
            var teamTotalGoals5 = new Array();
            var teamTotalGoals6 = new Array();
            var teamTotalGoals7 = new Array();
            var teamTotalGoals8 = new Array();
            var teamTotalGoals9 = new Array();
            var teamTotalGoals10 = new Array();
            var teamTotalGoals11 = new Array();
            var teamTotalGoals12 = new Array();
            var teamTotalGoals13 = new Array();
            var teamTotalGoals14 = new Array();
            var teamTotalGoals15 = new Array();
            var teamTotalGoals16 = new Array();
            var teamTotalGoals17 = new Array();
            var teamTotalGoals18 = new Array();
            var teamTotalGoals19 = new Array();


            for (var i = 0; i < whole.length; i++) {
              if(allTeams[0] == whole[i].team1.name)
              {
                teamTotalGoals0.push(whole[i].score1);
              }
              else if(allTeams[0] == whole[i].team2.name)
              {
                teamTotalGoals0.push(whole[i].score2);
              }
            }
            for (var i = 0; i < whole.length; i++) {
              if(allTeams[1] == whole[i].team1.name)
              {
                teamTotalGoals1.push(whole[i].score1);
              }
              else if(allTeams[1] == whole[i].team2.name)
              {
                teamTotalGoals1.push(whole[i].score2);
              }
            }
            for (var i = 0; i < whole.length; i++) {
              if(allTeams[2] == whole[i].team1.name)
              {
                teamTotalGoals2.push(whole[i].score1);
              }
              else if(allTeams[2] == whole[i].team2.name)
              {
                teamTotalGoals2.push(whole[i].score2);
              }
            }
            for (var i = 0; i < whole.length; i++) {
              if(allTeams[3] == whole[i].team1.name)
              {
                teamTotalGoals3.push(whole[i].score1);
              }
              else if(allTeams[3] == whole[i].team2.name)
              {
                teamTotalGoals3.push(whole[i].score2);
              }
            }
            for (var i = 0; i < whole.length; i++) {
              if(allTeams[4] == whole[i].team1.name)
              {
                teamTotalGoals4.push(whole[i].score1);
              }
              else if(allTeams[4] == whole[i].team2.name)
              {
                teamTotalGoals4.push(whole[i].score2);
              }
            }
            for (var i = 0; i < whole.length; i++) {
              if(allTeams[5] == whole[i].team1.name)
              {
                teamTotalGoals5.push(whole[i].score1);
              }
              else if(allTeams[5] == whole[i].team2.name)
              {
                teamTotalGoals5.push(whole[i].score2);
              }
            }
            for (var i = 0; i < whole.length; i++) {
              if(allTeams[6] == whole[i].team1.name)
              {
                teamTotalGoals6.push(whole[i].score1);
              }
              else if(allTeams[6] == whole[i].team2.name)
              {
                teamTotalGoals6.push(whole[i].score2);
              }
            }
            for (var i = 0; i < whole.length; i++) {
              if(allTeams[7] == whole[i].team1.name)
              {
                teamTotalGoals7.push(whole[i].score1);
              }
              else if(allTeams[7] == whole[i].team2.name)
              {
                teamTotalGoals7.push(whole[i].score2);
              }
            }
            for (var i = 0; i < whole.length; i++) {
              if(allTeams[8] == whole[i].team1.name)
              {
                teamTotalGoals8.push(whole[i].score1);
              }
              else if(allTeams[8] == whole[i].team2.name)
              {
                teamTotalGoals8.push(whole[i].score2);
              }
            }
            for (var i = 0; i < whole.length; i++) {
              if(allTeams[9] == whole[i].team1.name)
              {
                teamTotalGoals9.push(whole[i].score1);
              }
              else if(allTeams[9] == whole[i].team2.name)
              {
                teamTotalGoals9.push(whole[i].score2);
              }
            }
            for (var i = 0; i < whole.length; i++) {
              if(allTeams[10] == whole[i].team1.name)
              {
                teamTotalGoals10.push(whole[i].score1);
              }
              else if(allTeams[10] == whole[i].team2.name)
              {
                teamTotalGoals10.push(whole[i].score2);
              }
            }
            for (var i = 0; i < whole.length; i++) {
              if(allTeams[11] == whole[i].team1.name)
              {
                teamTotalGoals11.push(whole[i].score1);
              }
              else if(allTeams[11] == whole[i].team2.name)
              {
                teamTotalGoals11.push(whole[i].score2);
              }
            }
            for (var i = 0; i < whole.length; i++) {
              if(allTeams[12] == whole[i].team1.name)
              {
                teamTotalGoals12.push(whole[i].score1);
              }
              else if(allTeams[12] == whole[i].team2.name)
              {
                teamTotalGoals12.push(whole[i].score2);
              }
            }
            for (var i = 0; i < whole.length; i++) {
              if(allTeams[13] == whole[i].team1.name)
              {
                teamTotalGoals13.push(whole[i].score1);
              }
              else if(allTeams[13] == whole[i].team2.name)
              {
                teamTotalGoals13.push(whole[i].score2);
              }
            }
            for (var i = 0; i < whole.length; i++) {
              if(allTeams[14] == whole[i].team1.name)
              {
                teamTotalGoals14.push(whole[i].score1);
              }
              else if(allTeams[14] == whole[i].team2.name)
              {
                teamTotalGoals14.push(whole[i].score2);
              }
            }
            for (var i = 0; i < whole.length; i++) {
              if(allTeams[15] == whole[i].team1.name)
              {
                teamTotalGoals15.push(whole[i].score1);
              }
              else if(allTeams[15] == whole[i].team2.name)
              {
                teamTotalGoals15.push(whole[i].score2);
              }
            }
            for (var i = 0; i < whole.length; i++) {
              if(allTeams[16] == whole[i].team1.name)
              {
                teamTotalGoals16.push(whole[i].score1);
              }
              else if(allTeams[16] == whole[i].team2.name)
              {
                teamTotalGoals16.push(whole[i].score2);
              }
            }
            for (var i = 0; i < whole.length; i++) {
              if(allTeams[17] == whole[i].team1.name)
              {
                teamTotalGoals17.push(whole[i].score1);
              }
              else if(allTeams[17] == whole[i].team2.name)
              {
                teamTotalGoals17.push(whole[i].score2);
              }
            }
            for (var i = 0; i < whole.length; i++) {
              if(allTeams[18] == whole[i].team1.name)
              {
                teamTotalGoals18.push(whole[i].score1);
              }
              else if(allTeams[18] == whole[i].team2.name)
              {
                teamTotalGoals18.push(whole[i].score2);
              }
            }
            for (var i = 0; i < whole.length; i++) {
              if(allTeams[19] == whole[i].team1.name)
              {
                teamTotalGoals19.push(whole[i].score1);
              }
              else if(allTeams[19] == whole[i].team2.name)
              {
                teamTotalGoals19.push(whole[i].score2);
              }
            }


            var sum0 = teamTotalGoals0.reduce(function(a, b) { return a + b; }, 0);
            var sum1 = teamTotalGoals1.reduce(function(a, b) { return a + b; }, 0);
            var sum2 = teamTotalGoals2.reduce(function(a, b) { return a + b; }, 0);
            var sum3 = teamTotalGoals3.reduce(function(a, b) { return a + b; }, 0);
            var sum4 = teamTotalGoals4.reduce(function(a, b) { return a + b; }, 0);
            var sum5 = teamTotalGoals5.reduce(function(a, b) { return a + b; }, 0);
            var sum6 = teamTotalGoals6.reduce(function(a, b) { return a + b; }, 0);
            var sum7 = teamTotalGoals7.reduce(function(a, b) { return a + b; }, 0);
            var sum8 = teamTotalGoals8.reduce(function(a, b) { return a + b; }, 0);
            var sum9 = teamTotalGoals9.reduce(function(a, b) { return a + b; }, 0);
            var sum10 = teamTotalGoals10.reduce(function(a, b) { return a + b; }, 0);
            var sum11 = teamTotalGoals11.reduce(function(a, b) { return a + b; }, 0);
            var sum12 = teamTotalGoals12.reduce(function(a, b) { return a + b; }, 0);
            var sum13 = teamTotalGoals13.reduce(function(a, b) { return a + b; }, 0);
            var sum14 = teamTotalGoals14.reduce(function(a, b) { return a + b; }, 0);
            var sum15 = teamTotalGoals15.reduce(function(a, b) { return a + b; }, 0);
            var sum16 = teamTotalGoals16.reduce(function(a, b) { return a + b; }, 0);
            var sum17 = teamTotalGoals17.reduce(function(a, b) { return a + b; }, 0);
            var sum18 = teamTotalGoals18.reduce(function(a, b) { return a + b; }, 0);
            var sum19 = teamTotalGoals19.reduce(function(a, b) { return a + b; }, 0);


            var sortedSum = new Array();
            sortedSum.push(sum0,sum1,sum2,sum3,sum4,sum5,sum6,sum7,sum8,sum9,sum10,sum11,sum12,sum13,sum14,sum15,sum16,sum17,sum18,sum19);
            var rawSum = sortedSum;
            console.log(allTeams);
            console.log(sortedSum);
            console.log(sum4);
            console.log(allTeams[4]);
            main.lowestScorer2 = allTeams[4];
            main.lowestGoal2 = sum4;
            console.log(sum13);
            console.log(allTeams[13]);
            main.highestScorer2 = allTeams[13];
            main.highestGoal2 = sum13;
            var dict = [];
            var r = {},i,allTeams,rawSum;

            for (i = 0; i < allTeams.length; i++) {
                 r[allTeams[i]] = rawSum[i];
                 dict.push({

                     name:   allTeams[i],
                     goals: rawSum[i]
                 });

               }
            console.log(r);
            dict.sort(function(a, b) {
              return parseInt(a.goals) - parseInt(b.goals);
            });
            console.log(dict);
            var newDict = dict.reverse();
            console.log(newDict);
            var i = 0 ;
            var result = newDict.map(function(el) {
            var o = Object.assign({}, el);
            o.id = i+1;
            i++;
            return o;
         })
        main.ranking2 = result;
        console.log(main.ranking2);

        var winner = [];
        for (var i = 0; i < whole.length; i++) {
           if(whole[i].score1 > whole[i].score2)
             {
                winner.push(whole[i].team1.name);
             }
           else
             {
                winner.push(whole[i].team2.name);
             }
        }
        console.log(winner);

        var obj = { };
        for (var i = 0, j = winner.length; i < j; i++) {
           if (obj[winner[i]]) {
               obj[winner[i]]++;
           }
           else {
               obj[winner[i]] = 1;
           }
        }

        console.log(obj);
        main.teamFlow = obj;
        var result = [];

        for(var key in obj)
        {
           if(obj.hasOwnProperty(key))
           {
             result.push({
                 name: key,
                 wins: obj[key]
              });
            }
          }
        console.log(result);

        result.sort(function(a, b) {
          return parseInt(a.wins) - parseInt(b.wins);
        });
        console.log(result);
        var newResult = result.reverse();
        console.log(newResult);



        var perTeamWins = newResult;
        var totalMatchesPlayed = 38;
        var perTeamScores = newDict;

        var perTeamLoss = [];
        for (var i = 0; i < perTeamWins.length; i++) {
          perTeamLoss.push({
            name: perTeamWins[i].name,
            loss: 38 - perTeamWins[i].wins
          });
        }

        console.log(totalMatchesPlayed);
        console.log(perTeamLoss);
        console.log(perTeamWins);
        console.log(perTeamScores);
        var wholeArray = [];
        for (var i = 0; i < whole.length; i++) {
          if(perTeamWins[i] == null || perTeamLoss[i] == null)
          {
            i++;
          }
          else
          {
               wholeArray.push({
                 name : perTeamWins[i].name,
                 totalMatches : 38,
                 wins : perTeamWins[i].wins,
                 loss: perTeamLoss[i].loss
               });
          }
        }
        console.log(wholeArray);

        main.teamFlow2 = wholeArray;
        console.log(main.teamFlow2);

    }, function errorCallBack(response){

    });
  }


}]);

myApp.controller('matchdayControllerSingle',['$http','$routeParams',function($http,$routeParams){

  this.baseUrl = "https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.json";
  var main=this;
  this.matchdayValue = [];

  this.matchdayId1 = $routeParams.codeId1;    // code of team1
  this.matchdayId2 = $routeParams.codeId2;    // code of team2
  this.matchDate = $routeParams.matchDate;         // date
  this.teamOneName = $routeParams.teamOne;
  this.teamTwoName = $routeParams.teamTwo;
  this.keyOne = $routeParams.teamOneKey;
  this.keyTwo = $routeParams.teamTwoKey;
  this.scoreOne = $routeParams.teamOneScore;
  this.scoreTwo = $routeParams.teamTwoScore;

 /*
   once you click the details in the index-view (check ng-href of your index-view.html), you'll be get the
    codes(codeId1,codeId2) ,date.

    Now that you have got those values in the view. You need to send them to the controller that displays details
    of individual matches.(In your case I hope that it is matchdayControllerSingle. If I'm wrong define your $routeParams in
     whichever controller you want) the $routeParams.codeId1 has the value of your team1's code. Same way $routeParams.codeId2.

     Inside your successCallBack, you have response.data.rounds which will have all the data
     but we need only the data for the match that we have clicked in your index-view.

      */

  console.log(this.matchdayId1);
  console.log(this.matchdayId2);
  console.log(this.matchDate);
  console.log(this.teamOneName);
  console.log(this.teamTwoName);
  console.log(this.keyOne);
  console.log(this.keyTwo);

  this.teamFirst = main.teamOneName;
  this.teamSecond = main.teamTwoName;
  this.codeFirst = main.matchdayId1;
  this.codeSecond = main.matchdayId2;
  this.keyFirst = main.keyOne;
  this.keySecond = main.keyTwo;
  this.scoreFirst = main.scoreOne;
  this.scoreSecond = main.scoreTwo;
  this.date = main.matchDate;
  this.arrangeMatchdaySinglePage = function(){
    $http({
      method : 'GET',
      url : main.baseUrl
    }).then(function successCallBack(response){
          var matchDay = response.data.rounds;
          console.log(matchDay);


     /* for (var i in matchDay){

            for (var j in matchDay[i].matches){

      test  here if matchDayId1, matchDayId2, matchDate matches with  matchDay[i].matches[j].team1.code,
        matchDay[i].matches[j].team2.code and matchDay[i].matches[j].date

        If it is satisfied, you have got the response for the data that you have clicked in your view which means that you
        now we have filtered our data (that particular match we clicked) from the whole response.data

            }
          }     */

          var matchSchedule = new Array();
          for (var i = 0; i < matchDay.length; i++) {
            matchSchedule[i] = matchDay[i].name;
          }
          console.log(matchSchedule);
          main.matchdayValue = matchSchedule;


    }, function errorCallBack(response){

    });
  }


}]);
