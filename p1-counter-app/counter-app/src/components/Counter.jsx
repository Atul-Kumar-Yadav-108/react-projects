import { useState } from "react"

export function Counter(){
    let [count, setCount] =  useState(0);
    function incCounter(){
        setCount((count)=>count+1);
        // setCount((count)=>count+1);
    }
    function decCounter(){
        if(count > 0){
            setCount(count-1);
        }
    }
    function resetCounter(){
            setCount(0);
    }
    return (
        <>
           <div className="counter">
             <h1>Counter</h1>
            <h3>Counter Value : {count}</h3>
            <button style={{"margin-right" : "10px" , "backgroundColor":"green", "color":"white"}} onClick={incCounter}>inc Count</button>
            <button style={{"margin-right" : "10px" ,"backgroundColor":"red", "color":"white"}} onClick={decCounter}>dec Count</button>
   
            <button style={{"backgroundColor":"orange", "color":"white"}} onClick={resetCounter}>Reset</button>
           </div>
        </>
    )
}