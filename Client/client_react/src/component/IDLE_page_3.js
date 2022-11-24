import Slider from "react-slick";
import React, {useRef, useState, useEffect} from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../style/IDLE_page_3.css';
import Header from "./header";
import BOARD_page from "./BOARD_page";
import SELECT_page from "./SELECT_page";
import {Link, Route, Routes} from "react-router-dom";

function IDLE_page_3() {
    const addr = "ws://localhost:5000";
    const [outputs, setOutputs] = useState([]);
    const [img, setImg] = useState([0, 1, 2]);
    const [socketConnected, setSocketConnected] = useState(false);

    let ws = useRef(null);

    const connectServer = () => {
        if(!ws.current){
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
                console.log(data);
                setImg[0] = data[0];
                setImg[1] = data[1];
                setImg[2] = data[2];

                setOutputs((prevItems) => data);
            };
        };
    };
    useEffect(() => {
        connectServer();
    });
    const settings = {
        slide: 'div',
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrow: false
    };
    return (
        <div>
            <Header/>
            <Slider {...settings}>
                <div>
                    <img src={setImg[0]}/>
                    {/*<iframe src={setImg[0]} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen/>*/}
                    <div className="button_div">
                        {/*<button id="skipButton">Skip</button>*/}
                        {/*<div></div>*/}
                        {/*<button id="qrButton">상세보기</button>*/}
                    </div>
                </div>
                <div>
                    <img src={setImg[1]}/>
                    {/*<iframe src={setImg[1]} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen/>*/}
                </div>
                <div>
                    <img src={setImg[2]}/>
                    {/*<iframe src={setImg[2]} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen/>*/}
                </div>
            </Slider>
            <div className="social">
                <p>작품선택<br/>
                    <button onClick={SELECT_page}>GO</button>
                </p>
                <p className="line">게시판<br/>
                    <button onClick={BOARD_page}>GO</button>
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