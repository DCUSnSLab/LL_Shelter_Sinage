// signage 4 app.js

import '../style/IDLE_page_4.css';
import {useEffect, useRef, useState} from "react";
import BOARD_page from "./BOARD_page";
import SELECT_page from "./SELECT_page";

function IDLE_page_4() {
    const addr = "ws://localhost:5000";
    const [outputs, setOutputs] = useState([]);
    const [img, setImg] = useState([0, 1, 2, 3, 4, 5]);
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
        <div>
            <header>
                <div className="h1">사이니지 이용방법</div>
            </header>
            <section className="gallery">
                <div className="h2">쉘터 사이니지를 100% 활용할 수 있는 방법</div>
                <div>
                    <div className="h4">콘텐츠 이용방법</div>
                    <div className="STEP"><td>STEP1</td><td>STEP2</td><td>STEP3</td></div>

                    <img src={setImg[0]}/>
                    <img className="A" src={setImg[5]}/>
                    <img src={setImg[1]}/>
                    <img className="A" src={setImg[5]}/>
                    <img src={setImg[2]}/>
                    <div><p>작품 보러가기 클릭!</p> <p>보고싶은 작품 선택</p> <p>작품 감상!</p></div>

                    <tr className="h4"><td colSpan='3'>커뮤니티 이용방법</td></tr>

                    <tr className="STEP"><td>STEP1</td><td>STEP2</td><td>STEP3</td></tr>

                    <img src={setImg[0]}/>
                    <img className="A" src={setImg[5]}/>
                    <img src={setImg[3]}/>
                    <img className="A" src={setImg[5]}/>
                    <img src={setImg[4]}/>

                    <div><p>커뮤니티 클릭!</p> <p>주제별<br/>게시판 선택</p> <p>글 작성하기</p></div>

                </div>
            </section>
            <footer>
                <button onClick={SELECT_page} className="btn_a">작품 보러가기</button>
                <button onClick={BOARD_page} className="btn_b">커뮤니티</button>
            </footer>
        </div>
    );
}

export default IDLE_page_4;
