var hrs = document.getElementById('hrs'),
    mins = document.getElementById('mins'),
    secs = document.getElementById('secs'),

    hrsExist = document.getElementById('hrs-exist'),
    minsExist = document.getElementById('mins-exist'),

    hrsPlural = document.getElementById('hrs-plural'),
    minsPlural = document.getElementById('mins-plural'),
    secsPlural = document.getElementById('secs-plural'),
    attendPlural = document.getElementById('attend-plural'),

    control = document.getElementById('control'),
    reset = document.getElementById('reset'),
    end = document.getElementById('end'),
    noMore = document.getElementById('no-more'),
    whyNoMore = document.getElementById('why-no-more'),

    mtPast = document.getElementById('mt-past-present'),
    costPast = document.getElementById('cost-past-present'),

    attendInput = document.getElementById('attendees'),

    cost = document.getElementById('cost'),

    seconds = 0, minutes = 0, hours = 0,
    attendees = 2,
    firstClick = true,
    t;
  // FUTURE: remove global variables. use array for time store.

function getInput() {
  // TODO return an error to the user

  if (attendInput.value === '') {
    return attendees;

    // ensure the input is a number
  } else if (isNaN(Number(attendInput.value))) {
    return attendees;

    // no negative attendees
  } else if (Number(attendInput.value) <= 0) {
    return attendees;

    // save the new value
  } else if (Number(attendInput.value) === 1) {
    attendPlural.textContent = "attendee";
    attendees = attendInput.value;

  } else {
    attendPlural.textContent = "attendees";
    attendees = attendInput.value;
  }
}

function add() {
  // TODO what to do with > 99 hours?

  var tempsec, tempmin;

  tempsec = seconds + Number(attendees);      // 80 = 40 + 40
  seconds = tempsec % 60;                       // 20 = 80 % 60

  tempmin = minutes + Math.floor(tempsec / 60); // 1  = 80 / 60
  minutes = tempmin % 60;                       // 1  = 1  % 60

  hours = hours + Math.floor(tempmin / 60);     // 0  = 1  / 60

  hrs.textContent = hours;
  mins.textContent = minutes;
  secs.textContent = seconds;

  if (hours >= 1) {
    hrsExist.style.display = "inline";
    hrsPlural.textContent = "hours";
    if (hours === 1) {
      hrsPlural.textContent = "hour";
    }
  }

  if (minutes >= 1) {
    minsExist.style.display = "inline";
    minsPlural.textContent = "minutes";
    if (minutes === 1) {
      minsPlural.textContent = "minute";
    }
  }

  if (seconds >= 1) {
    secsPlural.textContent = "seconds";
    if (seconds === 1) {
      secsPlural.textContent = "second";
    }
  }

  timer();
}

function timer() {
  t = setTimeout(add, 1000);
}


// Button functions
control.onclick = function () {
  if (control.className === "start") {
    control.className = "stop";
    control.textContent = "Pause meeting.";
    cost.style.display = "block";
    end.style.display = "block";
    timer();
  } else if (control.className === "new") {
    hrs.textContent = "0";
    mins.textContent = "0";
    secs.textContent = "0";
    seconds = 0; minutes = 0; hours = 0;

    hrsExist.style.display = "none";
    minsExist.style.display = "none";

    cost.style.display = "none";

    noMore.style.display = "none";
    whyNoMore.style.display = "none";

    mtPast.textContent = "I am in a meeting with";
    costPast.textContent = "So far, this meeting has cost";

    attendInput.value = 2;
    attendees = 2;

    control.textContent = "Start meeting.";
    control.className = "start";

  } else {
    control.className = "start";
    control.textContent = "Continue meeting."
    clearTimeout(t);
  }
}

end.onclick = function () {
  clearTimeout(t);
  mtPast.textContent = "I was in a meeting with";
  costPast.textContent = "This meeting cost";
  end.style.display = "none";
  control.className = "new";
  control.textContent = "New meeting.";
  noMore.style.display = "block";
}

noMore.onclick = function () {
  if (noMore.className === "off") {
    noMore.className = "on";
    whyNoMore.style.display = "block";
  } else {
    noMore.className = "off";
    whyNoMore.style.display = "none";
  }
}


attendInput.onkeyup = function () {
  getInput();
}

attendInput.onclick = function () {
  this.select();
}
