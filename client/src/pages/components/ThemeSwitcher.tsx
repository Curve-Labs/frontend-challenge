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
          backgroundColor: "#565A69",
          height:50,
          display:'flex',
          alignItems:'center',
          width:50,
          padding: 10,
         borderRadius:10,
        }}
        className="flex cursor-pointer align-items justify-center" onClick={toggleTheme}>
        <img src={lightIcon} />
      </section>
    )
  }

  function darkTheme() {
    return (
      <section
        style={{
          backgroundColor: "#565A69",
          height:50,
          display:'flex',
          alignItems:'center',
          width:50,
          padding: 10,
          borderRadius:10,
        }}
        className="flex cursor-pointer align-items justify-center" onClick={toggleTheme}>
        <img src={darkIcon} />
       
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
