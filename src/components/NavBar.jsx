import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import Button from "./Button"

import homeIcon from './../assets/home-icon.png'

const NavBar = ({theme}) => {
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
        </div>
    </>
  );
};

export default NavBar;