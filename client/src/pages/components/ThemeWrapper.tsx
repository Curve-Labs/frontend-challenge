import React, { useEffect, useState } from 'react';
import { retrieveTheme, updateThemeSelection } from '../../utils/theme-settings';

const themes: any = {
  dark: {
    backgroundColor: "#1d1d1d",
    primaryColor: "#2A2A2A",
    strokeColor: "#3C3C3C",
    fontColor: "#EDEDED",
  },
  light: {
    backgroundColor: "#EBEBEB",
    primaryColor: "#fff",
    strokeColor: "#F2DADA",
    fontColor: "#363636",
  }
}

type Props = {
  children: React.ReactNode
}

export default function (props: Props) {

  const savedTheme = retrieveTheme();

  const [themeName, setThemeName] = useState("light");
  const [theme, setTheme] = useState(themes[themeName]);

  function toggleTheme() {
    if (theme === themes.dark) {
      setTheme(themes.light);
      setThemeName("light")
    } else {
      setTheme(themes.dark);
      setThemeName("dark")
    }
  }

  function setCSSVariables(theme: any) {
    for (const value in theme) {
      document.documentElement.style.setProperty(`--${value}`, theme[value]);
    }
  }

  useEffect(() => {
    if (savedTheme === 'dark') {
      setTheme(themes.dark);
      setThemeName("dark");
    } else {
      setTheme(themes.light);
      setThemeName("light");
    }
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    setCSSVariables(theme);
    updateThemeSelection(themeName)
    // eslint-disable-next-line
  })

  return (
    <ThemeSelectorContext.Provider value={{ toggleTheme, themeName }}>
      {props.children}
    </ThemeSelectorContext.Provider>
  )
}



export const ThemeSelectorContext = React.createContext({
  themeName: "dark",
  toggleTheme: () => { }
})
