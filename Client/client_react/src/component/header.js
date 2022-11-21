// signage 3 상단 시간, 날짜 표시

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
        <div className="header">
            <div className="date">
                {time.format('YYYY-MM-DD')}
            </div>
            {/* LT=4:50 , LTS=4:50:21 */}
            <div className="time">{time.format('LT')}</div>
        </div>
    );
}

export default Header;