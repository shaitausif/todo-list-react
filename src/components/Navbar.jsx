import React from 'react'

const Navbar = () => {
  return (
    <nav className="bg-violet-800 text-white flex justify-around py-2 items-center">
        <div className="logo">
            <span className="font-bold text-xl">iTask</span>
        </div>
        <ul className='flex md:gap-0 gap-3'>
            <a target='_blank' href="https://spotifycloneproject089.freewebhostmost.com/"><li className='cursor-pointer hover:font-bold w-[70px] md:w-[100px] text-center transition-all'>Home</li></a>
            <a target='_blank' href="http://sigmawebdev089.freewebhostmost.com/"><li className='cursor-pointer hover:font-bold w-[80px] md:w-[100px] text-center transition-all'>Your Tasks</li></a>
        </ul>
    </nav>
  )
}

export default Navbar
