import React,{useState} from 'react'
import './Header.css'
import { useNavigate } from "react-router-dom";



import { AiOutlineBars } from '@react-icons/all-files/ai/AiOutlineBars.esm'
import { MdCancel } from '@react-icons/all-files/md/MdCancel.esm'
import { MdAccountCircle } from '@react-icons/all-files/md/MdAccountCircle.esm'
import { MdEventAvailable } from '@react-icons/all-files/md/MdEventAvailable.esm'
import {AiFillSchedule} from '@react-icons/all-files/ai/AiFillSchedule.esm'
import {BsFillPlusCircleFill} from '@react-icons/all-files/bs/BsFillPlusCircleFill.esm'
import {RiSettings4Fill} from "@react-icons/all-files/ri/RiSettings4Fill.esm"

function ProfetionalHeader() {

    
    const [navBar, setNavbar] = useState(false)
    const navigate = useNavigate()


    return (
        <div className='container-fluid' >
            <div className='row' >
                <div className='flex flex-nowrap p-2 col-3'>
                    <p className='green  font-bold' >Make</p>
                    <p className='red  font-bold' >frames</p>
                </div>
                <div className='d-md-block d-none  col-md-9'>
                    <div className=' d-flex  justify-content-end text-green '>
                        <p className='ms-5   mt-3 hover:text-red  cursor' onClick={()=>{
                            navigate('/addPrograms')
                        }} >Add Programs</p>
                        <p className='ms-5  mt-3 hover:text-red cursor' onClick={()=>{navigate('/viewPrograms')}}  >Schedules</p>
                        <p className='ms-5 mt-3 hover:text-red cursor'  >Add Post</p>
                        <p className='ms-5 mt-3 hover:text-red cursor'  >Settings</p>
                    </div>
                </div>
                <div className='d-md-none d-block  col-9  '>
                    <p className=' d-flex justify-content-end text-green mt-3 cursor' onClick={()=>{setNavbar(true)}}><AiOutlineBars style={{ fontSize: '30px' }} /></p>
                </div>
            </div >

            <div className= {navBar ?'profile active bg-green' : 'profile bg-green'}>
                <div className='container '>
                    <div className="row">
                        <div className='d-flex  justify-content-end col-12 mt-2 text-darkGreen cursor' onClick={()=>{setNavbar(false)}} ><MdCancel style={{ fontSize: '25px' }} /></div>
                        <div className='d-flex  justify-content-center  col-12 mt-4 text-darkGreen ' ><MdAccountCircle style={{ fontSize: '35px' }} /></div>
                        <div className='d-flex  justify-content-center  col-12 mb-5 text-black '><h6>Sarath Chand </h6></div>
                        <div className="container-fluid">
                            <div className="row hover:bg-red hover:text-white p-1 cursor">
                                <div className='d-flex  justify-content-end col-4  mt-1 text-darkGreen '><MdEventAvailable style={{ fontSize: '30px' }} /></div>
                                <div className='d-flex  justify-content-start col-8  mt-1 text-darkGreen ' onClick={()=>{
                            navigate('/addPrograms')
                        }}> Add Programs</div>
                            </div>
                        </div>
                        <div className="container-fluid">
                            <div className="row hover:bg-red hover:text-white p-1 cursor ">
                                <div className='d-flex  justify-content-end col-4  mt-1 text-darkGreen '><AiFillSchedule style={{ fontSize: '30px' }} /></div>
                                <div className='d-flex  justify-content-start col-8  mt-1 text-darkGreen 'onClick={()=>{navigate('/viewPrograms')}}> Schedules</div>
                            </div>
                        </div>
                    
                        <div className="container-fluid">
                            <div className="row  hover:text-white hover:bg-red p-1 cursor ">
                                <div className='d-flex  justify-content-end col-4  mt-1 text-darkGreen '><BsFillPlusCircleFill style={{ fontSize: '27px' }} /></div>
                                <div className='d-flex  justify-content-start col-8  mt-1 text-darkGreen '> Add Post</div>
                            </div>
                        </div>
                        <div className="container-fluid">
                            <div className="row hover:bg-red hover:text-white p-1 cursor ">
                                <div className='d-flex  justify-content-end col-4  mt-1 text-darkGreen '><    RiSettings4Fill style={{ fontSize: '30px' }} /></div>
                                <div className='d-flex  justify-content-start col-8  mt-1 text-darkGreen '> Settings</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ProfetionalHeader