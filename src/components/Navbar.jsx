import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between bg-[#7CA982] text-[#243E36] py-2'>
        <div className="logo">
            <span className='font-bold text-xl mx-9 cursor-pointer text-[#5B2E48]'>Todoify</span>
        </div>
      <ul className="flex gap-8">
        <li className='cursor-pointer hover:font-bold transition-all'>Home</li>
        <li className='cursor-pointer hover:font-bold transition-all'>Your Tasks</li>
      </ul>
    </nav>
  )
}

export default Navbar
