angular
  .module('app')
  .controller('tlreg50OffCtrl', function ($scope, $http, $translate, $state, Cities, $window) {
    $scope.countries = Cities.query();
    $scope.formData = {};
    $scope.registered = false;
    $scope.allready = false;
    $scope.unknown = false;

    $scope.processTL = function () {
      $http.post('/api/regTerreslab', $scope.formData)
      .success(function (data) {
        switch (data.status) {
          case 200:
            $window.location.href = 'https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=36K4MWKVF4RK4';
            break;
          case 404:
            $scope.allready = true;
            break;
          case 400:
            $scope.unknown = true;
            break;
          default:
            console.log(data);
        }
      });
    };
  });
