import type { NextPage } from 'next';
import { get, subscribe, set } from "../utils/storejs";
// import { get, subscribe, set } from "../utils/storets";
import React, { useState, useEffect } from "react";


const Home: NextPage = () => {
  const [home, setHome] = useState({});
  const [key, setKey] = useState<string>('');
  const [value, setValue] = useState<string>('');
  
  const handleChange1 = (e: any) => setKey(e.target.value ? e.target.value.trim() : '');
  const handleChange2 = (e: any) => setValue(e.target.value ? e.target.value.trim() : '');
  
  const add = () => {
    if(!key || !value || '' === key || '' === value ) return;

    const stored = get('home') || {};
    const newStore = {...stored, [key]: value};
    set('home', newStore);
    
    setKey('');
    setValue('');
  };
  
  const clear = () => {
    set('home', {});
    setHome({})
  }
  
  useEffect(() => {
    const inStore = get("home") || {};
    if (inStore) {
      setHome(inStore);
    }
    // return;
    subscribe("home", () => {
      const inStore = get("home") || {};
      setHome(inStore);
    });
  }, []);
  

  return (
  <div className='min-h-screen bg-amber-600 flex flex-col justify-start items-center'>
    <div className='flex justify-center items-center mt-52'>
      <input placeholder='key' className='w-40 ml-2 rounded px-2' value={key} onChange={handleChange1}></input>
      <input placeholder='value' className='w-40 ml-2 rounded px-2' value={value} onChange={handleChange2}></input>
      <button className='w-20 ml-2 bg-slate-600 rounded text-white active:brightness-75' onClick={add}>add</button>
      <button className='w-20 ml-2 bg-white rounded active:brightness-75' onClick={clear}>clear</button>
    </div>
    <div className='flex justify-center items-center mt-3'>
    <pre>{JSON.stringify(home, null, 4)}</pre>
    </div>

  </div>
  )
}

export default Home