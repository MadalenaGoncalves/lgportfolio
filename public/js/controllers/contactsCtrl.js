app.controller("ContactsController", function ($scope, $http) {
  $scope.messageRequired = true;

  console.log("successfully called ContactsController");
  
  // sendMail = function(isValid){
  sendMail = function(){
    console.log("@contactsCtrl: isValild=" + isValid);

    var data = ({
      name : this.name,
      email : this.email,
      message : this.message
    });
    $http.post('/contacts', data)
      .success(function(data,status,headers,config){
        // display "your message has been sent" message
      })
      .error(function(data,status,headers,config){

      });

  }
});
