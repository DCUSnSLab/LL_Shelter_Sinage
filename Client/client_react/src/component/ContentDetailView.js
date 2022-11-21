import axios from "axios"
import '../style/main.css';
import '../style/noscript.css';
import '../style/main.css';

import Slider from "react-slick";
import React, {useEffect, useRef, useState} from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


function ContentDetailView() {

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

        <html>
        <head>
            <title>Phantom by HTML5 UP</title>
            <meta charSet="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no"/>
            <link rel="stylesheet" href="assets/css/main.css"/>
            <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/>
            <noscript>
                <link rel="stylesheet" href="assets/css/noscript.css"/>
            </noscript>
        </head>
        <body className="is-preload">

        <div id="wrapper">

            <div className="w3-top">
                <div className="w3-bar w3-black w3-card">
                    <a href="{% url 'Idle' %}" className="w3-bar-item w3-button w3-padding-large">MAIN</a>
                    <a href="{% url 'signage' %}"
                       className="w3-bar-item w3-button w3-padding-large w3-hide-small">GALLERY</a>
                </div>
            </div>
            <header id="header">
                <div className="inner">


                    <a href="index.html" className="logo">
                        <span className="symbol"><img src="images/logo.svg" alt=""/></span><span
                        className="title">하단부터 이미지 그리드로 들어감(for문으로 돌릴거구..)</span>
                    </a>
                </div>
            </header>

            <div id="main">
                <div className="inner">
                    <header>
                        <h1>이제 이미지르ㅡㄹ 어떻게 불러와야할까...<br/>
                          <a>ㅠㅠ괴롭다</a>.</h1>
                        <p>.</p>
                    </header>
                    <section className="tiles">
                        <article className="style1">
									<span className="image">
										<img src="Client/client_react/public/img/pic01.jpg" alt=""/>
									</span>
                            <a href="generic.html">
                                <h2>작품명</h2>
                                <div className="content">
                                    <p>작품설명</p>
                                </div>
                            </a>
                        </article>
                        <article className="style2">
									<span className="image">
										<img src="Client/client_react/public/img/pic01.jpg" alt=""/>
									</span>
                            <a href="generic.html">
                                <h2>작품명</h2>
                                <div className="content">
                                    <p>작품설명</p>
                                </div>
                            </a>
                        </article>
                        <article className="style3">
									<span className="image">
										<img src="images/pic03.jpg" alt=""/>
									</span>
                            <a href="generic.html">
                                <h2>작품명</h2>
                                <div className="content">
                                    <p>작품설명</p>
                                </div>
                            </a>
                        </article>
                        <article className="style4">
									<span className="image">
										<img src="images/pic04.jpg" alt=""/>
									</span>
                            <a href="generic.html">
                                <h2>작품명</h2>
                                <div className="content">
                                    <p>작품설명</p>
                                </div>
                            </a>
                        </article>
                        <article className="style5">
									<span className="image">
										<img src="images/pic05.jpg" alt=""/>
									</span>
                            <a href="generic.html">
                                <h2>작품명</h2>
                                <div className="content">
                                    <p>작품설명</p>
                                </div>
                            </a>
                        </article>
                        <article className="style6">
									<span className="image">
										<img src="images/pic06.jpg" alt=""/>
									</span>
                            <a href="generic.html">
                                <h2>작품명</h2>
                                <div className="content">
                                    <p>작품설명</p>
                                </div>
                            </a>
                        </article>
                        <article className="style2">
									<span className="image">
										<img src="images/pic07.jpg" alt=""/>
									</span>
                            <a href="generic.html">
                                <h2>작품명</h2>
                                <div className="content">
                                    <p>작품설명</p>
                                </div>
                            </a>
                        </article>
                        <article className="style3">
									<span className="image">
										<img src="images/pic08.jpg" alt=""/>
									</span>
                            <a href="generic.html">
                                <h2>작품명</h2>
                                <div className="content">
                                    <p>작품설명</p>
                                </div>
                            </a>
                        </article>
                        <article className="style1">
									<span className="image">
										<img src="images/pic09.jpg" alt=""/>
									</span>
                            <a href="generic.html">
                                <h2>작품명</h2>
                                <div className="content">
                                    <p>작품설명</p>
                                </div>
                            </a>
                        </article>
                        <article className="style5">
									<span className="image">
										<img src="images/pic10.jpg" alt=""/>
									</span>
                            <a href="generic.html">
                                <h2>작품명</h2>
                                <div className="content">
                                    <p>작품설명</p>
                                </div>
                            </a>
                        </article>
                        <article className="style6">
									<span className="image">
										<img src="images/pic11.jpg" alt=""/>
									</span>
                            <a href="generic.html">
                                <h2>작품명</h2>
                                <div className="content">
                                    <p>작품설명</p>
                                </div>
                            </a>
                        </article>
                        <article className="style4">
									<span className="image">
										<img src="images/pic12.jpg" alt=""/>
									</span>
                            <a href="generic.html">
                                <h2>작품명</h2>
                                <div className="content">
                                    <p>작품설명</p>
                                </div>
                            </a>
                        </article>
                    </section>
                </div>
            </div>

            <header id="header">
                <div className="inner">


                    <a href="index.html" className="logo">
                        <span className="symbol"><img src="images/logo.svg" alt=""/></span><span
                        className="title">하단부터 동영상 그리드로 들어감(for문으로 돌릴거구..)</span>
                    </a>
                    <header>
                        <h1>이제 이걸... 어떻게 불러와야할까...<br/>
                            <a>하하하핳하핳</a>.</h1>
                        <p>.</p>
                    </header>
                    <section className="tiles">
                        <article className="style1">
									<span className="image">
										<img src="Client/client_react/public/img/pic01.jpg" alt=""/>
									</span>
                            <a href="generic.html">
                                <h2>작품명</h2>
                                <div className="content">
                                    <p>작품설명</p>
                                </div>
                            </a>
                        </article>
                        <article className="style2">
									<span className="image">
										<img src="Client/client_react/public/img/pic01.jpg" alt=""/>
									</span>
                            <a href="generic.html">
                                <h2>작품명</h2>
                                <div className="content">
                                    <p>작품설명</p>
                                </div>
                            </a>
                        </article>
                        <article className="style3">
									<span className="image">
										<img src="images/pic03.jpg" alt=""/>
									</span>
                            <a href="generic.html">
                                <h2>작품명</h2>
                                <div className="content">
                                    <p>작품설명</p>
                                </div>
                            </a>
                        </article>
                        <article className="style4">
									<span className="image">
										<img src="images/pic04.jpg" alt=""/>
									</span>
                            <a href="generic.html">
                                <h2>작품명</h2>
                                <div className="content">
                                    <p>작품설명</p>
                                </div>
                            </a>
                        </article>
                        <article className="style5">
									<span className="image">
										<img src="images/pic05.jpg" alt=""/>
									</span>
                            <a href="generic.html">
                                <h2>작품명</h2>
                                <div className="content">
                                    <p>작품설명</p>
                                </div>
                            </a>
                        </article>
                        <article className="style6">
									<span className="image">
										<img src="images/pic06.jpg" alt=""/>
									</span>
                            <a href="generic.html">
                                <h2>작품명</h2>
                                <div className="content">
                                    <p>작품설명</p>
                                </div>
                            </a>
                        </article>
                        <article className="style2">
									<span className="image">
										<img src="images/pic07.jpg" alt=""/>
									</span>
                            <a href="generic.html">
                                <h2>작품명</h2>
                                <div className="content">
                                    <p>작품설명</p>
                                </div>
                            </a>
                        </article>
                        <article className="style3">
									<span className="image">
										<img src="images/pic08.jpg" alt=""/>
									</span>
                            <a href="generic.html">
                                <h2>작품명</h2>
                                <div className="content">
                                    <p>작품설명</p>
                                </div>
                            </a>
                        </article>
                        <article className="style1">
									<span className="image">
										<img src="images/pic09.jpg" alt=""/>
									</span>
                            <a href="generic.html">
                                <h2>작품명</h2>
                                <div className="content">
                                    <p>작품설명</p>
                                </div>
                            </a>
                        </article>
                        <article className="style5">
									<span className="image">
										<img src="images/pic10.jpg" alt=""/>
									</span>
                            <a href="generic.html">
                                <h2>작품명</h2>
                                <div className="content">
                                    <p>작품설명</p>
                                </div>
                            </a>
                        </article>
                        <article className="style6">
									<span className="image">
										<img src="images/pic11.jpg" alt=""/>
									</span>
                            <a href="generic.html">
                                <h2>작품명</h2>
                                <div className="content">
                                    <p>작품설명</p>
                                </div>
                            </a>
                        </article>
                        <article className="style4">
									<span className="image">
										<img src="images/pic12.jpg" alt=""/>
									</span>
                            <a href="generic.html">
                                <h2>작품명</h2>
                                <div className="content">
                                    <p>작품설명</p>
                                </div>
                            </a>
                        </article>
                    </section>
                </div>

            </header>
        </div>


        <script src="assets/js/jquery.min.js"></script>
        <script src="assets/js/browser.min.js"></script>
        <script src="assets/js/breakpoints.min.js"></script>
        <script src="assets/js/util.js"></script>
        <script src="assets/js/main.js"></script>

        </body>
        </html>
    )
}
export default ContentDetailView;
