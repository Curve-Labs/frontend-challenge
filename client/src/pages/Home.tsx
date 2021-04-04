import React,{useContext} from 'react'
import Navbar from './components/Navbar';
import { ThemeSelectorContext } from './components/ThemeWrapper';

 function Home() {
    const { themeName } = useContext(ThemeSelectorContext);
    return (
        <div className="">
            <Navbar/>
           
        </div>
    )
}
export default Home;