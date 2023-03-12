import axios from "axios"
// import '../style/main.module.css';
// import '../style/noscript.module.css';
// import '../style/main.82cfd66e.css';
import '../style/sigdesign.module.css';
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import ContentDetailView from "./ContentDetailView";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

function SignageShow({id,title,des}) {
    const [images, setImages] = useState(null);
    const [content, setContent] = useState(null);
    const backend_url = "http://127.0.0.1:8001"

    useEffect(() => {
        const imagelist = () => {
            axios
                .get(backend_url + "/Service/signage/")
                .then(res => {
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

        <body>
        <div id="wrap">
            <header id="headerArea">
            <div className="w3-top">
                <div className="w3-bar w3-black w3-card">
                    <Link to='/community' className="w3-bar-item w3-button w3-padding-large" style={{color : 'white', textDecoration: 'none'}}>COMMUNITY</Link>
                </div>
            </div>
            </header>

            <div class="section" style={{marginTop: '20px'}}>
                <div className="nav_blank"></div>
                <h3 style={{marginLeft: '30px'}}>이미지 콘텐츠</h3>
                <div className="gray-line"></div>
                <div className="container_media" style={{position: 'relative'}}>
                    {images && images.map((list, i) => (
                        <p key={i}>
                            {/*<a href="{% url 'contentDetailView' video.id %}">*/}
                                <span className="media_content_box" style={{position: 'relative'}}>
                                    <img class="media_preview" style={{height: "200px", width: "330px", objectFit : "cover"}} src={backend_url + list.upload_file}/>
                                    <div class="imText2" style={{left : "40px", bottom : "-70px"}}>{ content && content[i].title}</div>
                                    <Link to='/contentDetailView' style={{color : 'white', textDecoration: 'none'}}>
                                    <span className="shadow_box">
                                        <div className="shadow"></div>
                                    </span>
                                    </Link>
                                </span>
                            {/*</a>*/}
                        </p>
                    ))}
                </div>
                <div className="nav_blank2"></div>

                <div className="section" style={{marginTop: '20px'}}>
                    <div className="nav_blank"></div>
                    <h3 style={{marginLeft: '30px'}}>동영상 콘텐츠</h3>
                    <div className="gray-line"></div>
                    <div className="container_media" style={{position: 'relative'}}>
                        {images && images.map((list, i) => (
                            <p key={i}>
                                {/*<a href="{% url 'contentDetailView' video.id %}">*/}
                                <span className="media_content_box" style={{position: 'relative'}}>
                                    <img className="media_preview"
                                         style={{height: "200px", width: "330px", objectFit: "cover"}}
                                         src={backend_url + list.upload_file}/>
                                    <div className="imText2"
                                         style={{left: "40px", bottom: "-70px"}}>{content && content[i].title}</div>
                                    <Link to='/mediaDetailView' style={{color : 'white', textDecoration: 'none'}}>
                                    <span className="shadow_box">
                                        <div className="shadow"></div>
                                    </span>
                                        </Link>
                                </span>
                                {/*</a>*/}
                            </p>
                        ))}
                    </div>
                </div>
                <div className="nav_blank2"></div>
                <div class="gray-line"></div>
                <div class="container_media" style={{position: 'relative'}}>
                    <div></div>
                    {/*<div>*/}
                    {/*    <div style={{textAlign: 'center'}}>*/}
                    {/*        <div><h3 style={{paddingLeft: '40px'}}>QR코드를 찍어 콘텐츠 업로드!</h3></div>*/}
                    {/*        <img src = "/media/{{contentQR}}"/>*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                    <div></div>
                </div>
            </div>
        </div>
        <script type="text/javascript"></script>
        </body>
        </html>
    )
}
export default SignageShow;
