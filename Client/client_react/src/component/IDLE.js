import Slider from "react-slick";
import React, {useRef, useState, useEffect} from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from '../style/IDLE.module.css';
import {Link} from "react-router-dom";
import moment from "moment";

// 아래 주석 코드 블록은 무슨 목적이지?
// const Component = (props) => {
//     const {receiveAmount} = props
//     const prevAmount = usePrevious({receiveAmount});
//     useEffect(() => {
//         if(prevAmount.receiveAmount !== receiveAmount) {
//             console.log("change");
//             return true
//         }
//         else if(prevAmount.receiveAmount === receiveAmount){
//             console.log("nothing change");
//             return false
//         }
//     }, [receiveAmount])
// }

export default function IDLE() {
    const host_ip = `${process.env.REACT_APP_IP}`;
    const addr = "ws://"+ host_ip + ":5000";
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
                    console.log(imgs);
                    i++;
                }
            };
        }
    }, []);

    // imgs에 값이 초기화되면 0.5초 후 Slider를 시작하는 useEffect
    useEffect(() => {
        if (imgs.length !== 0) {
            setTimeout(function() {
                console.log("play");
                itemsRef.current[0].play();
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
        // console.log(index);
        if (sliderRef.current.props.children[index].type == 'video') {
            // Slider 컴포넌트가 영상인 경우 재생 수행
            itemsRef.current[index].play();
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
    };

    return (
        <div>
            <header className={styles.page3_header}>
                <div className={styles.page3_date}>
                    {time.format('YYYY-MM-DD')}
                </div>
                {/* LT=4:50 , LTS=4:50:21 */}
                <div className={styles.page3_time}>{time.format('LT')}</div>
            </header>
            <Slider {...settings} ref={sliderRef} id="list">
                {imgs.map((image, index) =>
                    // __image &&
                    isImage(image) === true && (
                        <img id="img_list" src={`${process.env.PUBLIC_URL}` + image} />
                    ) ||
                    isVideo(image) === true && (
                        <video ref={el => itemsRef.current[index] = el} id="video_list" onEnded={() => handleVideoEnd(index)} muted src={`${process.env.PUBLIC_URL}` + image}/>
                    )
                )}
            </Slider>
            <div className={styles.social}>
                <tr>
                    <p>작품보기<br/>
                        <button>
                            <Link to='/select' style={{color : 'white', textDecoration: 'none'}}>GO</Link>
                        </button>
                    </p>
                </tr>
                <tr>
                    <p className={styles.line}>낙서장<br/>
                        <button>
                            <Link to='/board' style={{color : 'white', textDecoration: 'none'}}>GO</Link>
                        </button>
                    </p>
                </tr>
                <tr>
                    <p className={styles.QR}>
                        <img key="shelter_num" src={`${process.env.PUBLIC_URL}` + '/ftp/ShelterQR/Content/Shelter_'+ shelter_num + '/contentQR.jpg'}/>
                    </p>
                </tr>
            </div>
        </div>
    );
}

