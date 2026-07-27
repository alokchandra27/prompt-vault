import React from 'react'

const ProfileNdName = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-5 mt-8">

         <div className="flex flex-col gap-2 items-center justify-center mb-5">
        <img className="object-contain  rounded-[50%] bg-red-300 h-30 w-30"  src="https://i.pinimg.com/736x/da/59/64/da59647bd31dd524c09991cb89949804.jpg" alt="" />
        <div className="flex flex-col items-center justify-center">
            <h2 className='uppercase'>Alok Chandra</h2>
            <p className="font-light text-xs">alokpromptVault123@gmail.com</p>
        </div>
      </div>

    </div>
  )
}

export default ProfileNdName