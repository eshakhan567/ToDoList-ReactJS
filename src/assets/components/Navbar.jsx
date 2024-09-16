import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-around bg-indigo-800 text-white py-2 w-full'>
        
            <div className="logo">
                
            <span className='font-bold text-xl mx-8'>iTask</span>
            </div>
        
        <ul className='flex gap-8 pr-[34px]'>
        
            <li className='cursor-pointer hover:font-bold transition-all '>Home</li>
            <li className='cursor-pointer hover:font-bold transition-all '> Your ToDos</li>
        </ul>
    </nav>
  )
}

export default Navbar
