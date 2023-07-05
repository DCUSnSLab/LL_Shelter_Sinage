import React, {useEffect, useRef} from "react";
import styles from "../style/modal.module.css";

import { ImExit } from "react-icons/im";
import { RiThumbUpLine } from "react-icons/ri";

function ModalBasic({ setModalOpen, currentContent, likeupfunc }: PropsType) {
    // 모달 끄기
    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <div className={styles.container}>
            <div className={styles.container_content} >
                <ImExit className={styles.close} onClick={closeModal} />
                <p className={styles.container_title} >{ currentContent && currentContent.contentFK.title }</p>
                <img className={styles.container_img} src={currentContent.upload_file} />
                {/*<button className={styles.like} onClick={() => likeupfunc(currentContent.contentFK)}>*/}
                {/*    좋아요*/}
                {/*</button>*/}
                <RiThumbUpLine  className={styles.like} onClick={() => likeupfunc(currentContent.contentFK)}/>
                <div>
                    <br/>
                    <span>생성일</span><span>{ currentContent && currentContent.contentFK.createDate }</span>
                    <br/>
                    <span>사용자 메일</span><span>{ currentContent && currentContent.contentFK.email }</span>
                    <br/>
                    <span>조회수</span><span>{ currentContent && currentContent.contentFK.hits }</span>
                    <br/>
                    <span>추천(좋아요)</span><span>{ currentContent && currentContent.contentFK.likes }</span>
                    <br/>
                </div>
            </div>
        </div>
    );
}
export default ModalBasic;
