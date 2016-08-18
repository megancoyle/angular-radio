"use strict";

(function(){
  angular
  .module("songs")
  .controller("SongIndexController", [
    "$firebaseArray",
    "$scope",
    SongIndexControllerFunction
  ]);

  function SongIndexControllerFunction($firebaseArray, $scope){
    $scope.addSong = false;
    var vm = this;
    var ref = firebase.database().ref().child("songs");
    vm.songs = $firebaseArray(ref);
    vm.create = function(){
      vm.songs.$add(vm.newSong).then(function(){
        vm.newSong = {};
      });
    }
    vm.delete = function(song){
      vm.songs.$remove(song)
    }
  }
}());
