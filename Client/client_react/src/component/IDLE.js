import Slider from "react-slick";
import React, {useRef, useState, useEffect} from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from '../style/IDLE.module.css';
import {Link, useNavigate} from "react-router-dom";
import moment from "moment";

export default function IDLE() {
    const host_ip = `${process.env.REACT_APP_IP}`;
    const addr = "ws://"+ host_ip + ":5001";
    const [outputs, setOutputs] = useState([]);
    const [imgs, setImg] = useState([]);
    const [socketConnected, setSocketConnected] = useState(false);
    let ws = useRef(null);
    const shelter_num = `${process.env.REACT_APP_SHELTER_NUM}`;
    let timer = null;
    const [time, setTime] = useState(moment());
    let i = 0;

    useEffect(() => {
        if(!ws.current) {
            ws.current = new WebSocket(addr);
            ws.current.onopen = () => {
                console.log("connected to " + addr);
                setOutputs("connected to " + addr);
                setSocketConnected(true);
                ws.current.send(
                    JSON.stringify({
                        message: 0
                    })
                )
            };
            ws.current.onclose = (error) => {
                console.log("disconnect from " + addr);
                setOutputs("disconnect from " + addr)
                console.log(error);
            };
            ws.current.onerror = (error) => {
                console.log("connection error " + addr);
                setOutputs("connection error " + addr)
                console.log(error);
            };
            ws.current.onmessage = (evt) => {
                // server에서 보낸 데이터
                const data = JSON.parse(evt.data);
                if(i===0){
                    setImg(data)
                    console.log('recv data')
                    console.log(data);
                    i++;
                }
            };
        }
    }, []);

    // imgs에 값이 초기화되면 0.5초 후 Slider를 시작하는 useEffect
    useEffect(() => {
        if (imgs.length !== 0) {
            setTimeout(function() {
                if (itemsRef.current[0].id === "video_list") {
                    console.log("play");
                    itemsRef.current[0].play();
                }
                else {
                    console.log("slickNext");
                    sliderRef.current.slickNext();
                }
            }, 500);
        }
    }, [imgs]);

    useEffect(() => {
        timer = setInterval(() => {
            setTime(moment());
        }, 1000);
        return () => {
            clearInterval(timer);
        };
    }, []);

    function getExtension(filename) {
        let parts = filename.split('.');
        return parts[parts.length - 1];
    }


    // note 데이터 이미지 type 판별
    function isImage(filename) {
        let extI = getExtension(filename);
        switch (extI.toLowerCase()) {
            case 'jpg':
            case 'gif':
            case 'bmp':
            case 'png':
                return true;
        }
        return false;
    }

    // note 데이터 동영상 type 판별
    function isVideo(filename) {
        let extV = getExtension(filename);
        switch (extV.toLowerCase()) {
            case 'm4v':
            case 'avi':
            case 'mpg':
            case 'mp4':
                return true;
        }
        return false;
    }

    const settings = {
        infinite: false,
        initialSlide: 0,
        arrow: false,
        dots: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        focusOnSelect: false,
        fade: true,
        swipe: false,
        afterChange: index =>
            afterchange(index),
    };

    function afterchange(index) {
        // Slider 컴포넌트의 내용 변경 시 호출되는 함수입니다.
        // console.log("afterchange");
        // console.log(itemsRef);
        // console.log(itemsRef.current[index]);
        // console.log("afterchange");
        // console.log(index);

        //Sync with Projector
        console.log('player id = '+itemsRef.current[index].id);
            console.log(itemsRef);
            ws.current.send(
                    JSON.stringify({
                        message: "1"+itemsRef.current[index].id
                    })
                )
        if (sliderRef.current.props.children[index].type == 'video') {
            // Slider 컴포넌트가 영상인 경우 재생 수행
            setTimeout(function(){
                console.log('play movie')
                itemsRef.current[index].play();
            }, 150)

        }

        else if (sliderRef.current.props.children[index].type == 'img') {
            // 이미지인 경우 약 3초 후 다음 슬라이드로 넘깁니다.
            setTimeout(function() {
                if (index === imgs.length - 1) {
                    // 현재 슬라이드 요소가 마지막 요소인 경우, 0번째 요소로 초기화 진행
                    console.log("Loop finish");
                    sliderRef.current.slickGoTo(0);
                }
                else {
                    sliderRef.current.slickNext();
                }
            }, 3000);
        }
    }

    const sliderRef = useRef(null);
    const itemsRef = useRef([]);

    useEffect(() => {
        itemsRef.current = itemsRef.current.slice(0, imgs.length);
    }, [imgs]);

    function handleVideoEnd(index) {
        // 영상 재생 완료 시 호출되는 함수
        // console.log("handleVideoEnd");
        // itemsRef.currentTime = 0;
        // Go to the next slide when the video ends

        if (index === imgs.length - 1) {
            // 현재 슬라이드 요소가 마지막 요소인 경우, 0번째 요소로 초기화 진행
            console.log("Loop finish");
            sliderRef.current.slickGoTo(0);
        }
        else {
            sliderRef.current.slickNext();
        }
        // console.log(index);
        // console.log(imgs.length);

        if (index === imgs.length - 1) {
            sliderRef.current.slickGoTo(0);
        }
    };

    return (
        <div id={styles.IDLE_PAGE}>
            <header className={styles.page3_header}>
                <div className={styles.page3_date}>
                    {time.format('YYYY-MM-DD')}
                </div>
                {/* LT=4:50 , LTS=4:50:21 */}
                <div className={styles.page3_time}>{time.format('LT')}</div>
            </header>
            <Slider {...settings} ref={sliderRef} id="list" className={styles.slide_css}>
                {imgs.map((image, index) =>
                    // __image &&
                    isImage(image[0]) === true && (
                        <img ref={el => itemsRef.current[index] = el} id={image[1]} src={`${process.env.PUBLIC_URL}` + image[0]} />
                    ) ||
                    isVideo(image[0]) === true && (
                        <video ref={el => itemsRef.current[index] = el} id={image[1]} onEnded={() => handleVideoEnd(index)} muted src={`${process.env.PUBLIC_URL}` + image[0]}/>
                    )
                )}
            </Slider>
            <div className={styles.social}>
                <Link to={'/select'} style={{color : 'white', textDecoration: 'none'}}>
                <div>
                    <div>
                        <p>작품<br/>보기</p>
                    </div>
                </div>
                </Link>
                <div className={styles.vertical}></div>
                <Link to={'/'} style={{color : 'white', textDecoration: 'none'}}>
                <div>
                    <div style={{marginTop: '40%'}}>
                        <p>낙서장</p>
                    </div>
                </div>
                </Link>
                <div className={styles.vertical}></div>
                <div className={styles.QR}>
                    <div>
                        <img style={{marginTop: '25%'}} key="shelter_num" src={`${process.env.PUBLIC_URL}` + '/ftp/ShelterQR/Content/Shelter_'+ shelter_num + '/contentQR.jpg'}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

