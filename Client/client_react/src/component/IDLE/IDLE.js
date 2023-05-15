import React, {useEffect, useRef, useState} from "react";
import {Link, Route, Routes, useNavigate} from "react-router-dom";
import IDLE_page_3 from "./IDLE/IDLE_page_3";
import IDLE_page_4 from "./IDLE/IDLE_page_4";
import IDLE_page_5 from "./IDLE/IDLE_page_5";

function IDLE(){
    const addr = "ws://localhost:5000";
    const [outputs, setOutputs] = useState([]);
    const [img, setImg] = useState([0, 1, 2, 3, 4, 5]);
    const [socketConnected, setSocketConnected] = useState(false);
    const static_imgs = [];
    //websockets 생성
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
                setImg[3] = data[3];
                setImg[4] = data[4];
                setImg[5] = data[5];
                setOutputs((prevItems) => data);
            };
        };
    };
    useEffect(() => {
        connectServer();
    });


    // 카운터 00:00 정보 받아온 뒤 IDLE 페이지 이동
    const navigate = useNavigate();
    const Page = ['/'];
    const [num, setNum] = useState(0);

    let getRandom = (min, max) => Math.floor(Math.random() * (max - min) + min);
    console.log("change page " + getRandom(1, 3));

    return(
        <>
            <div to='/page3'/>
        </>
    );
}

export default IDLE