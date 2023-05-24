import { createContext, useState } from 'react'

export const themes = {
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

// Let our context know what properties to expect
export const ThemeContext = createContext({
  theme: {},
  setThemeColor: (themeVal) => {},
});

export const ThemeProvider = (props) => {
    const [theme, setTheme] = useState(themes.dark);

    const setThemeColor = (themeVal) => {
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