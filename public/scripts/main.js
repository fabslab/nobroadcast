(function() {
  var imgFolder = 'images/waveforms/', audioFolder = 'audio/';

  var track = new Audio();

  var codecRegex = /^no|maybe$/;
  var codecs = {
    opus: !!track.canPlayType('audio/ogg; codecs="opus"').replace(codecRegex,''),
    ogg: !!track.canPlayType('audio/ogg; codecs="vorbis"').replace(codecRegex,''),
    mp3: !!track.canPlayType('audio/mpeg;').replace(codecRegex,'')
  };

  var ext = codecs.opus ? '.opus' : codecs.ogg ? '.ogg' : codecs.mp3 ? '.mp3' : '';
  track.src = 'audio/1' + ext;

  var playButton, waveBase, waveCover, prevButton, nextButton, songEls, buyButton, purchaseLinks;


  // Web audio here

  var AudioContext = window.AudioContext || window.webkitAudioContext;

  if (AudioContext) {
    window.addEventListener('load', function() {
      var context = new AudioContext();
      var source = context.createMediaElementSource();
      var analyzer = context.createAnalyzerNode();
      source.connect(analyser);
      analyzer.connect(context.destination);
    });
  }


  document.addEventListener('DOMContentLoaded', function() {

    buyButton = document.getElementById('buy-now');
    purchaseLinks = document.getElementsByClassName('purchase')[0];
    playButton = document.getElementById('play');
    prevButton = document.getElementById('prev');
    nextButton = document.getElementById('next');
    waveBase = document.getElementById('base');
    waveCover = document.getElementById('cover');
    songEls = document.getElementById('songs').children;

    buyButton.addEventListener('click', function() {
      purchaseLinks.style.display = 'block';
    });

    document.addEventListener('keydown', function(e) {
      if (e.keyCode == 32) togglePlayback();
      else if (e.keyCode == 37) prev();
      else if (e.keyCode == 39) next();
    });

    playButton.addEventListener('click', togglePlayback);
    prevButton.addEventListener('click', prev);
    nextButton.addEventListener('click', next);

    for (var i = 0; i < songEls.length; ++i) {
      songEls[i].addEventListener('click', handleSongClick);
    }

    track.addEventListener('ended', next);

    track.addEventListener('timeupdate', function() {
      var percentComplete = ((this.currentTime / this.duration) * 100);
      waveCover.style.width = percentComplete + '%';
    });
  });

  function prev() {
    playNextNumTrack(-1);
  }

  function next() {
    playNextNumTrack(1);
  }

  function playNextNumTrack(num) {
    var active = document.getElementsByClassName('active')[0];
    var trackNum = parseInt(active.id) + num;
    var songEl = document.getElementById(trackNum.toString());
    if (songEl) {
      active.className = '';
      songEl.className = 'active playing';
      playTrack(trackNum);
    } else if (track.ended) {
      active.className = '';
    }
  }

  function togglePlayback() {
    var active = document.getElementsByClassName('active')[0];
    ~active.className.indexOf('playing') ? active.className = 'active' : active.className = 'active playing';
    playButton.className ? playButton.className = '' : playButton.className = 'pause';
    track.paused || track.ended ? track.play() : track.pause();
  }

  function handleSongClick() {
    var playing = document.getElementsByClassName('playing')
      , active = document.getElementsByClassName('active')[0];
    if (active.id == this.id) {
      togglePlayback();
    } else {
      active.className = '';
      this.className = 'active playing';
      playTrack(this.id);
    }
  }

  function playTrack(num) {
    var src = audioFolder + num + ext;
    if (~track.src.indexOf(src)) return;
    track.src = src;
    playButton.className = 'pause';
    waveBase.src = imgFolder + num + '-bg.png';
    waveCover.style.width = 0;
    waveCover.style.backgroundImage = 'url(' + imgFolder + num + '.png)';
    track.play();
  }
})();