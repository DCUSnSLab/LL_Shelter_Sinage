//!dom의 컨텐츠를 다 읽으면 브라우저가 할 일!

const $Left_B = document.getElementById('button_a'),
    $Right_B = document.getElementById('button_b'),
    $Side = document.getElementById('button_c'),
    page2 = ['http://localhost:63342/%EC%82%AC%EC%9D%B4%EB%8B%88%EC%A7%80/venv/gallery.html',
        'http://localhost:63342/%EC%82%AC%EC%9D%B4%EB%8B%88%EC%A7%80/venv/community.html',
        'http://localhost:63342/%EC%82%AC%EC%9D%B4%EB%8B%88%EC%A7%80/venv/features.html'];

const $slideList = document.querySelector('.slide_list'),
$slide = document.querySelectorAll('.slide_content');
const slideSpeed = 600;
let slideLen = $slide.length;  // slide length
const slideWidth = 1024; // slide width
const startNum = 0;
const $B0 = document.getElementById('b0'),
$B1 = document.getElementById('b1'),
$B2 = document.getElementById('b2');


$slideList.style.width = slideWidth * (slideLen + 2) + 'px';

let firstChild = $slideList.firstElementChild;
let lastChild = $slideList.lastElementChild;

let cloneSlide_first = firstChild.cloneNode(true);
let cloneSlide_last = lastChild.cloneNode(true);
$slideList.append(cloneSlide_first);
$slideList.insertBefore(cloneSlide_last, $slideList.firstElementChild);

$slideList.style.transform = "translate3d(-" + (slideWidth * (startNum + 1)) + "px, 0px, 0px)";

let curIndex = startNum;
let curSlide = $slide[curIndex]; // current slide dom
curSlide.classList.add('slide_active');

function MoveSlide(){
if (curIndex <= slideLen - 1) {
  $slideList.style.transition = slideSpeed + "ms";
  $slideList.style.transform = "translate3d(-" + (slideWidth * (curIndex + 2)) + "px, 0px, 0px)";
  }
if (curIndex === slideLen - 1) {
  setTimeout(function() {
    $slideList.style.transition = "0ms";
    $slideList.style.transform = "translate3d(-" + slideWidth + "px, 0px, 0px)";
    }, slideSpeed);
  curIndex = -1;}

  curSlide.classList.remove('slide_active');
  curSlide = $slide[++curIndex];
  curSlide.classList.add('slide_active');
};

setInterval(MoveSlide, 4000);




$B0.addEventListener('click', function (){

})

$B1.addEventListener('click', function (){

})

$B2.addEventListener('click', function (){

})




function time() {
            let today = new Date();
            let year = today.getFullYear(); // 년도
            let month = today.getMonth() + 1;  // 월
            let date = today.getDate();  // 날짜

            let full_date = year + '-' + month + '-' + date + '<br>';

            if (month < 10 && date < 10) {
                full_date = year + '-' + '0' + month + '-' + '0' + date + '<br>';
            } else if (month < 10 && date >= 10) {
                full_date = year + '-' + '0' + month + '-' + date + '<br>';
            } else if (date < 10 && month >= 10) {
                full_date = year + '-' + month + '-' + '0' + date + '<br>';
            }

            let hours = today.getHours(); // 시
            let minutes = today.getMinutes();  // 분
            let ampm = hours >= 12 ? 'pm' : 'am';
            hours = hours % 12;
            hours = hours ? hours : 12;
            minutes = minutes < 10 ? '0' + minutes : minutes;
            let strTime = hours + ':' + minutes + ampm;

            if (hours >= 10) {
            } else {
                strTime = '0' + hours + ':' + minutes + ampm;
            }

            document.getElementById('date').innerHTML = full_date;
            document.getElementById('time').innerHTML = strTime;

            setTimeout(function (){time()}, 1000);
        }

$Left_B.addEventListener('click', function (){
    location.href = page2[0];
})

$Right_B.addEventListener('click', function (){
    location.href = page2[1];
})

$Side.addEventListener('click', function (){
    location.href = page2[2];
})
