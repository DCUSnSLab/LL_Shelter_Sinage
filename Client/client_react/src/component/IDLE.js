import Slider from "react-slick";
import React, {useRef, useState, useEffect} from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from '../style/IDLE.module.css';
import {Link} from "react-router-dom";
import moment from "moment";

export default function IDLE() {
    const host_ip = `${process.env.REACT_APP_IP}`;
    const addr = "ws://"+ host_ip + ":5000";
    const [outputs, setOutputs] = useState([]);
    const [imgs, setImg] = useState([]);
    const [socketConnected, setSocketConnected] = useState(false);
    let ws = useRef(null);
    const shelter_num = 1
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

    // imgs에 값이 초기화되면 1.5초 후 Slider를 시작하는 useEffect
    useEffect(() => {
        if (imgs.length !== 0) {
            setTimeout(function() {
                console.log("play");
                itemsRef.current[0].play();
            }, 1500);
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
        console.log(itemsRef);
        console.log(itemsRef.current[index]);
        console.log("afterchange");
        // console.log(index);
        if (sliderRef.current.props.children[index].type == 'video') {
            itemsRef.current[index].play();
        }

        else if (sliderRef.current.props.children[index].type == 'img') {
            setTimeout(function() {
                sliderRef.current.slickNext();
            }, 3000);
        }
    }

    const sliderRef = useRef(null);
    const itemsRef = useRef([]);

    useEffect(() => {
        itemsRef.current = itemsRef.current.slice(0, imgs.length);
    }, [imgs]);

    function handleVideoEnd(index) {
        console.log("handleVideoEnd");
        // itemsRef.currentTime = 0;
        // Go to the next slide when the video ends
        sliderRef.current.slickNext();

        console.log(index);
        console.log(imgs.length);

        if (index === imgs.length - 1) {
            sliderRef.current.slickGoTo(0);
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

