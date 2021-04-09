import React, { useEffect, useState } from "react";

type Props = {
  children: React.ReactNode;
};

export const ThemeContext = React.createContext({
  theme: "light",
  toggle: () => {},
});

function ThemeWrapper(props: Props) {
  const [theme, setTheme] = useState("light");
  const [activeTheme, setActiveTheme] = useState(themes[theme]);

  const toggle = () => {
    if (activeTheme === themes.dark) {
      setTheme("light");
      setActiveTheme(themes.light);
    } else {
      setTheme("dark");
      setActiveTheme(themes.dark);
    }
  };

  const setCSSVariables = (theme: any) => {
    for (const value in theme) {
      document.documentElement.style.setProperty(`--${value}`, theme[value]);
    }
  };

  useEffect(() => {
    setCSSVariables(activeTheme);
    // eslint-disable-next-line
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {props.children}
    </ThemeContext.Provider>
  );
}

export default ThemeWrapper;

const themes: any = {
  light: {
    appBackground: "linear-gradient(-225deg, #E3FDF5 0%, #FFE6FA 100%)",
    swapper: "#fff",
    font: "#333",
    buttonColor: "#b3008f",
    buttonBackground: "#ffe6fa",
    selectToken: "#b3008f",
    stroke: "#ddd",
    selection: "",
    primaryColor: "#fff",
    links: "#333",
  },

  dark: {
    appBackground: "linear-gradient(to right, #141e30, #243b55)",
    swapper: "#141e30",
    font: "#f2f2f2",
    buttonColor: "#c6d5e7",
    buttonBackground: "#243b55",
    selectToken: "#007bff",
    stroke: "#555",
    selection: "",
    primaryColor: "#2A2A2A",
    
    links: "#f2f2f2",
  },
};
