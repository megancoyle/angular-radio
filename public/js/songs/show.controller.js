"use strict";

(function(){
  angular
  .module("songs")
  .controller("SongShowController", [
    "$stateParams",
    "$firebaseObject",
    "$state",
    "$scope",
    "$sce",
    SongShowControllerFunction
  ]);

  function SongShowControllerFunction($stateParams, $firebaseObject, $state, $scope, $sce) {
    $scope.editSong = false;
    var vm = this;
    var ref = firebase.database().ref().child("songs/" + $stateParams.id);
    $firebaseObject(ref).$loaded().then(function(song){
      vm.song = song
    });
    vm.update = function(){
      vm.song.$save().then(function() {
        $state.go("songIndex");
      })
    }
    vm.play = function(song){
       vm.playSong = song;
       vm.playSong.encodedUrl = $sce.trustAsResourceUrl(song.songUrl);
     }
  }

}());
