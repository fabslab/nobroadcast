$(function() {
  $('.play').click(function() {
    $(this).toggleClass('play').toggleClass('pause');
  });

  $(window).resize(function() {
    var player = $('.player');
    player.css({
      left: ($(window).width() - player.outerWidth()) / 2,
      top: ($(window).height() - player.outerHeight()) - 100
    });
  });

  $(window).resize();

});

// setup the audio context
window.playAlbum = (function playAlbum() {

  // create audio element for first track



  var AudioContext = window.AudioContext || window.webkitAudioContext;

  if (!AudioContext) {
    // Web Audio API not supported
    // TODO: create audio element and play without visualization
    return;
  }

  var context = new contextClass();

  // TODO: receive binary stream of FLAC audio for each track
  // decode it and run it through an analyser node to create visualization on canvas element
  // before sending it to the destination to play it

  // set up playback controls


})();