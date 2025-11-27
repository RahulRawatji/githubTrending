import { RiMoonFill, RiGithubLine } from "react-icons/ri";

function Header() {


    return <div className="position-sticky t-0">
        <div className="flex gap-1 items-center border-b p-2 justify-between">
            <div className="flex gap-1 items-center">
                <div className="w-7 h-7">
                   <RiGithubLine size={28}/>
                </div>
                <p className="text-sm font-semibold">Trending Repos</p>
            </div>
            <div className="w-8 h-8 border rounded-lg p-2 cursor-pointer" role="button">
               <RiMoonFill />
            </div>
        </div>
        <div className="my-4">
            <h1 className=" text-3xl md:text-4xl sticky top-0 font-medium font-sans text-center " style={{ color: '#4A70A9' }} >Github Trending Repos</h1>
        </div>
    </div>
}

export default Header;