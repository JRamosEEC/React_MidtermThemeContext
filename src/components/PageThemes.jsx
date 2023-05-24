import { useOutletContext } from "react-router-dom";
import Button from "./Button"

const HomePage = () => {
  const { setThemeColor } = useOutletContext();
  const { theme } = useOutletContext();

  return (
    <>
      <h1 style={{color: theme.h1Color}} className="text-center no-pad">Page Themes</h1>
      
      <div className='row d-flex justify-content-center'>
          <Button style={ theme.btnColor } label="Default" onClick={() => {setThemeColor(1)}} />
          <Button style={ theme.btnColor } label="Light" onClick={() => {setThemeColor(2)}} />
          <Button style={ theme.btnColor } label="Yellow" onClick={() => {setThemeColor(3)}} />
      </div>
    </>
  );
};

export default HomePage;