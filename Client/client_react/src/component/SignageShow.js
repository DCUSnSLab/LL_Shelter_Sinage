import axios from "axios"
import React, {useEffect, useState, useRef} from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {Link} from "react-router-dom";
import styles from "../style/SignageShow.module.css";
import Slider from "react-slick";
import ModalBasic from "./Modal";
import ReactModal from 'react-modal';
import moment from "moment/moment";

function SignageShow({id,title,des}) {
    // Backend로부터 받은 데이터 저장을 위한 useState
    const [images, setImages] = useState(null);
    const [likecontents, setlikeContent] = useState(null);
    const [latestcontents, setlatestContent] = useState(null);

    // 선택한 콘텐츠 데이터 저장을 위한 useState
    const [contentsdesc, setDesc] = useState(null);

    const host_ip = `${process.env.REACT_APP_IP}`;
    const port = "8000";
    const backend_url = "http://" + host_ip + ":" + port;

    // for websocket
    const addr = "ws://"+ host_ip + ":5000";
    const [outputs, setOutputs] = useState([]);
    const [socketConnected, setSocketConnected] = useState(false);
    let ws = useRef(null);

    useEffect(() => {
        if(!ws.current) {
            ws.current = new WebSocket(addr);
            ws.current.onopen = () => {
                console.log("connected to " + addr);
                setOutputs("connected to " + addr);
                setSocketConnected(true);
                // ws.current.send(
                //     JSON.stringify({
                //         message: 0
                //     })
                // )
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
                console.log(evt.data)
            };
        }
    }, []);

    useEffect(() => {
        const GetContentbylikes = () => {
            axios
                .get(backend_url + "/Service/Content/?sort_by=likes")
                .then(res => {
                    // DB에 저장된 콘텐츠 파일의 경로가 잘못되어 있어서 수정하는 작업입니다.
                    res.data.map((data, idx) => {
                        // console.log(idx);
                        // console.log(data);
                        if (data.thumbnailPath === null) {
                            data.upload_file = data.upload_file.substring(6, data.upload_file.length)
                            data.upload_file = "ftp" + data.upload_file
                        }
                        else {
                            data.thumbnailPath = "ftp/" + data.thumbnailPath
                        }
                    })
                    // console.log("Content");
                    // console.log(res.data);
                    setlikeContent(res.data);
                })
                .catch((err) => console.log(err));
        }

        const GetContentbylatest = () => {
            axios
                .get(backend_url + "/Service/Content/?sort_by=createDate")
                .then(res => {
                    // DB에 저장된 콘텐츠 파일의 경로가 잘못되어 있어서 수정하는 작업입니다.
                    res.data.map((data, idx) => {
                        // console.log(idx);
                        // console.log(data);
                        if (data.thumbnailPath === null) {
                            data.upload_file = data.upload_file.substring(6, data.upload_file.length)
                            data.upload_file = "ftp" + data.upload_file
                        }
                        else {
                            data.thumbnailPath = "ftp/" + data.thumbnailPath
                        }
                    })
                    console.log("latestContent");
                    console.log(res.data);
                    setlatestContent(res.data);
                })
                .catch((err) => console.log(err));
        }

        GetContentbylikes();
        GetContentbylatest();
        }, []);

    // 콘텐츠 슬라이드 별 설정을 위한 Dict

    const settings_popular = {
        // className: "styles.popular_slider",
        // centerMode: true,
        dots: false,
        infinite: true,
        speed: 500,
        rows: 2,
        slidesToShow: 5,
        slidesToScroll: 1,
        // centerPadding: "100px",
    };

    const settings_latest = {
        // className: "styles.latest_slider",
        // centerMode: true,
        dots: false,
        infinite: true,
        speed: 500,
        rows: 2,
        slidesToShow: 5,
        slidesToScroll: 1,
        // centerPadding: "100px",
    };

    const likeup = (content) => {
        console.log(content);
        axios
            .get(backend_url + "/Service/ContentLike/" + content.id)
            .then(res => {
                // DB에 저장된 콘텐츠 파일의 경로가 잘못되어 있어서 수정하는 작업입니다.
                // console.log(res.data);
                content.likes = content.likes + 1;
            })
            .catch((err) => console.log(err));
    }

    const [modalOpen, setModalOpen] = useState(false);

    const descriptionModal = (image) => {
        // console.log("descriptionModal");
        console.log(image);
        ws.current.send(
            JSON.stringify({
                message: "2"+image.id
            })
        )
        // 조회수 확인을 위해 동일 컨텐츠 클릭 유무를 확인합니다.
        // contentsdesc가 null 또는 기존 content와 새 content의 id가 같은 경우 조회수를 올리지 않는다
        if (contentsdesc != null && contentsdesc.id == image.id) {
            // console.log("same content");
        }
        // 다른 경우 contentsdesc를 갱신하고 조회수를 1 올린다.
        else {
            setDesc(image);

            // console.log(content);
            axios
                .get(backend_url + "/Service/ContentHits/" + image.id)
                .then(res => {
                    // DB에 저장된 콘텐츠 파일의 경로가 잘못되어 있어서 수정하는 작업입니다.
                    // console.log(res.data);
                    console.log("test");
                    console.log(contentsdesc);
                    contentsdesc.contentFK.hits = contentsdesc.contentFK.hits + 1;
                })
                .catch((err) => console.log(err));
        }

        console.log("test 2");
        console.log(contentsdesc);

        setModalOpen(true);
    };

    const modalcss = {}

    return (
        <div>
            <div className={styles.signageshow_container}>
                {/* Model with react-modal package, */}
                {/*{modalOpen && <ReactModal*/}
                {/*    isOpen={modalOpen}*/}
                {/*    currentContent={contentsdesc}*/}
                {/*    likeupfunc={likeup}*/}
                {/*    ariaHideApp={false}*/}
                {/*    shouldCloseOnOverlayClick={true}*/}
                {/*>*/}
                {/*    <button onClick={() => closeModal}>Test</button>*/}
                {/*</ReactModal>*/}
                {/*}*/}
                {modalOpen && <ModalBasic
                    setModalOpen={setModalOpen}
                    currentContent={contentsdesc}
                    likeupfunc={likeup}
                    contentType={contentsdesc.type}
                >
                </ModalBasic>
                }
                <div className={styles.signageshow_title}>
                    Contents Gallery
                </div>
                <div className={styles.signageshow_popular}>
                    <p>인기순</p>
                    <Slider className={styles.popular_slider} {...settings_popular}>
                        {/*
                        아래 조건식은 컨텐츠의 thumbnailPath가 null인 경우 이미지로 인지하고
                        null이 아닌 경우 출력할 이미지 소스 경로를 영상 파일의 썸네일로 지정한다.
                        */}
                        {likecontents && likecontents.map((image, index) =>
                            image.thumbnailPath === null && (
                                <img src={image.upload_file} onClick={() => descriptionModal(image)}></img>
                            ) ||
                            image.thumbnailPath != null && (
                                <img src={image.thumbnailPath} onClick={() => descriptionModal(image)}></img>
                            )
                        )}
                    </Slider>
                </div>
                <div className={styles.signageshow_latest}>
                    <p>최신순</p>
                    <Slider className={styles.latest_slider} {...settings_latest}>
                        {latestcontents && latestcontents.map((image, index) =>
                            image.thumbnailPath === null && (
                                <img src={image.upload_file} onClick={() => descriptionModal(image)}></img>
                            ) ||
                            image.thumbnailPath != null && (
                                <img src={image.thumbnailPath} onClick={() => descriptionModal(image)}></img>
                            )
                        )}
                    </Slider>
                </div>
                {/*<div className={styles.desctitle}>*/}
                {/*    설명*/}
                {/*</div>*/}
                {/*<div className={styles.signageshow_desc}>*/}
                {/*    <span>타입</span><span>{ contentsdesc && contentsdesc.contentFK.contentType }</span>*/}
                {/*    <br/>*/}
                {/*    <span>생성일</span><span>{ contentsdesc && contentsdesc.contentFK.createDate }</span>*/}
                {/*    <br/>*/}
                {/*    <span>사용자 메일</span><span>{ contentsdesc && contentsdesc.contentFK.email }</span>*/}
                {/*    <br/>*/}
                {/*    <span>조회수</span><span>{ contentsdesc && contentsdesc.contentFK.hits }</span>*/}
                {/*    <br/>*/}
                {/*    <span>추천(좋아요)</span><span>{ contentsdesc && contentsdesc.contentFK.likes }</span>*/}
                {/*    <br/>*/}
                {/*    <span>타이틀</span><span>{ contentsdesc && contentsdesc.contentFK.title }</span>*/}
                {/*    <br/>*/}
                {/*    <button onClick={() => likeup(contentsdesc.contentFK)}>*/}
                {/*        좋아요*/}
                {/*    </button>*/}
                {/*</div>*/}
            </div>
            <div className={styles.social}>
                <Link to={'/'} style={{color : 'white', textDecoration: 'none'}} onClick={() => ws.close()}>
                <div>
                    <div style={{marginTop: '40%'}}>
                        <p>이전으로</p>
                    </div>
                </div>
                </Link>
                <div className={styles.vertical}></div>
                <div>
                    <div style={{marginTop: '40%'}}>
                        <p></p>
                    </div>
                </div>
                <div className={styles.vertical}></div>
                <Link to={'/'} style={{color : 'white', textDecoration: 'none'}}>
                <div>
                    <div style={{marginTop: '40%'}}>
                        <p>낙서장</p>
                    </div>
                </div>
                </Link>
            </div>
        </div>
    )
}

export default SignageShow;
