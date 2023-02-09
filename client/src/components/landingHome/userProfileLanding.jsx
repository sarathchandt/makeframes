import React, { useState, useEffect } from 'react'
import './landingHome.css'
import { MdAddBox } from "@react-icons/all-files/md/MdAddBox.esm"
import { MdCancel } from '@react-icons/all-files/md/MdCancel.esm'
import axios from 'axios'
import { UURL } from '../../../API/apiCall'



function userProfileLanding() {



    const [addimage, setAddimage] = useState(false)
    const [base64, setBase64] = useState('')
    const [dpimg, setDpimg] = useState('')

    useEffect(()=>{
        const token =  document.cookie;
        axios.post(`${UURL}bringDp`,{token:token}).then((result)=>{
            setDpimg(result.data.dpimage)
            console.log(result.data.dpimage)
        
        
            })
    },[])
 
    

    function upoadFile(e) {
        const file = e.target.files[0];
        convertToBase64(file).then((base64) => {
            setBase64(base64)
        })
    }

    function convertToBase64(file) {
        return new Promise((resolve, reject) => {
            const filereader = new FileReader()
            filereader.readAsDataURL(file)
            filereader.onload = () => {
                resolve(filereader.result)
            }
            filereader.onerror = (err) => {
                resolve(err)
            }
        })
    }
    function sendToBack (e) {
        const token =  document.cookie;
        e.preventDefault();
        axios.post(`${UURL}profilePic`,{base64:base64, token:token}).then(()=>{
            setAddimage(false)
        })
    }

    return (
        <div className='container-fluid'>
            <div className="row">
                <div className="d-flex justify-content-center  col-md-4">
                    <img src={dpimg} className=' d-md-block d-none rounded-circle  m-5 ' style={{width:'200px', height:'200px'}} alt="" onClick={() => { addimage ? setAddimage(false) : setAddimage(true) }} />
                    <img src={dpimg} className=' d-md-none d-block rounded-circle  m-4 ' alt="" style={{height:'100px' , width:'100px'}} onClick={() => { addimage ? setAddimage(false) : setAddimage(true) }} />
                    <div className={addimage ? ' bg-green  active add' : 'add bg-green'}>
                        <div className="container-fluid">
                            <div className="row ">
                                <div className='d-flex  justify-content-start col-12 mt-2 text-darkGreen cursor' onClick={() => {
                                    setAddimage(false)
                                }}  ><MdCancel style={{ fontSize: '25px' }} /></div>
                                <div className='d-flex  justify-content-center text-darkGreen mt-5' >Add Profile Pic</div>
                                <div className="row bg-red">
                                <div className="d-flex justify-content-center mt-1 col-3 text-darkGreen ">
                                    <MdAddBox style={{ fontSize: '30px' }} />
                                </div>
                              
                                <div className='col-9' >   <div className='flex text-darkGreen'>
                                    <input type='file' className='flex bg-red  cursor ' id='img' onChange={(e) => { upoadFile(e) }} />
                                </div>
                                </div>
                                </div>  
                                <div className='col-7'></div>
                                <div className="col-4 btn bg-darkGreen text-white m-1 mt-3 " onClick={(e)=>{
                                    sendToBack(e);
                                    setAddimage(false);

                                }}>Add</div>
                            </div>
                        </div>


                    </div>

                </div>

                <div className='col-md-8'></div>
            </div>
        </div>
    )
}

export default userProfileLanding