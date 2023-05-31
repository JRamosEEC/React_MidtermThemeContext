import React from 'react';
import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import Button from "./Button"
import { useSelector } from 'react-redux'
import homeIcon from './../assets/home-icon.png'
import cartIcon from './../assets/shopping-cart.png'

const NavBar = ({theme}) => {
  const cartCount = Object.keys(useSelector(state => state.cart)).length

  const navigate = useNavigate();
  
  const handleShowHomePage = () => {
    navigate('/');
  };

  const handleShowProducts = () => {
    navigate('/products');
  };

  const handleShowThemes = () => {
    navigate('/themes');
  };

  const handleShowCart= () => {
    navigate('/cart');
  };

  return (
    <>
        <div id="pageHeader" style={{backgroundColor: theme.containerColor}} className="row header centerV no-marginL flex-nowrap">
            <nav id="logoContainer" className="col-auto transparent centerV no-padL navbar-expand-lg navbar-light bg-light">
                <a id="headerLogo" onClick={handleShowHomePage} className="col-9"><img id='navLogo' className="text-center no-pad" src={homeIcon} /></a>
            </nav>

            <div id="navBtnContainer" className="center col-auto d-flex align-items-center">
                <Button style={theme.btnColor} label="Home" onClick={handleShowHomePage} />
                <Button style={theme.btnColor} label="Product" onClick={handleShowProducts} />
                <Button style={theme.btnColor} label="Themes" onClick={handleShowThemes} />
            </div>

            <nav id="logoContainer" className="col transparent centerV no-padL navbar-expand-lg navbar-light bg-light">
                <a id="cartLogo" onClick={handleShowCart} className="col-9">{cartCount}<img id='navLogo' className="text-center no-pad" src={cartIcon} /></a>

            </nav>
        </div>
    </>
  );
};

export default NavBar;