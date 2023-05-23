import axios from "axios"
import React, {useEffect, useState, useRef} from "react";
import {Link} from "react-router-dom";
import Modal from './Modal';

function SignageShow({id,title,des}) {
    const [images, setImages] = useState(null);
    const [content, setContent] = useState(null);
    const host_ip = `${process.env.REACT_APP_IP}`;
    const port = "8000";
    const backend_url = "http://localhost:" + port;
    
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
    
    let ws = useRef(null);
    const addr = "ws://localhost:8765";
    const [inputs, setInputs] = useState('ws://localhost:8765');
    const [outputs, setOutputs] = useState([]);
    const [socketConnected, setSocketConnected] = useState(false);


    const recivedData = (id) => {
	openModal(id)
        let data = {images};
        ws.current.send(JSON.stringify(data.images[0]));
        console.log(data.images[0]);
        console.log("클릭?\n" + "id : " + data.images[0].id + "\nfile : " + data.images[0].upload_file);
    }
    const connectServer = () => {
        setOutputs('connecting server...');
        if(!ws.current){
        ws.current = new WebSocket(addr);
        ws.current.onopen = () => {
            console.log("connected to " + addr);
            setOutputs("connected to " + addr)
            setSocketConnected(true);
        };
        ws.current.onclose = (error) => {
            console.log("disconnect from " + addr);
            setOutputs("disconnect from " + addr);
            console.log(error);
        };
        ws.current.onerror = (error) => {
            console.log("connection error " + addr);
            setOutputs("connection error " + addr)
            console.log(error);
        };
        };
    };

    useEffect(() => {connectServer()})

    useEffect(() => {
        const Content_detail_list = () => {
            axios
                .get(backend_url + "/Service/Content/")
                .then(res => {
                    setContent(res.data)
                    // console.log(res.data)
                })
                .catch((err) => console.log(err));
        }
        Content_detail_list();
         }, []);

    const [modals, setModals] = useState([]);

    const openModal = (id) => {
	console.log("openModal");
	const newModalId = Date.now().toString();
	console.log("newModalId created.");
	console.log(newModalId);
	setModals([...modals, id]);
    };

    const closeModal = (modalId) => {
	console.log("closeModal");
	console.log(modalId);
        setModals(modals.filter((id) => id !== modalId));
    };

    return (
        <html>
        <head>
            <title>Phantom by HTML5 UP</title>
            <meta charSet="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no"/>
            <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/>
        </head>
        <body>
        <div id="wrap" style={{height : '100000px'}}>
            <header id="headerArea">
            <div className="w3-top">
                <div className="w3-bar w3-black w3-card">
                    <Link to='/board' className="w3-bar-item w3-button w3-padding-large" style={{color : 'white', textDecoration: 'none'}}>COMMUNITY</Link>
                </div>
            </div>
            </header>

            <div class="section" style={top}>
                <div className="nav_blank"></div>
                <h3>이미지 콘텐츠</h3>
                <div style={grayLine}></div>
                <div style={container_media}>
                    {images && images.map((list, i) => list.thumbnailPath ? null : (
                        <p key={i}>
                                <span className="media_content_box" style={{position: 'relative'}}>
                                    <img style={media_preview} src={backend_url + list.upload_file}/>
                                    <div class="imText2" style={{left : "\
                                    ", bottom : "-70px"}}>{ content && content[i].title}</div>
                                    <Link to='/contentDetailView' style={{color : 'white', textDecoration: 'none'}}>
                                    </Link>
                                </span>
                        </p>
                    ))}
                </div>

                <div className="nav_blank2"></div>
                    <div className="nav_blank"></div>
                    <h3 style={{marginLeft: '30px'}}>동영상 콘텐츠</h3>
                    <div style={grayLine}></div>
                    <div style={container_media}>
                        {images && images.map((list, i) => list.thumbnailPath ? (
                            <p key={i}>
                                <span className="media_content_box" style={{position: 'relative'}}>
                                    <img className="media_preview" onClick={() => recivedData(list.id)}
                                         style={media_preview}
                                         src={backend_url + '/media/' + list.thumbnailPath}/>
					{ modals.map((modalId) => (
					    <Modal modalId={list.id} open={modals.includes(list.id)} close={closeModal} videourl={list.upload_file.substring(6, list.upload_file.length)} header={content && content[i].title}>
					    </Modal>
					)) }
                                    <div className="imText2"
                                         style={{left: "40px", bottom: "-70px"}}>{content && content[i].title}</div>
                                    <Link to='/mediaDetailView' style={{color : 'white', textDecoration: 'none'}}>
                                        </Link>
                                </span>
                            </p>
                        ) : null )}
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

const btn= {
    height: '100px',
    width: '100px',
    backgroundColor: 'blue',
    color: 'white',
    padding: '10px 20px',
    fontSize: '16px',
    borderRadius: '4px'
}

const grayLine = {
    width: '400rem',
    height: '0.1rem',
    backgroundColor: '#D4D4D4',
    margin: '1rem 0px 3rem 0px'
}

const top = {
    marginTop: '60px',
}

const container_media = {
    display: 'grid',
    gridTemplateColumns: '340px 340px 340px',
    gridTemplateRows: '200px 200px 200px',
    columnGap: '10px',
    rowGap: '30px',
    justifyContent: 'center',
    marginLeft: '-20px',
    height: '1200px'
}

const container_media1 = {
    columnGap: '10px',
    rowGap : '30px',
    justifyContent: 'center',
    marginRight: '20px'
}

const img = {
    filter: 'brightness(1)'
}

const media_preview = {
    overflow: 'hidden',
    objectFit: 'cover',
    width: '330px',
    height: '200px',
    borderRadius: '10px'
}

export default SignageShow;
