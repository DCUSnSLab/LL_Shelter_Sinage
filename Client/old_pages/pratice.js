const $slideList = document.querySelector('.slide_list'),
$slide = document.querySelectorAll('.slide_content');
const next = document.querySelector('.Rb'); // next button
const prev = document.querySelector('.Lb'); // prev button
const slideSpeed = 600;
const slideLen = $slide.length;  // slide length
const slideWidth = 500; // slide width
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

})





