import Slider from "react-slick";
import React, {useRef, useState, useEffect} from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../style/IDLE_page_3.css';
import Header from "./header";
import {Link, Route, Routes} from "react-router-dom";

function IDLE_page_3() {
    const addr = "ws://localhost:5000";
    const [outputs, setOutputs] = useState([]);
    const [img, setImg] = useState([]);
    const [socketConnected, setSocketConnected] = useState(false);

    let ws = useRef(null);

    const connectServer= () => {
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
                //데이터의 길이
                const numbers = data.length;
                for (let i = 0; i < numbers; i++){
                    setImg[i] = data[i];
                    console.log(setImg[i]);
                }
                setOutputs((prevItems) => data);
            };
        };
    };
    useEffect(() => {
        connectServer();
    });
    const settings = {
        slide: 'img',
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrow: false
    };

    const sliders = img.map((data)=>{
        return(
            <div src={data} style={{height:'100px', width:'100px'}}></div>
        );
    })

    return (
        <div>
            <Header/>
            <Link to='/page4'>4</Link>
            <Slider {...settings}>
                {img.map((data)=>{
                return(
                <div>
                    <img  src={data} style={{height:'100px', width:'100px'}}/>
                </div>
                )})}
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