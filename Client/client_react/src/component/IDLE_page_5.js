// Signage 5 - App.js
import Slider from "react-slick";
import React, {useEffect, useRef, useState} from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../style/IDLE_page_5.css";
import {Link} from "react-router-dom";

function IDLE_page_5() {
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
                console.log(data);
                data.map((data) => {
                    addMessage(data);
                    console.log(data);
                })
            };
        };
    })

    const SampleNextArrow = (props) => {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: "block"}}
                onClick={onClick}
            />
        );
    };

    const SamplePrevArrow = (props) => {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: "block"}}
                onClick={onClick}
            />
        );
    };

    const settings = {
        slide: 'img',
        arrows: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
    };

    return (
        <div>
            <Slider {...settings}>
                {imgs.map(m =>
                <div className="image-box">
                    <img src={m} className="image-thumbnail"/>
                </div>)}
            </Slider>
            <div className="buttonDiv">
                <Link to='/select' style={{color : 'white', textDecoration: 'none'}}><div className="BTN">작품 선택</div></Link>
                <p></p>
                <Link to='/board' style={{color : 'white', textDecoration: 'none'}}><div className="BTN">게시판</div></Link>
            </div>

        </div>
    );
}

export default IDLE_page_5