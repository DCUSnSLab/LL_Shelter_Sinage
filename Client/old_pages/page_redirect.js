
let $wrap = document.getElementById('wrap'),
    $Alert = document.getElementById('alert');


function Timer(fn, t) {
    let timerObj = setInterval(fn, t);

    //타이머 멈추는거
    this.stop = function() {
        if (timerObj) {
            clearInterval(timerObj);
            timerObj = null;
        }
        return this;
    }

    //타이머 시작하거나 멈춘거 다시 시작하는거
    // start timer using current settings (if it's not already running)
    this.start = function() {
        if (!timerObj) {
            this.stop();
            timerObj = setInterval(fn, t);
        }
        return this;
    }

    //타이머 리셋하는 거
    // start with new or original interval, stop current interval
    this.reset = function(newT = t) {
        t = newT;
        return this.stop().start();
    }
}


let timer = new Timer(function() {
    location.href = document.referrer;
    }, 5000);

$Alert.innerHTML = "timer start";
timer.start();

$wrap.addEventListener('click', function (){
    timer.reset();
    timer.start();
    $Alert.innerHTML = "타이머 reset";
});


// 300000);