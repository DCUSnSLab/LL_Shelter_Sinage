import React, {useEffect, useRef, useState} from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import styles from "../style/IDLE.module.css";
//import '../style/ContentDetailView.css'

function Title() {
  return (
    <header>
      <h1>Contents Gallery</h1>
    </header>
  );
}

function ContentDetailView() {
  const { id } = useParams();
  const [image, setImage] = useState(null);
  const [data, setData] = useState(null);
  const [Content, setContent] = useState(null);
  const backend_url = "http://localhost:8000";

  // useEffect(() => {
  //   const fetchImage = () => {
  //     axios
  //       .get(backend_url + "/Service/contentDetailView/" + id)
  //       .then((res) => {
  //         setImage(res.data.upload_file);
  //         setData(res.data);
  //         console.log(res.data);
  //       })
  //       .catch((err) => console.log(err));
  //   };
  //   fetchImage();
  // }, []);

  let ws = useRef(null);
  const addr = "ws://localhost:8765";
  const [inputs, setInputs] = useState('ws://localhost:8765');
  const [outputs, setOutputs] = useState([]);
  const [socketConnected, setSocketConnected] = useState('ws://localhost:8765');

  const connectServer = () => {
      setOutputs('connecting server...');
      if(!ws.current){
          ws.current = new WebSocket(addr);
          ws.current.onopen = () => {
              console.log("connect to " + addr);
              setOutputs("connect to " + addr)
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
  }
useEffect(() => {
    connectServer()
  })

  useEffect(() => {
    const Content_detail_list = () => {
      axios
          .get(backend_url + "/Service/contentDetailView/" + id)
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
    <div className='html'>
      <header>
        <div className="Title">
          <Title></Title>
        </div>
      </header>
      <section>
        <div className="DetailView">
            <img src={image} style={{ width: 250, height: 350 }} alt= " " />
            <div className="Arti">
              <div>
                  <p>작자명</p>
                  {data && <p>{data.author}</p>}
              </div>
              <div>
                  <p>이메일 입력</p>
                  {data && <p>{data.email}</p>}
              </div>
              <div>
                  <p>전화번호</p>
                  {data && <p>{data.phonenum}</p>}
              </div>
              <div className="gray-line"/>
              <div>
                  <p>콘텐츠 이름</p>
                  {data && <p>{data.title}</p>}
              </div>
              <div>
                  <p>콘텐츠 설명</p>
                  {data && <p>{data.description}</p>}
              </div>
            </div>
            <div className={styles.social}>
                <p>뒤로가기<br/>
                    <button><Link to='/select' style={{color : 'white', textDecoration: 'none'}}>GO</Link></button>
                </p>
                <p className={styles.line}><br/>
                    {/*<button><Link to='/select' style={{color : 'white', textDecoration: 'none'}}>GO</Link></button>*/}
                </p>
                <p className={styles.line}>게시판<br/>
                    <button><Link to='/board' style={{color : 'white', textDecoration: 'none'}}>GO</Link></button>
                </p>
            </div>
        </div>
      </section>
    </div>
  );
}

export default ContentDetailView;