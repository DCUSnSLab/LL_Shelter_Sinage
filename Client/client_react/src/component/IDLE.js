import Slider from "react-slick";
import React, {useRef, useState, useEffect} from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from '../style/IDLE.module.css';
import {Link} from "react-router-dom";
import moment from "moment";
import { motion, AnimatePresence } from 'framer-motion/dist/framer-motion';

export default function IDLE() {
    const host_ip = `${process.env.REACT_APP_IP}`;
    const addr = "ws://"+ host_ip + ":5000";
    const [outputs, setOutputs] = useState([]);
    const [imgs, setImg] = useState([]);
    const [socketConnected, setSocketConnected] = useState(false);

    let ws = useRef(null);

    const shelter_num = 7

    function addMessage(img) {
        setImg([...imgs, img]);
    }
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
                const data = JSON.parse(evt.data)
                data.map((data) => {
                    addMessage(data);
                    console.log(data);
                })
            };
        };
    }, []);
    const settings = {
        slide: 'div',
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrow: false
    };

    let timer = null;
    const [time, setTime] = useState(moment());

    useEffect(() => {
        timer = setInterval(() => {
            setTime(moment());
        }, 1000);
        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <div>
            <header className={styles.page3_header}>
                <div className={styles.page3_date}>
                    {time.format('YYYY-MM-DD')}
                </div>
                {/* LT=4:50 , LTS=4:50:21 */}
                <div className={styles.page3_time}>{time.format('LT')}</div>
            </header>
            <Slider {...settings}>
                    {imgs.map(m =>
                        <div className={styles.slide_list} key={m}>
                            <iframe src={`${process.env.PUBLIC_URL}` + m + '?autoplay=1&mute=1'}
                                    key={m} allowFullScreen className={styles.iframe100}/>
                        </div>
                    )}
            </Slider>
            <div className={styles.social}>
                <p>작품보기<br/>
                    <motion.button whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }} >
                        <Link to='/select' style={{color : 'white', textDecoration: 'none'}}>GO</Link>
                    </motion.button>
                </p>
                <p className={styles.line}>낙서장<br/>
                    <motion.button whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }} >
                        <Link to='/board' style={{color : 'white', textDecoration: 'none'}}>GO</Link>
                    </motion.button>
                </p>
                <p className={styles.QR}>
                    {/*<motion.div onClick={() => setSelectedId(item.id)}>*/}
                    {/*    <motion.h2>{item.title}</motion.h2>*/}
                    {/*</motion.div>*/}
                    <AnimatePresence>
                        <motion.img whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.1 }} key="shelter_num" src={`${process.env.PUBLIC_URL}` + '/ftp/ShelterQR/Content/Shelter_'+ shelter_num + '/contentQR.jpg'}/>
                    </AnimatePresence>
                </p>
            </div>
        </div>
    );
}

