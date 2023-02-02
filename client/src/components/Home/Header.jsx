import axios from 'axios'
import { UURL } from '../../../API/apiCall';
import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import './Header.css'
import { FiLogIn } from "@react-icons/all-files/fi/FiLogIn.esm";
import { MdAccountCircle } from '@react-icons/all-files/md/MdAccountCircle.esm'
import { MdCancel } from '@react-icons/all-files/md/MdCancel.esm'
import {BiMovie} from '@react-icons/all-files/bi/BiMovie.esm'
import {FaMoneyBillAlt} from '@react-icons/all-files/fa/FaMoneyBillAlt.esm'
import {AiFillMessage} from '@react-icons/all-files/ai/AiFillMessage.esm'
import {AiOutlineBars} from '@react-icons/all-files/ai/AiOutlineBars.esm'
import {AiTwotoneHome} from '@react-icons/all-files/ai/AiTwotoneHome.esm'




function Header() {



  const [login, setLogin] = useState(false)
  const [profilebar, setProfilebar] = useState(false)


  useEffect(() => {
    const token = document.cookie
    axios.post(`${UURL}loginCheck`, { token: token }).then(response => {
      setLogin(response.data.user)
    })
  })


  const navigate = useNavigate();
  return (
    <>

      <div className='flex flex-nowrap p-2'>
        <p className='green  font-bold' >Make</p>
        <p className='red  font-bold' >frames</p>


        <div className='flex  details  ' style={{ color: "#3C6255" }} id="navitems" >
          <p className='pl-8 text-sm cursor hover:text-red' onClick={() => {
            navigate("/")
          }}>Home</p>
          <p className='pl-8 text-sm cursor hover:text-red' onClick={() => {
            navigate("/")
          }}>About</p>
          <p className='pl-8 text-sm cursor hover:text-red'>Approach Producers</p>

          {
            login ? <p className='pl-8 text-sm cursor hover:text-red' onClick={() => {
              // navigate("/profile")
              setProfilebar(true)
            }}>Profile</p> : <p className='pl-8 text-sm cursor hover:text-red' onClick={() => {
              navigate("/login")
            }}>Login</p>
          }
        </div>
        <div className={profilebar?'profile active bg-green':'profile bg-green'}>

          <div className='container '>
            <div className="row">
              <div className='d-flex  justify-content-start col-6 mt-2 text-darkGreen' ><AiFillMessage style={{ fontSize: '25px' }} /></div>
              <div className='d-flex  justify-content-end col-6 mt-2 text-darkGreen' onClick={()=>{setProfilebar(false)}} ><MdCancel style={{ fontSize: '25px' }} /></div>
              <div className='d-flex  justify-content-center  col-12 mt-4 text-darkGreen '><MdAccountCircle style={{ fontSize: '35px' }} /></div>
              <div className='d-flex  justify-content-center  col-12 mb-5 text-black '><h6>Sarath</h6></div>
            </div>
          </div>
          <div className='container   '>
            <div className='row   cursor  text-darkGreen hover:text-white hover:bg-red p-2'>
              <div className='d-flex  justify-content-end col-3  mt-1  '> <BiMovie style={{ fontSize: '20px' }} />  </div>
              <div className='d-flex  justify-content-start col-9   '>Artist  </div>
            </div>
            <div className='row cursor text-darkGreen hover:text-white hover:bg-red p-2'>
              <div className='d-flex  justify-content-end col-3 mt-1'> <FaMoneyBillAlt style={{ fontSize: '20px' }} />  </div>
              <div className='d-flex  justify-content-start col-9 '>Producer</div>
            </div>
            <div className='row cursor text-darkGreen hover:text-white hover:bg-red p-2'>
              <div className='d-flex  justify-content-end col-3 mt-1'> <FiLogIn style={{ fontSize: '20px' }} />  </div>
              <div className='d-flex  justify-content-start col-9 '>Logout </div>
            </div>
          </div>

        </div>

        <div className='details toggle p-1 text-green'>
          <AiOutlineBars style={{fontSize:'30px'}}/>
        </div>
        <div className='profile active bg-green'>

          <div className='container '>
            <div className="row">
              <div className='d-flex  justify-content-end col-12 mt-2 text-darkGreen' onClick={()=>{setProfilebar(false)}} ><MdCancel style={{ fontSize: '25px' }} /></div>
            </div>
          </div>
          <div className='container  mt-5 '>
            <div className='row   cursor  text-darkGreen hover:text-white hover:bg-red p-2'>
              <div className='d-flex  justify-content-end col-3  mt-1  '> <AiTwotoneHome style={{ fontSize: '20px' }} />  </div>
              <div className='d-flex  justify-content-start col-9   '>Home  </div>
            </div>
            <div className='row cursor text-darkGreen hover:text-white hover:bg-red p-2'>
              <div className='d-flex  justify-content-end col-3 mt-1'> <FaMoneyBillAlt style={{ fontSize: '20px' }} />  </div>
              <div className='d-flex  justify-content-start col-9 '>To Producer</div>
            </div>
            <div className='row cursor text-darkGreen hover:text-white hover:bg-red p-2'>
              <div className='d-flex  justify-content-end col-3 mt-1'> <FiLogIn style={{ fontSize: '20px' }} />  </div>
              <div className='d-flex  justify-content-start col-9 '>Log </div>
            </div>
          </div>

        </div>



      </div>





    </>
  )
}

export default Header