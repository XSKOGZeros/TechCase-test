angular.module("registrationControllerModule", [])

.controller("registrationController", ["$scope", "arrayUtils" , function($scope,arrayUtils){

    // Initialize the registration form
    $scope.formParams={};
    $scope.formParams.name="";
    $scope.formParams.age="";
    $scope.formParams.nameValid=true;
    $scope.formParams.ageValid=true;
    $scope.formParams.category = {child: true, teenager: true, adult: true, elderly:true};
    $scope.personArray=[];

    // Add a new person to the array
    $scope.register = function(){
        $scope.formParams.nameValid=true;
        $scope.formParams.ageValid=true;
        var age = Number($scope.formParams.age);
        if($scope.formParams.name==""){
            $scope.formParams.nameValid=false;
        }
        if(isNaN(age) || age<0 || age>120 || age % 1 != 0){
            $scope.formParams.ageValid=false;
        }
        if( $scope.formParams.nameValid && $scope.formParams.ageValid){
            var entry = {name: $scope.formParams.name.toUpperCase(), age: age, category: $scope.getCategory($scope.formParams.age)};
            arrayUtils.sortedInsertion($scope.personArray, entry);
            $scope.formParams.name="";
            $scope.formParams.age="";
        }
    };

    // Get the category of the person
    $scope.getCategory = function(age){
        if(age<=11){//[0,11]
            return "child";
        }
        else if(age<=19){//[12,19]
            return "teenager";
        }
        else if(age<=64){//[20,64]
            return "adult";
        }
        else{ //[65,120]
            return "elderly";
        }
    }



}])
.factory("arrayUtils", function(){
    var arrayUtils = {};

    // Compare two entries and return the result
    arrayUtils.compareEntries = function(a, b){
        if(a.age < b.age){
            return -1;
        }
        if(a.age > b.age){
            return 1;
        }
        if(a.name < b.name){
            return -1;
        }
        if(a.name > b.name){
            return 1;
        }
        return 0;
    }

    // Insert an entry into the sorted array
    arrayUtils.sortedInsertion = function(array, entry){
        var i = 0;
        while(i < array.length && arrayUtils.compareEntries(array[i],entry) <= 0){
            i++;
        }
        array.splice(i, 0, entry);
    }
    return arrayUtils;
});