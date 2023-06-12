import React, {useEffect, useRef, useState} from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import axios from "axios";
import {Link} from "react-router-dom";
import ContentDetailView from "./ContentDetailView";
import Modal from "./Modal";

function Gallery({id,title,des}) {
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
    if (!ws.current) {
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
    }
    ;
  };

  useEffect(() => {
    connectServer()
  })

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


  const carouselRef = React.useRef(null);

  const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
  }


  return (
    <div>
      <Carousel {...settings} ref={carouselRef}>
        {images && images.map((list, i) => list.thumbnailPath ? null :(



          <div key={i} onClick={() => window.location.replace('/ContentDetailView/' + `${list.id}`)}>
                <img src={backend_url + list.upload_file} style={{ width: '100%', height: 'auto', maxWidth: '1200px', maxHeight: '1500px' }} alt=""/>
            </div>

        ))}
      </Carousel>
      {modals.map((modalId) => (
        <Modal key={modalId} closeModal={closeModal} />
    ))}
      </div>
  );
};

export default Gallery;

// <Link to={'/ContentDetailView/' + `${list.id}`} style={{color: 'white', textDecoration: 'none'}}>
// </Link>