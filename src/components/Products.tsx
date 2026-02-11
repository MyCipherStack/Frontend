"use client"

import Image from "next/image";





const Products=({products,setSkip,page,limit})=>{

    console.log("product component",products);


    
    return (
        <>
        
        
            <div className="flex">
                <div className="flex">
                    {products.length > 0 && products.map((item:any)=>(
                        <div key={item.id} className="">
                            <Image src={item.thumbnail} alt="images" width={100} height={100}/>
                            {/* <span>image:{item.thumbnail}</span> */}
                            <h1>{item.title}</h1>
                            <span>rating :{item.rating}</span>
                        </div>
                        
                     ))}
                </div>
            </div>
                     
                     
    {/* pagination */}
            <div className="bg-red">

            <div className=" flex justify-between">
            <button onClick={()=>setSkip(prev=>prev-limit)}>prev</button>
            <span>page {page}</span>
            <button onClick={()=>setSkip(prev=>prev+limit)}>next</button>

            </div>
            </div>
        
        </>
    )
}

export default Products