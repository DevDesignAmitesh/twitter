import React from 'react'
import { FaXTwitter } from 'react-icons/fa6'

const Notification = () => {
  return (
    <div className='text-text flex p-5 gap-5 border-b-[1px] border-color w-full justify-start items-center'>
      <FaXTwitter size={25} />
      <p>Someone liked your tweet</p>
    </div>
  )
}

export default Notification