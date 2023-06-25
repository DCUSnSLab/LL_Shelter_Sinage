import axios from "axios"
import React, {useEffect, useState, useRef} from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {Link} from "react-router-dom";
import styles from "../style/SignageShow.module.css";
import Slider from "react-slick";
import moment from "moment/moment";

function SignageShow({id,title,des}) {
    const [images, setImages] = useState(null);
    const [contents, setContent] = useState(null);
    const initDesc = {
        contentType: null,
        content_statue: null,
        createDate: "",
        email: "",
        hits: null,
        id: -1,
        isUpdate: null,
        lastEditDate: null,
        likes: null,
        shelterFK: null,
        title: "",
    }

    const [contentsdesc, setDesc] = useState(initDesc);

    const host_ip = `${process.env.REACT_APP_IP}`;
    const port = "8000";
    const backend_url = "http://" + host_ip + ":" + port;

    let timer = null;
    const [time, setTime] = useState(moment());

    // 상단 타이머 업데이트 useEffect
    useEffect(() => {
        timer = setInterval(() => {
            setTime(moment());
        }, 1000);
        return () => {
            clearInterval(timer);
        };
    }, []);
    
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
        console.log(index);
        console.log(initDesc);
        console.log(contents[index]);

        // setDesc(contents[index]);

        // setDesc(contentsdesc => ({...contentsdesc,
        //     id: contents[index].id,
        //     createDate: contents[index].createDate,
        //     email: contents[index].email,
        //     hits: contents[index].hits,
        //     likes: contents[index].likes,
        //     title: contents[index].title,
        // }));

        setDesc((contentsdesc) => ({
            ...contentsdesc,
            id: contents[index].id,
        }));
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
                    <div>타입</div><div>{ contentsdesc.id != -1 && contentsdesc.contentType }</div>
                    <div>생성일</div><div>{ contentsdesc.id != -1 && contentsdesc.createDate }</div>
                    <div>사용자 메일</div><div>{ contentsdesc.id != -1 && contentsdesc.email }</div>
                    <div>조회수</div><div>{ contentsdesc.id != -1 && contentsdesc.hits }</div>
                    <div>추천(좋아요)</div><div>{ contentsdesc.id != -1 && contentsdesc.likes }</div>
                    <div>타이틀</div><div>{ contentsdesc.id != -1 && contentsdesc.title }</div>
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
