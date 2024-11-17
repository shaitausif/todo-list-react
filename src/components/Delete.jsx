import React from 'react'

const Delete = ({onConfirm,onCancel}) => {
  return (
    
    <div className="container justify-center items-center bg-opacity-35">
        <div className="z-10 flex flex-col p-5 gap-10 justify-end box rounded-xl bg-violet-200 w-[90%] md:w-[25vw] h-[25vh] fixed top-[37%] left-5 md:left-[37%]">
        <div className="text">
            Are you sure you want to delete the Todo?
        </div>
        <div className="buttons text-center">
            <button onClick={onConfirm} className='w-16 h-6 mx-2 hover:transition-all  rounded-xl  bg-red-600 hover:bg-red-700 text-white '>Yes</button>
            <button onClick={onCancel} className='w-16 h-6 mx-2 hover:transition-all  hover:bg-green-600 rounded-xl bg-green-500 text-white '>No</button>
        </div>
        </div>
    </div>
  )
}

export default Delete
