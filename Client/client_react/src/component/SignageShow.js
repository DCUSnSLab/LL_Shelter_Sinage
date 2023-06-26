import axios from "axios"
import React, {useEffect, useState, useRef} from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {Link} from "react-router-dom";
import styles from "../style/SignageShow.module.css";
import Slider from "react-slick";
import moment from "moment/moment";

function SignageShow({id,title,des}) {
    // Backend로부터 받은 데이터 저장을 위한 useState
    const [images, setImages] = useState(null);
    const [contents, setContent] = useState(null);
    // 선택한 콘텐츠 데이터 저장을 위한 useState
    const [contentsdesc, setDesc] = useState(null);

    const host_ip = `${process.env.REACT_APP_IP}`;
    const port = "8000";
    const backend_url = "http://" + host_ip + ":" + port;
    
    useEffect(() => {
        const imagelist = () => {
            axios
                .get(backend_url + "/Service/signage/")
                .then(res => {
                    // DB에 저장된 콘텐츠 파일의 경로가 잘못되어 있어서 수정하는 작업입니다.
                    res.data.map((data) => {
                            if (data.thumbnailPath === null) {
                                data.upload_file = data.upload_file.substring(6, data.upload_file.length)
                                data.upload_file = "ftp" + data.upload_file
                            }
                            else {
                                data.thumbnailPath = "ftp/" + data.thumbnailPath
                            }
                        }
                    )
                    setImages(res.data)
                    console.log(res.data)
                })
                .catch((err) => console.log(err));
        }
        imagelist();
        }, []);

    useEffect(() => {
        const Content_detail_list = () => {
            axios
                .get(backend_url + "/Service/Content/")
                .then(res => {
                    setContent(res.data)
                    console.log(res.data)
                })
                .catch((err) => console.log(err));
        }
        Content_detail_list();
        }, []);

    // 콘텐츠 슬라이드 별 설정을 위한 Dict

    const settings_popular = {
        // className: "styles.popular_slider",
        centerMode: true,
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        // centerPadding: "100px",
    };

    const settings_latest = {
        // className: "styles.latest_slider",
        centerMode: true,
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        // centerPadding: "100px",
    };

    const descriptionModal = (index) => {
        console.log("descriptionModal");
        setDesc(contents[index]);
    };

    return (
        <div>
            <div className={styles.signageshow_container}>
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
                        {images && images.map((image, index) =>
                            image.thumbnailPath === null && (
                                <img src={image.upload_file} onClick={() => descriptionModal(index)}></img>
                            ) ||
                            image.thumbnailPath != null && (
                                <img src={image.thumbnailPath} onClick={() => descriptionModal(index)}></img>
                            )
                        )}
                    </Slider>
                </div>
                <div className={styles.signageshow_latest}>
                    <p>최신순</p>
                    <Slider className={styles.latest_slider} {...settings_latest}>
                        {images && images.map((image, index) =>
                            image.thumbnailPath === null && (
                                <img src={image.upload_file} onClick={() => descriptionModal(index)}></img>
                            ) ||
                            image.thumbnailPath != null && (
                                <img src={image.thumbnailPath} onClick={() => descriptionModal(index)}></img>
                            )
                        )}
                    </Slider>
                </div>
                <div className={styles.desctitle}>
                    설명
                </div>
                <div className={styles.signageshow_desc}>
                    <div>타입</div><div>{ contentsdesc && contentsdesc.contentType }</div>
                    <div>생성일</div><div>{ contentsdesc && contentsdesc.createDate }</div>
                    <div>사용자 메일</div><div>{ contentsdesc && contentsdesc.email }</div>
                    <div>조회수</div><div>{ contentsdesc && contentsdesc.hits }</div>
                    <div>추천(좋아요)</div><div>{ contentsdesc && contentsdesc.likes }</div>
                    <div>타이틀</div><div>{ contentsdesc && contentsdesc.title }</div>
                </div>
            </div>
            <div className={styles.social}>
                <tr>
                    <p className={styles.line}>뒤로가기<br/>
                        <button>
                            <Link to='/' style={{color : 'white', textDecoration: 'none'}}>GO</Link>
                        </button>
                    </p>
                </tr>
                <tr>
                    <p className={styles.line}><br/>
                    </p>
                </tr>
                <tr>
                    <p className={styles.line}>게시판<br/>
                        <button>
                            <Link to='/board' style={{color : 'white', textDecoration: 'none'}}>GO</Link>
                        </button>
                    </p>
                </tr>
            </div>
        </div>
    )
}

export default SignageShow;
