//import axios from "axios"
import '../style/SignageShow.module.css';
import React, {useEffect, useState, useRef} from "react";
//import {Link, Route, Routes} from "react-router-dom";
//import ContentDetailView from "./ContentDetailView";
//import styled from "styled-components";
import Modal from './Modal';
import StoreImgList from "./StoreImgList";
import Gallery from "./Carousel";
import * as url from "url";
import styles from "../style/IDLE.module.css";
import {Link} from "react-router-dom";

function Title(){
  return<header>
    <h1>Contents Gallery</h1>
  </header>
}

function SignageShow() {
    return (
        <div>
        <head>
            <meta charSet="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no"/>
        </head>
        <header>
            <Title></Title>
        </header>
        <div className='body'>
        <div>
            <h3>인기순</h3>
            <Gallery>
            </Gallery>
        </div>
        <div id="wrap" style={{height : '100000px'}}>

            <div class="section">
                <div className="nav_blank"></div>
                <h3>최신순</h3>
                <StoreImgList>
                </StoreImgList>
            </div>
        </div>
            <div className={styles.social}>
                <p>뒤로가기<br/>
                    <button><Link to='/' style={{color : 'white', textDecoration: 'none'}}>GO</Link></button>
                </p>
                <p className={styles.line}><br/>
                    {/*<button><Link to='/select' style={{color : 'white', textDecoration: 'none'}}>GO</Link></button>*/}
                </p>
                <p className={styles.line}>게시판<br/>
                    <button><Link to='/board' style={{color : 'white', textDecoration: 'none'}}>GO</Link></button>
                </p>
            </div>
        <script type="text/javascript"></script>
        </div>
        </div>
    )
}

const btn= {
    height: '100px',
    width: '100px',
    backgroundColor: 'blue',
    color: 'white',
    padding: '10px 20px',
    fontSize: '16px',
    borderRadius: '4px'
}

// const top = {
//     marginTop: '60px',
// }

// const container_media = {
//     dots: false,
//         infinite: true,
//         speed: 500,
//         slidesToShow: 3,
//         slidesToScroll: 1,
// };

// const container_media1 = {
//     columnGap: '10px',
//     rowGap : '30px',
//     justifyContent: 'center',
//     marginRight: '20px'
// }
//
// const img = {
//     filter: 'brightness(1)'
// }


export default SignageShow;