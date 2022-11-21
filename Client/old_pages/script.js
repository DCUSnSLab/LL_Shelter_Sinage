//!dom의 컨텐츠를 다 읽으면 브라우저가 할 일!

//*만약 script를 head에 추가하고 싶다면, 할 일에 적는다
/*document.addEventListener('DOMcontentLoaded', function (){
    할 일
})
*/

var $sliderWrap = document.querySelector('.container'),
    //하나만 들어오게 querySelector로
    $sliderContainer = document.querySelector('.slider-container'),
    //slide안에는 여러개의 컨텐츠가 들어와야하니까 배열로 querySelectorAll로 한다.
    //배열로 들어와야 배열을 다르게 줄 수 있다.
    $slide = document.querySelectorAll('.slide'),
    $navPrev = document.getElementById('prev'),
    $navNext = document.getElementById('next'),
    $slideCount = $slide.length,
    $currentIndex = 0, //index번호
    $slideHeight = 0;


//슬라이드의 높이 확인하여 부모의 높이로 지정학기 -> container와 slider-container에게
// 대상.offsetHeight -> 대상의 높이 확인가능
// 슬라이드는 지금 queryselectorAll이라고 잡았으니까 배열로 들어와 있다

    for(var i = 0; i < $slideCount; i++){
        //슬라이드의 높이가 몇번째보다 높으면 걔를 slide의 height로 지정
        if($slideHeight < $slide[i].offsetHeight){
            $slideHeight = $slide[i].offsetHeight;
        }
    }

    $sliderWrap.style.height = $slideHeight + 'px';
    $sliderContainer.style.height = $slideHeight + 'px';

// 슬라이드가 있으면 가로로 배열하기
    for(var a = 0; a < $slideCount; a++){
        $slide[a].style.left = a * 100 + '%';
    }

// 슬라이드 이동 함수
// goToSlide함수는 slide li의 번호에 따라서 ul의 left 값을 바꿔야 한다.
    function goToSlide(idx){
        $sliderContainer.style.left = -100 * idx + '%';
        $sliderContainer.classList.add('animated');
        $currentIndex = idx;
    }


// 버튼기능 업데이트 함수

// 버튼을 클릭하면 슬라이드 이동시키기.

// 다음버튼을 클릭하면 할일, 이전 버튼을 클릭하면 할일.
// slide를 움직이는건 slider-container , ul을 움직이면 된다!
$navPrev.addEventListener('click', function (){
    if($currentIndex == 0){
        //처음이라면?
        goToSlide($slideCount - 1);
    }
    else{
        //처음이 아니라면?
        goToSlide($currentIndex - 1);
    }
})
$navNext.addEventListener('click', function (){
    //$currentIndex[0] - next btn click -100%
    //$currentIndex[1] - next btn click -200%
    //사용자가 어느 화면을 보고 있는지 파악해야한다. $currentIndex로 파악한다.


    if($currentIndex == $slideCount - 1){
        //끝이라면?
        goToSlide(0);
    }
    else{
        //끝이 아니라면?
        goToSlide($currentIndex + 1);
    }

})

console.log($slideCount, $slideHeight)
// 첫번째 슬라이드 먼저 보이도록 하기

