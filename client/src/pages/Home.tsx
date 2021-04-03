import React,{useContext} from 'react'
import ThemeSwitcher from './components/ThemeSwitcher';
import { ThemeSelectorContext } from './components/ThemeWrapper';

 function Home() {
    const { themeName } = useContext(ThemeSelectorContext);
    return (
        <div className="">
            <ThemeSwitcher />
        </div>
    )
}
export default Home;