const $Left_B = document.getElementById('button_a'),
    $Right_B = document.getElementById('button_b'),
    page2 = ['http://localhost:63342/%EC%82%AC%EC%9D%B4%EB%8B%88%EC%A7%80/venv/gallery.html',
        'http://localhost:63342/%EC%82%AC%EC%9D%B4%EB%8B%88%EC%A7%80/venv/community.html',
        'http://localhost:63342/%EC%82%AC%EC%9D%B4%EB%8B%88%EC%A7%80/venv/features.html'];

const $slideList = document.querySelector('.slide_list'),
$slide = document.querySelectorAll('.slide_content');
const next = document.querySelector('#next'); // next button
const prev = document.querySelector('#prev'); // prev button
const slideSpeed = 900;
let slideLen = $slide.length;  // slide length
const slideWidth = 1015; // slide width
const startNum = 0;

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

next.addEventListener('click', function (){
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
});

prev.addEventListener('click', function (){
  if (curIndex >= 0) {
    $slideList.style.transition = slideSpeed + "ms";
    $slideList.style.transform = "translate3d(-" + (slideWidth * curIndex) + "px, 0px, 0px)";
  }  if (curIndex === 0) {
    setTimeout(function() {
      $slideList.style.transition = "0ms";
      $slideList.style.transform = "translate3d(-" + (slideWidth * slideLen) + "px, 0px, 0px)";
      }, slideSpeed);
    curIndex = slideLen;
  }
  curSlide.classList.remove('slide_active');
  curSlide = $slide[--curIndex];
  curSlide.classList.add('slide_active');
});


$Left_B.addEventListener('click', function (){
    location.href = page2[0];
})

$Right_B.addEventListener('click', function (){
    location.href = page2[1];
})









