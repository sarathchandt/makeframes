import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UURL } from '../../../API/apiCall'
import './landingHome.css'
import { AiFillFileImage } from '@react-icons/all-files/ai/AiFillFileImage.esm'
import { fetchPost } from '../../../slices/fetchPost.mjs'
import { useDispatch, useSelector } from 'react-redux'
import { AiFillMessage } from '@react-icons/all-files/ai/AiFillMessage.esm'
import { BsImages } from '@react-icons/all-files/bs/BsImages.esm'
import { BsFillCalendarFill } from '@react-icons/all-files/bs/BsFillCalendarFill.esm'
import { CgMoreR } from "@react-icons/all-files/cg/CgMoreR.esm"



function userProfileLanding() {


    const postCondition = useSelector(state => {
        return state.takePost
    })


    const [addimage, setAddimage] = useState(false)
    const [img, setImg] = useState('')
    const [dpimg, setDpimg] = useState('')
    const [showPost, setShowPost] = useState([])
    const [profileDetails, setProfileDetails] = useState([])
    const [coment, setComent] = useState('')
    const [file] = useState([])
    const [imageArray] = useState([])
    const [pages, setPages] = useState([])
    const [event, setEvent] = useState(false)
    const [indecator, setIndicator] = useState(false)
    const [count, setCount] = useState(1)
    const [unequeCall, setunequeCall] = useState(true)

    const navigate = useNavigate()




    const dispatch = useDispatch()

    function loadImage(e) {
        for (let i = 0; i < e.target.files.length; i++) {
            file.push(e.target.files[i])
        }
    }
    const upload = () => {
        const data = new FormData()
        file.forEach(async (image) => {
            data.append('file', image)
            data.append("upload_preset", 'nefiqdoa')
            await axios.post('https://api.cloudinary.com/v1_1/dyn6m4tou/image/upload', data).then(async (res) => {
                imageArray.push(res.data.secure_url)

                let details = {
                    images: imageArray,
                    coments: coment,
                    token: document.cookie
                }
                await axios.post(`${UURL}addPost`, details).then(res => {
                    if (res.data.posted) {
                        navigate('/profetionalProfile')
                        location.reload();
                    }
                })
            })
        })


    }

    useEffect(() => {

        if (postCondition.post?.data?.length >= 9) {

            for (let i = 0; i < 9; i++) {
            pages.push(postCondition.post?.data[i])
            }
            setIndicator(true)
        } else {

            for (let i = 0; i < postCondition.post?.data?.length; i++) {
                pages.push(postCondition.post?.data[i])

            }
            setIndicator(false)
        }
    }, [postCondition.post?.data?.length])

    useEffect(() => {
        dispatch(fetchPost(count))
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

    function nextpage(e){
        
       if(unequeCall){
            setunequeCall(false)
           setCount(count+1)
          dispatch(fetchPost(count))
            console.log(pages);
            setTimeout(()=>{
                setunequeCall(true)  
            },1000)
        }
    }

    

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
console.log(postCondition.post?.data);
    return (
        <div className='container-fluid mt-2'>
            {postCondition.loading ? <div>loading...</div> :
                <div className="row mt-md-5">
                    <div className="col-3"></div>
                    <div className="col-7">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-3 d-md-block d-none">
                                    <img src='../../public/images/146-1468295_business-man-profile-icon-business-profile-icon-png.png ' className='rounded-circle' alt="" style={{ width: '70%', aspectRatio: '1/1' }} />
                                </div>
                                <div className="col-12 d-md-none  d-block">
                                    <div className='d-flex justify-content-center '>
                                        <img src='../../public/images/146-1468295_business-man-profile-icon-business-profile-icon-png.png ' className='rounded-circle' alt="" style={{ width: '70%', aspectRatio: '1/1' }} />

                                    </div>
                                </div>
                                <div className="col-9">
                                    <div className='flex '>

                                        <p style={{ fontSize: '130%' }}>{profileDetails.firstName}</p>
                                        <button className='flex  ms-5  bg-darkGreen btn hover:bg-darkGreen text-white' > <AiFillMessage className='mt-1' /> Messages</button>
                                    </div>
                                    <div className="container-fluid">
                                        <div className="row mt-3">
                                            <div className="col-3">
                                                <p>{postCondition.post?.data?.length} Posts</p>
                                            </div>
                                            <div className="col-3">
                                                <p>0 Hype</p>
                                            </div>
                                            <div className="col-3">
                                                {/* <p>0 Connections</p> */}
                                            </div>
                                            <div className="col-3"></div>
                                            <div className="col-12 mt-3 bg-green p-3 rounded">
                                                <div className=' d-flex justify-content-end'>
                                                <span className='bg-red p-1 rounded'>{profileDetails?.domain}</span>
                                                </div>
                                                <p className='text-break mb-2'> {profileDetails?.about}</p>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="col-2"></div>
                    <div className="col-12 mt-5">
                        <div className='d-flex justify-content-center'>
                            <input type="text" placeholder="Share what's in your mind" value={coment} className='m-3 email w-max border-green   border-4 rounded-lg bg-black w-8/12' onChange={(e) => { setComent(e.target.value) }} />
                            <div className='mt-3' style={{ position: 'relative' }}>
                                <AiFillFileImage className='icon text-5xl text-green' >
                                </AiFillFileImage>
                                <input type="file" id="fileIp" accept='image/*' name="" style={{ width: '30px', opacity: '0' }} onChange={loadImage} />
                            </div>
                            <div>
                                <button className='btn bg-green hover:bg-green text-white mt-4' onClick={() => { upload() }}>Post</button>
                            </div>

                        </div>
                    </div>

                    <div className="col-12 bg-dark w-12/12 h-0.5 mt-1 " ></div>
                    <div className="col-6  d-flex justify-content-end  p-2  bg-darkGreen"><BsImages className={event ? 'ml-2 text-green cursor-pointer' : 'ml-2 cursor-pointer text-red'} onClick={() => { setEvent(false) }} /></div>
                    <div className="col-6  d-flex justify-content-start  p-2 bg-darkGreen "><BsFillCalendarFill className={event ? 'ml-2 cursor-pointer text-red' : 'cursor-pointer ml-2 text-green'} onClick={() => { setEvent(true) }} /></div>
                    <div className="col-12 bg-dark w-12/12 h-0.5" ></div>
                    {event ?
                        <div className="col-12 ">
                            events
                        </div> :
                        <div className="col-12  ">
                            <div className="container-fluid">
                                <div className="row mt-2">
                                    <div className="col-md-3"> </div>
                                    <div className="col-md-6">
                                        {postCondition.post?.data?.length == 0 ? <div>no Post</div> :
                                            <> {
                                                postCondition.loading ? <div></div> :
                                                    <div className='container-fluid'>
                                                        <div className='row '>
                                                            {postCondition.post?.data?.map(obj => {
                                                                return <>
                                                                    <div className=' col-4 ' >
                                                                        <img className=' object-cover  m-2  cursor ' style={{ aspectRatio: '1 / 1' }} src={obj?.images[0]} alt="" />
                                                                    </div>
                                                                </>
                                                            }
                                                            )}
                                                        </div>
                                                    </div>
                                            }
                                            </>
                                        }
                                        <div className='w-fill d-flex justify-content-center mt-2'>
                                            {indecator ? <CgMoreR className='text-2xl text-green cursor-pointer'  onClick={(e)=>{nextpage(e)}}/> : <></>}
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            }
        </div>
    )
}

export default userProfileLanding