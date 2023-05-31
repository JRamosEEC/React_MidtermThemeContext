import React from 'react';
import { useEffect, useContext, useState } from 'react';
import NavBar from './components/NavBar';
import { Outlet } from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { ThemeContext } from './ThemeContext';
import { themeType } from './components/Classes/Theme'

function App() {
  interface themeI {
    theme: themeType;
  }

  const { theme, setThemeColor }: {theme: themeType, setThemeColor: (themeVal: number) => void} = useContext(ThemeContext)

  useEffect(() => {
    document.body.style.background = theme.background;
  }, [theme]);

  return (
    <div className="App">
      <NavBar theme={theme} />

      <div id="pageContent" style={{ backgroundColor: theme.containerColor }} className='pageContent'>
        <Outlet context={{setThemeColor: setThemeColor, theme: theme}} />
      </div>
    </div>
  );
}

export default App;
