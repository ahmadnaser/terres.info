angular
  .module('app')
  .controller('regDoc', function ($scope, $http, $mdToast, $translate, $state, $stateParams, Cities) {
    $translate('DOCUMENTARY').then(function (value) {
      $scope.textCat = value;
    });
    $scope.countries = Cities.query();
    $scope.formData = {};
    $scope.formData.section = '1';
    $scope.formData.nfilms = 1;
    $scope.formData.valCat = 2;
    $scope.updateImport = function () {
      var im;
      var data = new Date();
      var dataFinal = new Date('2017-01-15');
      if ($scope.formData.section === '1') {
        if (data > dataFinal) {
          im = 90;
        } else {
          im = 60;
        }
      } else {
        im = 150;
      }
      $scope.preu = $scope.formData.nfilms * im + ' €';
    };
    $scope.updateImport();
    $scope.processDoc = function () {
      $scope.formData.date = new Date();
      console.log($scope.formData);
      $http.post('/api/newCompetitor', $scope.formData)
      .success(function (data) {
        console.log(data);
        if (data === 'emailOK') {
          console.log(data);
          $translate('REGISTER.SATISFACTORY').then(function (value) {
            $mdToast.show(
              $mdToast.simple()
                .textContent(value)
                .position('top right')
                .hideDelay(6000)
            );
          });
          $state.go('index');
        }
      });
    };
  });
