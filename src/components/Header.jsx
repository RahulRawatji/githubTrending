import { useState } from "react";
import { RiMoonFill, RiGithubLine,RiSunLine } from "react-icons/ri";

function Header() {

    const [themeBtn, setThemeBtn] = useState('light');

    function themeBtnClickHandler(){
        if(themeBtn=='light'){
            setThemeBtn('dark');
             document.body.setAttribute("data-theme", "dark")
        }else{
            setThemeBtn('light');
             document.body.setAttribute("data-theme", "light")  
        }
    }

    return <div className="position-sticky t-0 dark:bg-zinc-700">
        <div className="flex gap-1 items-center border-b p-2 justify-between">
            <div className="flex gap-1 items-center">
                <div className="w-7 h-7 dark:text-zinc-100">
                   <RiGithubLine size={28}/>
                </div>
                <p className="text-sm font-semibold dark:text-zinc-100">Trending Repos</p>
            </div>
            <div className="w-8 h-8 border rounded-lg p-2 cursor-pointer" role="button" onClick={themeBtnClickHandler}>
               {themeBtn == 'light' ?<RiMoonFill /> : <RiSunLine className="dark:text-zinc-100"/>}
            </div>
        </div>
        <div className="my-4" id="gt-top-heading-container">
            <h1 className=" text-3xl md:text-4xl sticky top-0 font-medium font-sans text-center text-[#4A70A9] dark:text-zinc-100 ">
                Github Trending Repos
            </h1>
             <p className='text-center font-mono text-xs mt-2 dark:text-zinc-100'>The most starred GitHub projects created in the last 10 days.</p>
        </div>
    </div>
}

export default Header;