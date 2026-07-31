import React from 'react'
import { NotepadText } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const LogoAndName = () => {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate('/')}
      className='flex flex-row items-center pb-4 mt-auto cursor-pointer group px-4 py-2 rounded-2xl hover:bg-white/50 transition-all duration-300'
    >
      <div className='flex flex-row gap-3 items-center'>
        {/* Icon with gradient/accent background */}
        <div className='h-10 w-10 bg-amber-50 rounded-xl flex items-center justify-center text-[#FF9E20] shadow-sm group-hover:scale-105 group-hover:bg-[#FF9E20] group-hover:text-white transition-all duration-300'>
          <NotepadText size={22} />
        </div>
        
        {/* Logo Text */}
        <h1 className='text-xl font-extrabold text-[#1c7583] tracking-tight group-hover:text-[#FF9E20] transition-colors duration-300'>
          Prompt<span className='text-[#FF9E20] group-hover:text-[#203A3E] transition-colors'>Vault</span>
        </h1>
      </div>
    </div>
  )
}

export default LogoAndName