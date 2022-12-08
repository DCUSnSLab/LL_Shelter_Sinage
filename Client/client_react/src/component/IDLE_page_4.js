// signage 4 app.js

import '../style/IDLE_page_4.css';
import React, {useEffect, useRef, useState} from "react";
import {Link, Route, Routes} from "react-router-dom";
import board from '../img/board.png';
import good from '../img/good.png';
import hand from '../img/hand.png';
import img from '../img/img.png';
import next from '../img/next.png';
import pencil from '../img/pencil.png';

function IDLE_page_4() {
    const addr = "ws://localhost:5000";
    const [outputs, setOutputs] = useState([]);
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
                setOutputs((prevItems) => data);
            };
        };
    };
    useEffect(() => {
        connectServer();
    });
    return (
        <div className="bo">
            <header>
                <div className="h1">사이니지 이용방법</div>
            </header>
            <wrap>
            <div className="h2">쉘터 사이니지를 100% 활용할 수 있는 방법</div>
            <table className="gallery">
                    <div className="h4">콘텐츠 이용방법</div>
                    <tr className="STEP">
                        <td className="B">STEP1</td>
                        <td></td>
                        <td className="B">STEP2</td>
                        <td></td>
                        <td className="B">STEP3</td>
                    </tr>

                    <tr>
                        <td><img src={hand}/></td>
                        <td><img className="A" src={next}/></td>
                        <td><img src={img}/></td>
                        <td><img className="A" src={next}/></td>
                        <td><img src={good}/></td>
                        
                    </tr>
                    <tr>
                        <td><p>작품 보러가기 클릭!</p></td>
                        <td></td>
                        <td><p>보고싶은 작품 선택</p></td>
                        <td></td>
                        <td><p>작품 감상!</p></td>
                    </tr>

                    <div id="sp"></div>

                    <div className="h4">커뮤니티 이용방법</div>
                
                    <tr className="STEP">
                        <td className="B">STEP1</td>
                        <td></td>
                        <td className="B">STEP2</td>
                        <td></td>
                        <td className="B">STEP3</td>
                    </tr>
                    <tr>
                        <td><img src={hand}/></td>
                        <td><img className="A" src={next}/></td>
                        <td><img src={board}/></td>
                        <td><img className="A" src={next}/></td>
                        <td><img src={pencil}/></td>
                    </tr>

                    <tr>
                    <td><p>커뮤니티 클릭!!</p></td>
                    <td></td>
                    <td><p>주제별<br/>게시판 선택</p></td>
                    <td></td>
                    <td><p>글 작성하기</p></td>
                    </tr>
            </table>
            </wrap>
            <footer>
            <Link to='/select' style={{color : 'white', textDecoration: 'none'}}><button className="btn_a">작품 보러가기</button></Link>
                <Link to='/board' style={{color : 'white', textDecoration: 'none'}}><button className="btn_b">커뮤니티</button></Link>
            </footer>
        </div>
    );
}

export default IDLE_page_4;
