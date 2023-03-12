import Slider from "react-slick";
import React, {useRef, useState, useEffect} from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import idle_3 from "../style/IDLE_page_3.module.css";
import idle_4 from "../style/IDLE_page_4.module.css";
import idle_5 from "../style/IDLE_page_5.module.css";
import Header from "./header";
import {Link, Route, Routes} from "react-router-dom";

function IDLE_page_3() {
    const addr = "ws://localhost:5000";
    const [outputs, setOutputs] = useState([]);
    const [imgs, setImg] = useState([]);
    const [socketConnected, setSocketConnected] = useState(false);


    let ws = useRef(null);

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
    })
    const settings = {
        slide: 'img',
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrow: false
    };
    return (
        <div class="IDLE3 test" className={`${idle_3.IDLE_page_3} ${idle_4.IDLE_page_4} ${idle_5.IDLE_page_5}`}>
            <Header/>
            <Slider {...settings}>
                {imgs.map(m =>
                    <div className="image-box">
                        <img src={`${process.env.PUBLIC_URL}` + m} className="image-thumbnail"/>
                    </div>)}
            </Slider>
            <div className="social">
                <p>작품선택<br/>
                    <button><Link to='/select' style={{color : 'white', textDecoration: 'none'}}>GO</Link></button>
                </p>
                <p className="line">게시판<br/>
                    <button><Link to='/board' style={{color : 'white', textDecoration: 'none'}}>GO</Link></button>
                </p>
            </div>
        </div>
    );
}


export default IDLE_page_3
