var nums = document.getElementById('nums'),
    pause = document.getElementById('pause'),
    start = document.getElementById('start'),
    reset = document.getElementById('reset'),
    attendInput = document.getElementById('attendees'),
    seconds = 0, minutes = 0, hours = 0,
    attendees = 1,
    t;

function getInput() {
  // TODO return an error to the user

  if (attendInput.value === '') {
    return attendees;

    // ensure the input is a number
  } else if ( isNaN(Number(attendInput.value)) ) {
    return attendees;

    // no negative attendees
  } else if ( Number(attendInput.value) <= 0) {
    return attendees;

    // save the new value
  } else {
    attendees = attendInput.value;
  }
}

function add() {
  // TODO what to do with > 99 hours?

  var tempsec, tempmin;

  tempsec = seconds + Number(attendees);      // 80 = 40 + 40
  seconds = tempsec%60;                       // 20 = 80 % 60

  tempmin = minutes + Math.floor(tempsec/60); // 1  = 80 / 60
  minutes = tempmin%60;                       // 1  = 1  % 60

  hours = hours + Math.floor(tempmin/60);     // 0  = 1  / 60

  nums.textContent =
    (hours   ? (hours   > 9 ? hours   : "0" + hours)   : "00") + ":" +
    (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" +
    (seconds > 9 ? seconds : "0" + seconds);

  timer();
}

function timer() {
  t = setTimeout(add, 1000);
}

timer();

// TODO handle double clicks by global status lock
// Button functions
start.onclick = timer;
pause.onclick = function() {
  clearTimeout(t);
}
reset.onclick = function() {
  nums.textContent = "00:00:00";
  seconds = 0; minutes = 0; hours = 0;
}
attendInput.onkeyup = function() {
  getInput();
}
