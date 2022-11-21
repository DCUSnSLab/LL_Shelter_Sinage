import React, { useState, useRef, useEffect } from 'react'
import Counter from "./counter";

const SELECT_page = () => {

    return(
        <div>
            <Counter/>
            <p>작품선택</p>
        </div>
    );
}

export default SELECT_page;
