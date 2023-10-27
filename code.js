//Global Variables
var scores = {home: 0, away: 0};
var teams = {home: "Home", away: "Away"}
var service = undefined;
var receive = undefined
var titleRenameable = true;
var msgPlaying = false;

//Functions
function scoreAdd(team) {
    scores[team] += 1;
    document.getElementById(team+"Score").innerHTML = scores[team].toString().padStart(2, '0');
    let speakTxt;
    if (scores[service] == scores[receive]) {
        speakTxt = `${scores[service]} all, `
    } else {
        if (service == team) {
            speakTxt = `${scores[service]}, ${scores[receive]}, `
        } else {
            speakTxt = `${scores[receive]}, ${scores[service]}, `
        }
    }
    if (service == team) {
        msg(`${scores[service]} - ${scores[receive]}. Service continue`)
        speakTxt += `Service continue!`;
    } else {
        msg(`${scores[receive]} - ${scores[service]}. Service change`)
        speakTxt += `Service change!`;
        receive = service;
        service = team;
    }
    speakTxt = speakTxt.replace(', 0,', ', love,');
    speak(speakTxt);
}
function msg(message) {
    document.getElementById("msg").innerHTML = message
    document.getElementById("msg").style.animationName = "none";
    void document.getElementById("msg").offsetWidth;
    document.getElementById("msg").style.animationName = "msg";
    if (msgPlaying == true) {
        document.getElementById("msg").style.animationDelay = "-0.75s"
    } else {
        document.getElementById("msg").style.animationDelay = "0s"
    }
    document.getElementById("msg").onanimationend = function() {
        msgPlaying = false;
    }
    msgPlaying = true;
}
function speak(text) {
    if (document.getElementById("soundBtn").hidden == false) {
        if ('speechSynthesis' in window) {
            let synth = window.speechSynthesis;
            let utterance = new SpeechSynthesisUtterance(text);
            synth.speak(utterance);
        }
    }
}
speak(".")
function titleRename(elem) {
    let title = prompt(`Enter the new name for '${elem.innerHTML}'`)
    if (title.trim() != "" && title != undefined && title != NaN) {
        elem.innerHTML = title;
    }
}

//Scripts
document.getElementById("serviceBtn").onclick = function() {
    document.getElementById("resetBtn").hidden = false;
    document.getElementById("muteBtn").hidden = false;
    alert("Click on the score of the servicing team.")
    function start(team) {
        titleRenameable = false;
        document.getElementById("homeScore").innerHTML = "00";
        document.getElementById("awayScore").innerHTML = "00";
        msg(`Team '${teams[team]}' service`)
        speak(`Team '${teams[team]}' service`)
        document.getElementById("homeScore").onclick = function() {
            scoreAdd(this.getAttribute("val"))
        };
        document.getElementById("awayScore").onclick = function() {
            scoreAdd(this.getAttribute("val"))
        };
    }
    document.getElementById("homeScore").onclick = function() {
        service = "home"
        receive = "away"
        start("home");
    };
    document.getElementById("awayScore").onclick = function() {
        service = "away"
        receive = "home"
        start("away");
    };
    this.hidden = true;
}
document.getElementById("resetBtn").onclick = function() {
    titleRenameable = true;
    document.getElementById("homeScore").onclick = function() {};
    document.getElementById("awayScore").onclick = function() {};
    document.getElementById("serviceBtn").hidden = false;
    document.getElementById("soundBtn").hidden = true;
    document.getElementById("muteBtn").hidden = true;
    this.hidden = true;
    scores = {home: 0, away: 0};
    service = undefined;
    document.getElementById("homeScore").innerHTML = "--";
    document.getElementById("awayScore").innerHTML = "--";
}
document.getElementById("soundBtn").onclick = function() {
    msg("Muted");
    this.hidden = true;
    document.getElementById("muteBtn").hidden = false;
};
document.getElementById("muteBtn").onclick = function() {
    msg("Sound Enabled");
    this.hidden = true;
    document.getElementById("soundBtn").hidden = false;
    speak("Sound Enabled");
};
document.getElementById("homeTitle").onclick = function() {
    if (titleRenameable == true) {
        titleRename(this);
        teams.home = this.innerHTML;
    }
}
document.getElementById("awayTitle").onclick = function() {
    if (titleRenameable == true) {
        titleRename(this)
        teams.away = this.innerHTML;
    }
}