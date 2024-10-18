import logo from "./assets/logo.png";
import styled from "styled-components";
import { Link } from "react-router-dom";

function Navbar () {
    return (
        <Nav>
            <Logo to="/"><img src={logo} alt="" /></Logo>
            <h1>Cineflex</h1>
        </Nav>
    )
}

export default Navbar;

const Nav = styled.div `
    background-color: #EE897F;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    gap: 13px;
    cursor: default;
    position: fixed;
    margin: 0;
    top: 0;

    h1 {
        color: #FADBC5;
        font-family: "Raleway", Arial;
        font-weight: 600;
        font-size: 34px;
        cursor: pointer;
        
`

const Logo = styled(Link)`

    img {       
        width: 40px;
        height: 40px; 
        transition: transform 0.5s, background-color 0.5s;
        cursor: pointer;

        &:hover {
        transform: scale(1.07);
    }

    &:active {
        transform: scale(0.8);
    }
`