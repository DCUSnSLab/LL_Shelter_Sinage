import React, {useEffect, useRef} from "react";
import styles from "../style/modal.module.css";

import { ImExit } from "react-icons/im";
import { RiThumbUpLine } from "react-icons/ri";

function ModalBasic({ setModalOpen, currentContent, likeupfunc, contentType }: PropsType) {
    // 모달 끄기
    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <div className={styles.container}>
            <div className={styles.container_content} >
                <span className={styles.container_title} >{ currentContent.contentFK.title }</span><span>{ currentContent.contentFK.hits }</span>
                {
                    currentContent.thumbnailPath == null && (
                        <img className={styles.container_img} src={currentContent.upload_file} />
                    ) ||
                    currentContent.thumbnailPath != null && (
                        <video className={styles.container_video} src={"ftp" + currentContent.upload_file.slice(6)} muted autoPlay />
                    )
                }
                {/*<img className={styles.container_img} src={currentContent.upload_file} />*/}
                <div className={styles.icons}>
                    <RiThumbUpLine  className={styles.like} onClick={() => likeupfunc(currentContent.contentFK)}/>
                    <ImExit className={styles.close} onClick={closeModal} />
                </div>
                <br/>
                <p>업로더</p><span>{ currentContent.contentFK.email }</span>
                <br/>
                <span>추천(좋아요)</span><span>{ currentContent.contentFK.likes }</span>
            </div>
        </div>
    );
}
export default ModalBasic;
