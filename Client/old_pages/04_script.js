let $Left_B = document.getElementById('button_a'),
    $Right_B = document.getElementById('button_b'),
    $Side = document.getElementById('button_c'),
    page2 = ['http://localhost:63342/%EC%82%AC%EC%9D%B4%EB%8B%88%EC%A7%80/venv/gallery.html',
        'http://localhost:63342/%EC%82%AC%EC%9D%B4%EB%8B%88%EC%A7%80/venv/community.html',
        'http://localhost:63342/%EC%82%AC%EC%9D%B4%EB%8B%88%EC%A7%80/venv/features.html'];


$Left_B.addEventListener('click', function (){
    location.href = page2[0];
})

$Right_B.addEventListener('click', function (){
    location.href = page2[1];
})

$Side.addEventListener('click', function (){
    location.href = page2[2];
})