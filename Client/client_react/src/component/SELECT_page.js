import React, { useState, useRef, useEffect } from 'react'

import Counter from "./counter";

const SELECT_page = () => {

    return(
        <div>

            <Counter/>
            <h1>작품선택</h1>
        </div>
    );
}

export default SELECT_page;
