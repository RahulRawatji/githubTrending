export default function SearchBar({filterText}) {

    function deBouncInput(){
        let timer = null;
        return function (e){
            if(timer){
                clearTimeout(timer)
            }
            timer = setTimeout(()=>{
               filterText(e.target.value)
            },1000)
        }
    } 
    
    const inpuTextHandler = deBouncInput();

    return <div className="flex px-2 mx-2 mb-6">
        <input onChange={(e)=>inpuTextHandler(e)} placeholder="Search Repository (Type Here)" className="border rounded-md w-full px-1 py-2" />
        {/* <select name="cars" id="cars" className="ml-4 p-2">
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            <option value="opel">Opel</option>
        </select> */}
    </div>
}