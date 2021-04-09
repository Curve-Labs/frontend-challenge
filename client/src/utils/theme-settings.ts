// controls settings for light or dark theme

const themeStorageName = '__theme-conf__';

export const retrieveTheme = () => {
  //
  let themeChoice = localStorage.getItem(themeStorageName);
  if (themeChoice === null) {
    return '';
  } else return themeChoice;
}


export const updateThemeSelection = (update: string) => {
  localStorage.setItem(themeStorageName, update);
}