import React from 'react';
import { createContext, useState } from 'react' 
import { themeType } from './components/Classes/Theme'

interface themesObjI {
  dark: themeType;
  light: themeType;
  yellow: themeType;
}

export const themes: themesObjI = {
  dark: {
    background: '#0c0d10',
    containerColor: '#181b23',
    btnColor: '#2C2D43',
    h1Color: 'white'
  },
  light: {
    background: '#2e3340',
    containerColor: '#58668a',
    btnColor: '#2C2D43',
    h1Color: 'white'
  },
  yellow: {
    background: '#b2cd3d',
    containerColor: '#d6fd30',
    btnColor: '#7d8d34',
    h1Color: 'black'
  },
};

interface contextI {
  theme: themeType;
  setThemeColor: (themeVal: number) => {} | void; 
}

// Let our context know what properties to expect
export const ThemeContext = createContext<contextI>({
  theme: themes.dark,
  setThemeColor: (themeVal: number) => {},
});

export const ThemeProvider = (props) => {
    const [theme, setTheme] = useState(themes.dark);

    const setThemeColor = (themeVal: number) => {
        var sortedKeys = Object.keys(themes).sort();

        if (Object.keys(themes).length >= themeVal) {
          setTheme(themes[sortedKeys[themeVal-1]]);
        }
    };

    return (
      <ThemeContext.Provider value={{ theme: theme, setThemeColor }}>
          {props.children}
      </ThemeContext.Provider>
    );
}