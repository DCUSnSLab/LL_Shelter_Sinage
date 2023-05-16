import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import styled from "styled-components";

const Button = styled.button`
  color: ${props => props.color};
`;

function StyledComponentTest(){
    const [color, setColor] = React.useState('red');
    return (
    <div>
    <Button color={color} onClick={() => setColor('blue')}>
        Click me!
    </Button>
    </div>
  );
}
export default StyledComponentTest;