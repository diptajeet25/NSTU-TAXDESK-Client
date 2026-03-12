import React from 'react'
import campus from '../assets/wholeCampus.png'
import { Link } from 'react-router'

const AboutNSTU = () => {
  return (

    <div className="w-full bg-white flex flex-col gap-8 lg:flex-row justify-center items-center !pt-24 !pb-8 !px-4 lg:!px-8 ">
           <div className="flex-1">
                <img src={campus} alt="NSTU TAXDESK" className=' w-full lg:h-82 rounded-2xl shadow-xl' />
            </div>

        <div className="flex-1 p-6 gap-3 flex flex-col justify-center items-start">
            <h1 className="text-3xl font-bold leading-tight">About Noakhali Science and Technology University</h1>
            <p className="text-gray-600 text-lg mt-4  max-w-full">Noakhali Science and Technology University (NSTU) is a public university in Noakhali, Bangladesh. Established in 2006, it aims to promote higher education in science, technology, and modern academic fields.</p>
            <p className="text-gray-600 text-lg mt-4  max-w-full">The university offers a variety of undergraduate and postgraduate programs through different faculties such as Science, Engineering, Business Studies and Social Sciences.</p>
            <p className="text-gray-600 text-lg mt-4  max-w-full">NSTU is known for its peaceful green campus, modern facilities and commitment to quality education, research and innovation.</p>

            </div>
         
    </div>
  )
}




export default AboutNSTU