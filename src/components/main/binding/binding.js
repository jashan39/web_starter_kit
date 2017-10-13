"use strict";
app.controller('controller.main.binding', ['_', '$scope', '$state', (_, $scope, $state) => {

  $scope.users = [
    { name: "Tom Anderson", job: "Everyone's first friend"}
  ];

  $scope.addUser = (f) => {

    // Validation would go here!

    $scope.users.push({name: $scope.user.name, job: $scope.user.job}); // Push user into array
    $scope.user = {name: null, job: null} // Reset the form

  }

  $scope.removeUser = (i) => {
    delete $scope.users.splice(i, 1);
  }


}]);
