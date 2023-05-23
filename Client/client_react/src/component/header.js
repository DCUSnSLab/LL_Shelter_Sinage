// signage 3 상단 시간, 날짜 표시
import styles from '../style/IDLE.module.css';
import React, {useEffect, useState} from "react";
import moment from "moment/moment";

function Header() {
    let timer = null;
    const [time, setTime] = useState(moment());
    useEffect(() => {
        timer = setInterval(() => {
            setTime(moment());
        }, 1000);
        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <div className={styles.page3_header}>
            <div className={styles.page3_date}>
                {time.format('YYYY-MM-DD')}
            </div>
            {/* LT=4:50 , LTS=4:50:21 */}
            <div className={styles.page3_time}>{time.format('LT')}</div>
        </div>
    );
}

export default Header;