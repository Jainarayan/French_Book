window.document.onkeydown = function(e) {
  if (!e) {
    e = event;
  }
  if (e.keyCode == 27) {
    lightbox_close();
    lightbox_close1();
    lightbox_close2();
  }
}

function lightbox_open() {
  var lightBoxVideo = document.getElementById("PopUpVideo");
  window.scrollTo(0, 0);
  document.getElementById('light').style.display = 'block';
  document.getElementById('fade').style.display = 'block';
  lightBoxVideo.play();
}

function lightbox_close() {
  var lightBoxVideo = document.getElementById("PopUpVideo");
  document.getElementById('light').style.display = 'none';
  document.getElementById('fade').style.display = 'none';
  lightBoxVideo.pause();
}

function lightbox_open1() {
  var lightBoxVideo1 = document.getElementById("PopUpVideo1");
  window.scrollTo(0, 0);
  document.getElementById('light1').style.display = 'block';
  document.getElementById('fade1').style.display = 'block';
  lightBoxVideo1.play();
}

function lightbox_close1() {
  var lightBoxVideo1 = document.getElementById("PopUpVideo1");
  document.getElementById('light1').style.display = 'none';
  document.getElementById('fade1').style.display = 'none';
  lightBoxVideo1.pause();
}

function lightbox_open2() {
  var lightBoxVideo2 = document.getElementById("PopUpVideo2");
  window.scrollTo(0, 0);
  document.getElementById('light2').style.display = 'block';
  document.getElementById('fade2').style.display = 'block';
  lightBoxVideo2.play();
}

function lightbox_close2() {
  var lightBoxVideo2 = document.getElementById("PopUpVideo2");
  document.getElementById('light2').style.display = 'none';
  document.getElementById('fade2').style.display = 'none';
  lightBoxVideo2.pause();
}
