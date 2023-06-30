import React, {useEffect, useRef} from "react";
import styles from "../style/modal.module.css";

function ModalBasic({ setModalOpen, currentContent, likeupfunc }: PropsType) {
    // 모달 끄기
    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <div className={styles.container}>
            <button className={styles.close} onClick={closeModal}>
                X
            </button>
            <div>
                설명
            </div>
            <div>
                <span>타입</span><span>{ currentContent && currentContent.contentFK.contentType }</span>
                <br/>
                <span>생성일</span><span>{ currentContent && currentContent.contentFK.createDate }</span>
                <br/>
                <span>사용자 메일</span><span>{ currentContent && currentContent.contentFK.email }</span>
                <br/>
                <span>조회수</span><span>{ currentContent && currentContent.contentFK.hits }</span>
                <br/>
                <span>추천(좋아요)</span><span>{ currentContent && currentContent.contentFK.likes }</span>
                <br/>
                <span>타이틀</span><span>{ currentContent && currentContent.contentFK.title }</span>
                <br/>
                <button onClick={() => likeupfunc(currentContent.contentFK)}>
                    좋아요
                </button>
            </div>
        </div>
    );
}
export default ModalBasic;
