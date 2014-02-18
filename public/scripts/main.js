(function() {
  var imgFolder = 'images/waveforms/', audioFolder = 'audio/';

  var track = new Audio();

  var codecRegex = /^no|maybe$/;
  var codecs = {
    opus: !!track.canPlayType('audio/ogg; codecs="opus"').replace(codecRegex,''),
    ogg: !!track.canPlayType('audio/ogg; codecs="vorbis"').replace(codecRegex,''),
    mp3: !!track.canPlayType('audio/mpeg;').replace(codecRegex,'')
  };

  var ext = codecs.opus ? '.opus' : codecs.ogg ? '.ogg' : '.mp3';
  track.src = 'audio/1' + ext;

  var playButton, waveBase, waveCover, prevButton, nextButton, canvas, songEls;


  document.addEventListener('DOMContentLoaded', function() {

    var purchaseLink, bioLink, biography, stores;

    purchaseLink = document.getElementById('purchase-link');
    bioLink = document.getElementById('biography-link');
    biography = document.getElementById('biography');
    stores = document.getElementById('stores');

    playButton = document.getElementById('play');
    prevButton = document.getElementById('prev');
    nextButton = document.getElementById('next');
    waveBase = document.getElementById('base');
    waveCover = document.getElementById('cover');
    canvas = document.getElementById('album-art-background');
    songEls = document.getElementById('songs').children;

    var canvasContext = canvas.getContext('2d');
    var img = new Image();

    img.src = 'images/no-broadcast-album.jpg';
    img.onload = resizeCanvas;

    window.addEventListener('resize', resizeCanvas);

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      canvasContext.drawImage(img, 0, 0, window.innerWidth, window.innerHeight);
    }

    // support use of space bar and arrow keys
    document.addEventListener('keydown', function(e) {
      if (e.keyCode == 32) togglePlayback(e);
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

    bioLink.addEventListener('click', function displayBiography() {
      toggleSection(biography);
    });
    purchaseLink.addEventListener('click', function displayStores() {
      toggleSection(stores);
    });

    function toggleSection(el) {
      var display = el.style.display;
      if (display == 'none') {
        el.style.display = 'block';
      } else {
        el.style.display = 'none';
      }
    }

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
      // reset back to first song, wait to play
      document.getElementById(1).className = 'active';
      playButton.className = '';
    }
  }

  function togglePlayback(e) {
    if (e) e.preventDefault();
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