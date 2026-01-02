import React, { useEffect, useState } from 'react'
import axios from 'axios';
const App = () => {
  const [data,setData] = useState([]);
  const [index, setIndex] = useState(1);

  const getData = async()=>{
    // console.log(`data aa gya`);
    const res = await axios.get(`https://picsum.photos/v2/list?page=${index}&limit=10`);
    const data = res.data;
    // console.log(data)
    setData(data);
  }
  useEffect(()=>{
      getData();
  },[index]);
  // console.log(data)

  let printUserData = <h1 className='text-gray-400 text-xl absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'>Loading...</h1>;

  if(data.length>0){
      printUserData = data.map((dt)=>{
        return <div key={dt.id} className='mb-5'>
              <a href={dt.url} target ="_black">
                 <div className='w-65 h-55 mb-3 grid-rows-2 rounded-xl overflow-hidden hover:scale-105'>
              <img src={dt.download_url} alt="" className='h-full object-cover ' />
            </div>
              <h2 className='text-center text-lg font-bold'>{dt.author}</h2>
              </a>
        </div>
      })
  }

  return (
    <div className='bg-black min-h-screen text-white p-4'>
        {/* <button onClick={getData} className='bg-green-600 active:scale-95 cursor-pointer px-5 text-white py-2 rounded'>Get data</button> */}
    
    <div className='flex flex-wrap gap-x-3 justify-center'>
      {
          printUserData
      }
    </div>

    {
      data.length > 0 && (<div className='flex gap-6 justify-center my-3' >
        <button style={{'opacity' : index == 1 && '0.5'}} className={`bg-yellow-500 text-sm py-3 px-5 text-black font-bold rounded-xl ${ index > 1 && "active:scale-95 cursor-pointer"}`}
        onClick={()=>{
          if(index > 1){
            setData([])
          setIndex(index-1);
          printUserData
          }
        }}
        >prev</button>
        <input className='bg-yellow-500 text-sm py-3 px-5 text-black font-bold rounded-xl md:w-40 w-1/2' placeholder={`page ${index}`} onChange={(e)=>setIndex(Number(e.target.value))}/>
        <button className='bg-yellow-500 text-sm py-3 px-5 text-black font-bold rounded-xl active:scale-95 cursor-pointer'
        onClick={()=>{
          setData([])
          setIndex(index+1)
          printUserData
        }}
        >next</button>
    </div>)
    }
    
    </div>
    
  )
}

export default App