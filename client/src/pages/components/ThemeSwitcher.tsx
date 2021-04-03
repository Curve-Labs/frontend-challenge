import React, { useContext } from 'react';
import { ThemeSelectorContext } from './ThemeWrapper';
import lightIcon from '../../images/light.png';
import darkIcon from '../../images/dark.png';

function ThemeSwitcher() {

  const { toggleTheme, themeName } = useContext(ThemeSelectorContext);

  function lightTheme() {
    return (
      <section
        style={{
          backgroundColor: "#2D2D2D",
          padding: 15,
          borderTop: "1px solid var(--strokeColor)"
        }}
        className="flex cursor-pointer align-items justify-center" onClick={toggleTheme}>
        <img src={lightIcon} />
        <div className="w1"></div>
        <span>Light</span>
      </section>
    )
  }

  function darkTheme() {
    return (
      <section
        style={{
          backgroundColor: "#fff",
          padding: 15,
          borderTop: "1px solid var(--strokeColor)"
        }}
        className="flex cursor-pointer align-items justify-center" onClick={toggleTheme}>
        <img src={darkIcon} />
        <div className="w1"></div>
        <span>Dark</span>
      </section>
    )
  }

  return (
    <div>
      {
        themeName === "light" ? darkTheme() : lightTheme()
      }
    </div>
  )
}

export default ThemeSwitcher;
