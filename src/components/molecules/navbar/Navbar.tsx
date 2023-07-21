
export default function Navbar(props?: object){
   return (
        <div className="bg-cnt-dark w-full h-fit p-5 flex items-center">
            <div className="flex items-center">
                <div className="rounded-md w-14 h-14 bg-slate-400" id="logo">
                </div>
                <h3 className="ml-5">AppName</h3>
            </div>
        </div>
    )
}