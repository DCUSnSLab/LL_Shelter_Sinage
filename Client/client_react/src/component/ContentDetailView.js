import axios from "axios"
// import main from '../style/main.module.css';
// import noscript from '../style/noscript.css';
// import mycss from '../style/mycss.css';
// import recommend from '../style/recommend.css';
// import detail from '../style/detail.css';

import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Link} from "react-router-dom";


function ContentDetailView() {
    // const {id} = useParams();
    // // let showContent = images.find(function ())
    // const [images, setImages] = useState(null);
    // const backend_url = "http://203.250.33.53:8000"
    //
    //
    // useEffect(() => {
    //     const imagelist = () => {
    //         axios
    //             .get(backend_url + "/Service/signage/")
    //             .then(res => {
    //                 setImages(res.data)
    //                 console.log(res.data)
    //             })
    //             .catch((err) => console.log(err));
    //     }
    //     imagelist();
    // }, []);

    return(
        <html>
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
            <link rel="stylesheet" type="text/css" href="https://www.w3schools.com/w3css/4/w3.css"/>
        </head>

        <body>
        <div className="w3-top">
            <div className="w3-bar w3-black w3-card">
                <Link to='/select' className="w3-bar-item w3-button w3-padding-large" style={{color : 'white', textDecoration: 'none'}}>BACK</Link>
            </div>
        </div>




        <article class="no-pd" id="content"> </article>
        <div class="headerBlock"></div>
        <section id="section1" style={{marginTop: '69px'}}>
            <div class="container">
                <p></p>

                <div id="div1">

                </div>

            </div>
        </section>
        <div class="section" id="section2">
            <div class="container">
                <div class="row">
                    <div class="img_box">
                        <div class="title_box" style={{marginBottom : '3rem'}}>
                            {/*<h2 style="margin-left : 5px;  font-size: 50px; font-family: 'MinSans-Medium';"><strong>{{content_info.title}}</strong></h2>*/}

                            {/*<span><h2 class="Recommand">조회수 {{contents_info.hits}} 회</h2></span>*/}
                            {/*<span><h2 class="Recommand">추천수 {{contents_info.likes}} 회</h2></span>*/}

                            {/*<div id="btn_group">*/}
                            {/*    <span>*/}
                            {/*        <button id="test_btn1">*/}
                            {/*            <a id = "likelink" href="{% url 'ContentLike' content_info.id %}">좋아요</a>*/}
                            {/*            </button>*/}
                            {/*    </span>*/}
                            {/*</div>*/}
                        </div>

                        {/*<div class="img">*/}
                            {/*/!*{% for customUser in user_img %}*!/*/}
                            {/*<img class="profile_user_img" src = "/media/{{customUser.user_profile}}" alt ="No Content"/>*/}
                            {/*    /!*{% endfor %}*!/*/}


                                <div class="gray-line"></div>


                                <div class="detail_contents" style={{marginLeft : '-100px', marginRight : '1000px'}}>
                                    <h4 style={{width : '200px', fontSize : '35px', fontFamily : 'MinSans-Medium'}}>작품소개</h4>
                                    {/*<p style="margin-left: 10px; margin-right: 10px; font-size: 25px;">{{description_info.description}}</p>*/}
                                {/*</div>*/}
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <div class="section" id="section3"  >
            <h3><strong>댓글 영역 : 댓글기능은 추후 지원될 예정입니다.</strong></h3>
        </div>

</body>
</html>
    )
}
export default ContentDetailView;
