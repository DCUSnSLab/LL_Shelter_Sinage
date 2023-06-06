import axios from "axios"
import styles from "../style/DrawingGuestBook.module.css";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Painterro from 'painterro'

function DrawingGuestBook(){
    const [media, setMedia] = useState(null);
    const [comment, setComment] = useState(null);
    const host_ip = `${process.env.REACT_APP_IP}`;
    const backend_url = "http://" + host_ip + ":8000";

    const painter_config = ['select', 'crop', 'pixelize', 'line', 'arrow', 'rect', 'ellipse', 'text', 'rotate', 'resize', 'setting', 'zoomin', 'zoomout', 'bucket', 'load', 'open'];
    const black = '#000000'

    useEffect(() => {
        const Community_media_list = () => {
            axios
                .get(backend_url + "/Service/communityMedia/")
                .then(res => {
                    setMedia(res.data)
                    console.log(res.data)
                })
                .catch((err) => console.log(err));
        }
        Community_media_list();
    }, []);

    useEffect(() => {
        const Community_comments_list = () => {
            axios
                .get(backend_url + "/Service/CommunityComment/")
                .then(res => {
                    setComment(res.data)
                    console.log(res.data)
                })
                .catch((err) => console.log(err));
        }
        Community_comments_list();
    }, []);

    return(
        <div className={styles.DrawingGuestBook}>
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
            <div className="w3-top">
                <div className="w3-bar w3-black w3-card">
                    <Link to='/select' className="w3-bar-item w3-button w3-padding-large" style={{color : 'white', textDecoration: 'none'}}>GALLERY</Link>
                    <Link to='/board' className="w3-bar-item w3-button w3-padding-large" style={{color : 'white', textDecoration: 'none'}}>COMMUNITY</Link>
                </div>
            </div>
            {/* <div className="nav_blank" style={{marginRight : "80px"}}></div> */}
            <div className="container_media1" style={container_DrawingGuestBook}>
                <div className="painterro">
                    <div>
                        {
                            Painterro({
                                activeColor : black,
                                hiddenTools : painter_config
                            }).show()
                        }
                    </div>
                </div>
                {media && media.map((list, i) => (
                    <p key={i}>
                        <p style={{height:"20px"}}></p>
                        <span className="media_content_box" style={{position: 'relative'}}>
                <img style={DrawingGuestBook_preview} src={backend_url + list.image}/>
                            {/* <p style={{height:"20px"}}></p> */}
                            <div>{ comment && comment[i].text}</div>
                    <h3>{ comment && comment[i].email}</h3>
                    <h4>{ comment && comment[i].createDate}</h4>
                    <h4>{ comment && comment[i].lastEditDate}</h4>
            </span>
                    </p>
                ))}
            </div>
            </body>
            </html>
        </div>
    );
}
const container_DrawingGuestBook = {
    display: 'grid',
    gridTemplateColumns: '340px 340px 340px',
    gridTemplateRows: '400px 400px 400px',
    columnGap: '10px',
    rowGap: '30px',
    justifyContent: 'center',
    height: '2000px',
}
const DrawingGuestBook_preview = {
    overflow: 'hidden',
    objectFit: 'cover',
    width: '330px',
    height: '200px',
    borderRadius: '10px'
}
export default DrawingGuestBook;
