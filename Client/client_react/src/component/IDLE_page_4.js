// signage 4 app.js
import '../../style/IDLE_page_4.css';
import React, {useEffect, useRef, useState} from "react";
import {Link, Route, Routes} from "react-router-dom";

function IDLE_page_4() {
    const [img, setImg] = useState([0, 1, 2, 3, 4, 5]);
    const host_ip = `${process.env.REACT_APP_IP}`;
    const addr = "ws://" + host_ip + ":5000";
    const [outputs, setOutputs] = useState([]);
    let ws = useRef(null);
    const [socketConnected, setSocketConnected] = useState(false);
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

    return (
        <div className="bo">
            <header>
                <div className="h1-y">사이니지</div>
                <div className="h1">&nbsp;이용방법</div>
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
                        <td><img className="si_img" src={`${process.env.PUBLIC_URL}`+'/page4/img_0.png'}/></td>
                        <td><img className="A" src={`${process.env.PUBLIC_URL}`+'/page4/img_5.png'}/></td>
                        <td><img className="si_img_2" src={`${process.env.PUBLIC_URL}`+'/page4/img_1.png'}/></td>
                        <td><img className="A" src={`${process.env.PUBLIC_URL}`+'/page4/img_5.png'}/></td>
                        <td><img className="si_img" src={`${process.env.PUBLIC_URL}`+'/page4/img_2.png'}/></td>
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
                        <td><img className="si_img" src={`${process.env.PUBLIC_URL}`+'/page4/img_0.png'}/></td>
                        <td><img className="A" src={`${process.env.PUBLIC_URL}`+'/page4/img_5.png'}/></td>
                        <td><img className="si_img_3" src={`${process.env.PUBLIC_URL}`+'/page4/img_3.png'}/></td>
                        <td><img className="A" src={`${process.env.PUBLIC_URL}`+'/page4/img_5.png'}/></td>
                        <td><img className="si_img" src={`${process.env.PUBLIC_URL}`+'/page4/img_4.png'}/></td>
                    </tr>

                    {/*
                    Image insert sample (not from websocket or db)
                    process.env.PUBLIC_URL meaning /public directory in npm home directory
                    <img src={`${process.env.PUBLIC_URL}`} className="image-thumbnail"/>
                    */}

                    <tr>
                        <td><p>커뮤니티 클릭!!</p></td>
                        <td></td>
                        <td><p>주제별 게시판 선택</p></td>
                        <td></td>
                        <td><p>게시글 작성하기</p></td>
                    </tr>

                </table>
            </wrap>
            <footer>
            <button className="btn_a"><Link to='/select' style={{color : 'white', textDecoration: 'none'}}>작품 보러가기</Link></button>
                <button className="btn_b"><Link to='/board' style={{color : 'white', textDecoration: 'none'}}>커뮤니티</Link></button>
            </footer>
        </div>
    );
}

export default IDLE_page_4;
