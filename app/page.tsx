


import Link from "next/link"

export default function page(){

   

    return(
        <>
        <div className=" bg-slate-100 flex  justify-center  text-3xl mt mt-24 text-black">
            <h1 className=" mx-64"> Welcome to Home Page !!!!</h1>

            <span className="size-12 rounded-md text text-center overflow-hidden text-1xl flex items-center bg-black text text-sm text-gray-200"> <Link href={'/login'}>Logout </Link> </span></div></>
           
    )
}