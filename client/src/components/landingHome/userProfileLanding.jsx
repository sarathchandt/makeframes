import React, { useState, useEffect } from 'react'
import './landingHome.css'
import { MdAddBox } from "@react-icons/all-files/md/MdAddBox.esm"
import { MdCancel } from '@react-icons/all-files/md/MdCancel.esm'
import axios from 'axios'
import { UURL } from '../../../API/apiCall'
import { fetchPost } from '../../../slices/fetchPost.mjs'
import { useDispatch, useSelector } from 'react-redux'
import {AiFillMessage} from '@react-icons/all-files/ai/AiFillMessage.esm'


function userProfileLanding() {


    const postCondition = useSelector(state => {
        return state.takePost
    })


    const [addimage, setAddimage] = useState(false)
    const [img, setImg] = useState('')
    const [dpimg, setDpimg] = useState('')
    const [showPost, setShowPost] = useState([])
    const [profileDetails, setProfileDetails] = useState([])
    const dispatch = useDispatch()



    useEffect(() => {
        dispatch(fetchPost())
        const token = document.cookie;
        axios.post(`${UURL}bringDp`, { token: token }).then((result) => {
            setImg(result.data.dpimage)
            setProfileDetails(result.data)

        })

        axios.post(`${UURL}pickPosts`, { token: token }).then(res => {
            showPost.push(res.data[0])
        })
    }, [])
    console.log(profileDetails);

    function sendToBack(e) {
        const data = new FormData();
        data.append('file', dpimg)
        data.append("upload_preset", 'nefiqdoa')
        axios.post('https://api.cloudinary.com/v1_1/dyn6m4tou/image/upload', data).then(result => {
            const token = document.cookie;
            axios.post(`${UURL}profilePic`, { image: result.data.secure_url, token: token }).then(() => {
                setAddimage(false)
                location.reload()
            })
        })

    }

    return (
        <div className='container-fluid mt-2'>
            {postCondition.loading ? <div>loading...</div> :
                <div className="row">
                    <div className="d-flex justify-content-center   col-md-3">
                        <div className='mb-3'>
                        <img src={img} className=' d-md-block d-none rounded-circle  cursor ' style={{ width: '150px', height: '150px', objectFit:'cover' }} alt="" onClick={() => { addimage ? setAddimage(false) : setAddimage(true) }} />
                        <img src={img} className=' d-md-none d-block rounded-circle  m-4 cursor ' alt="" style={{ height: '100px', width: '100px' }} onClick={() => { addimage ? setAddimage(false) : setAddimage(true) }} />
                        <p className='text-white'>{profileDetails.firstName} {profileDetails.lastName}</p>
                        <button className='flex justify-content-center p-2 mt-1 bg-green text-darkGreen font-bold' style={{width:'100%'}}> <AiFillMessage className='m-1 text-darkGreen'/>Message</button>

                        </div>
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
                                            <input type='file' className='flex bg-red  cursor ' id='img' accept='image/*' onChange={(e) => { setDpimg(e.target.files[0]) }} />
                                        </div>
                                        </div>
                                    </div>
                                    <div className='col-7'></div>
                                    <div className="col-4 btn bg-darkGreen text-white m-1 mt-3 " onClick={(e) => {
                                        sendToBack(e);
                                        setAddimage(false);
                                    }}>Add</div>
                                </div>
                            </div>


                        </div>

                    </div>
                  


                    <div className='d-md-block d-none col-md-6'>
                        {
                            postCondition.loading ? <div></div> :
                                <div className='container-fluid'>
                                    <div className='row '>
                                        {postCondition.post?.data?.map(obj => {
                                            return <>
                                                <div className=' col-md-4 ' >
                                                    <img className=' object-cover  m-2  cursor 'style={{aspectRatio: '1 / 1'}} src={obj?.images[0]} alt="" />
                                                </div>
                                                
                                            </>

                                        })}
                                    </div>
                                </div>
                        }
                    </div>
                    <div className='d-md-none d-block '>
                        {
                            postCondition.loading ? <div></div> :
                                <div className='container-fluid '>
                                    <div className='row '>
                                        {postCondition.post?.data?.map(obj => {
                                            return <>
                                                <div className=' col-4 ' >
                                                    <img className=' object-cover cursor m-2  ' style={{aspectRatio: '1 / 1'}} src={obj?.images[0]} alt="" />
                                                </div>
                                                
                                            </>

                                        })}
                                    </div>
                                </div>
                        }
                    </div>
                </div>
            }
        </div>
    )
}

export default userProfileLanding