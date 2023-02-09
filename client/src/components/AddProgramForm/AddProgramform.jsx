import React, { useState, useEffect } from 'react'
import fetch from 'isomorphic-fetch';
import axios from 'axios';
import './AddProgram.css'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { IoIosRemoveCircle } from "@react-icons/all-files/io/IoIosRemoveCircle.esm"
import { UURL } from '../../../API/apiCall';





function AddProgramform() {




    const [date, setDate] = useState((new Date()))
    const [mapDates, setMapDates] = useState([])

    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    const [amount, setAmount] = useState(null)
    const [description, setDescription] = useState('')
    const [imageArray, setImageArray] = useState([])
    const [vdoFile, setVdoFile] = useState()
    const [selectedDaates, setSelectedDates] = useState([])
    const [videoUrl, setVideoUrl] = useState('')


    const uploadForm = () => {

        let details = {
            token: document.cookie,
            selectedDaates: selectedDaates,
            name: name,
            category: category,
            amount: amount,
            description: description,
            imageArray: imageArray,
            videoUrl: videoUrl
        }
        axios
            .post()
        axios.post(`${UURL}submitProgram`, details).then(result => {
            console.log(result.data);
        })




    }



    const vdoUpload = async (e) => {
     
        setVdoFile(e.target.files[0])
        console.log(e.target.files[0].name);
        const data = new FormData()
        data.append('file', vdoFile)
        data.append("upload_preset", 'nefiqdoa')
        await axios.post(`https://api.cloudinary.com/v1_1/dyn6m4tou/video/upload`, data).then(res => {
            setVideoUrl(res.data.secure_url)
        }).catch(err => console.log(err))


    }

    const imageUpload = async (e) => {

        for (let i = 0; i < e.target.files.length; i++) {
        
            console.log(e.target.files[i]);
            const data = new FormData()
            data.append('file',e.target.files[i] )
            data.append("upload_preset", 'nefiqdoa')
            await axios.post(`https://api.cloudinary.com/v1_1/dyn6m4tou/image/upload`,data).then(res=>{
                imageArray.push(res.data.secure_url)
            })
        }

    }


    useEffect(() => {

        if (selectedDaates.length == 0) {
            setSelectedDates([...selectedDaates, date])
            setMapDates([...mapDates, { date: date.toString().split(' '), key: Date.now() }])
        } else {
            new Promise((resolve, reject) => {
                let set = {}
                console.log(date.toISOString().slice(0, 10) < selectedDaates[0].toISOString().slice(0, 10));
                for (let i = 0; i < selectedDaates.length; i++) {
                    if (date.toISOString().slice(0, 10) == selectedDaates[i].toISOString().slice(0, 10)) {
                        set.set = true
                        break;
                    } else {
                        set.set = false
                    }
                    resolve(set)
                }
            }).then((result) => {
                if (result.set) {
                } else {
                    setSelectedDates([...selectedDaates, date])
                    setMapDates([...mapDates, { date: date.toString().split(' '), key: Date.now() }])
                }
            })
        }
    }, [date])
    return (
        <>
            <div className='container-fluid' >
                <div className="row bg-lightGreen p-4 text-black mb-4 mt-5">
                    <div className="col-md-3 d-flex justify-content-center mb-4  ">
                        <h6 style={{ fontSize: '20px' }} className='text-uppercase' >  Terms & Conditions</h6>
                    </div>
                    <div className="col-md-9  scroll-object ">
                        <p>Lorem ipsum dolo Lorem ipsumuseEffect
                            dolor sit, amet consectetur adipisicing elit. Corporis, dolorum fugit non eius possimus odit veniam eveniet esse autem quibusdam optio odio temporibus exercitationem quas a accusantium, ratione necessitatibus tempora. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime culpa placeat consequuntur deserunt inventore sequi facilis, consectetur, molestiae at ullam adipisci voluptatum quod tempore rem soluta deleniti numquam id necessitatibus. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque minima praesentium cum, consequuntur earum doloremque dolor alias eius laudantium porro repudiandae, unde dolorem illo non sint voluptatibus aspernatur maxime necessitatibus? Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, molestiae assumenda. Voluptatum velit excepturi tempore, iusto unde doloribus placeat iste, nulla harum consectetur sit asperiores debitis molestias, quisquam officiis error? Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur aperiam iusto ad sint quasi quae dolore totam tenetur fugit perferendis iste animi, reiciendis officia blanditiis quaerat rem! Expedita, obcaecati harum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere eum nihil necessitatibus provident dolorum excepturi perferendis, architecto nesciunt quia ipsum iusto quasi corrupti accusantium laborum eveniet aliquam non eos saepe? Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos consequuntur mollitia molestiae provident quod dolorem voluptate laborum? Accusantium aliquam libero saepe odit officia labore. Temporibus debitis maiores beatae vitae molestias. Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur saepe minima id, similique omnis earum placeat iste dolor! Repellendus eius amet ea quidem tempora perspiciatis, deleniti cupiditate soluta blanditiis excepturi? r sit amet consectetur adipisicing elit. Totam quos rerum tempore aut molestiae sint reprehenderit eius possimus, natus cumque eos nulla asperiores ad laudantium molestias aliquid sequi optio illo!loglor Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsa optio aperiam laudantium obcaecati quasi dolores et nam sed, expedita voluptates at sint exercitationem impedit quidem cum natus quisquam quaerat modi. Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero facilis natus autem omnis cum nam expedita eius quis, maiores quae praesentium corrupti sed rem dicta quod laudantium nesciunt ipsam eligendi.</p>
                    </div>
                </div>
            </div>

            <div className="container-fluid d-md-block d-none">
                <div className="row">
                    <div className="col-12 d-flex justify-content-center">
                        <div className='d-md-block d-none'>
                            <input type="text" className='  email w-max  border-darkGreen  border-4 rounded-lg bg-black mr-1 ' value={name} placeholder='Name Of The Program' onChange={(e) => { setName(e.target.value) }} />
                            <select name="" id="" className='email w-max  border-darkGreen mr-1  border-4 rounded-lg bg-black ' onClick={(e) => { setCategory(e.target.value) }}>
                                <option value="" style={{ display: 'none' }} >Choose Category</option>
                                <option value="Drama">Drama</option>
                                <option value="Skit">Skit</option>
                                <option value="Song">Song</option>
                                <option value="Mimicry">Mimicry</option>
                            </select>
                            <input type="number" className='  email w-max  border-darkGreen  border-4 rounded-lg bg-black mr-1 ' placeholder='Amount Per Show' value={amount} onChange={(e) => { setAmount(e.target.value) }} />
                        </div>
                    </div>


                    <div className="col-12  d-flex justify-content-center">
                        <input type="text" style={{ width: '717px' }} className=' mt-2  email   border-darkGreen  border-4 rounded-lg bg-black mr-1 ' placeholder='Description About Program' value={description} onChange={(e) => { setDescription(e.target.value) }} />

                    </div>
                    <div className="col-12   d-flex justify-content-center text-black">
                        <input type="file" style={{ width: '717px' }} className=' mt-2  email   border-darkGreen  border-4 rounded-lg bg-black mr-1 ' accept="image/*" multiple onChange={imageUpload} />
                        <div className='pos'>
                            <p className='upload-img text-white' >Upload Images</p>
                        </div>
                    </div>
                    <div className="col-12   d-flex justify-content-center ">
                        <input type="file" style={{ width: '717px' }} className=' mt-2  email text-black  border-darkGreen  border-4 rounded-lg bg-black mr-1 ' accept="video/*" onChange={vdoUpload} />
                        <div className='pos'>
                            <p className='upload-img text-white' >Upload Videos</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid d-md-none d-block">
                <div className="row">
                    <div className="col-12 ">
                        <input type="text" className=' m-1  email w-fill  border-darkGreen  border-4 rounded-lg bg-black  ' placeholder='Name Of The Program' onChange={(e) => { setName(e.target.value) }} /> <br />
                        <select name="" id="" className='email m-1 w-fill  border-darkGreen mr-1  border-4 rounded-lg bg-black ' onClick={(e) => { setCategory(e.target.value) }}>
                            <option value="" style={{ display: 'none' }}>Choose Category</option>
                            <option value="Drama">Drama</option>
                            <option value="Skit">Skit</option>
                            <option value="Song">Song</option>
                            <option value="Mimicry">Mimicry</option>
                        </select> <br />
                        <input type="number" className='  email w-fill  border-darkGreen  border-4 rounded-lg bg-black  m-1 ' placeholder='Amount Per Show' value={amount} onChange={(e) => { setAmount(e.target.value) }} />
                        <input type="text" className='   email   border-darkGreen  border-4 rounded-lg bg-black w-fill m-1 ' placeholder='Description About Program' value={description} onChange={(e) => { setDescription(e.target.value) }} />
                        <input type="file" className='   email   border-darkGreen  border-4 rounded-lg bg-black text-black m-1 w-fill ' accept="image/*" multiple onChange={imageUpload} />
                        <input type="file" className='   email   border-darkGreen  border-4 rounded-lg bg-black text-black m-1 w-fill ' accept="video/*" onChange={vdoUpload} />

                    </div>
                </div>
            </div>


            <div className="container mt-5 ">
                <div className="row  d-flex justify-content-center mb-3">
                    <div className='col-12 d-flex justify-content-center  '> Pick Busy Dates</div>
                    <Calendar onChange={setDate} value={date} />
                </div>
                <div className="col-12 mt-5 mb-2  d-flex justify-content-center  ">
                    <h1>Selected Dates</h1>
                </div>


                {
                    mapDates.map((dates) =>

                        <div className=' col-12  d-flex justify-content-center mb-3 p-1 rounded-md' key={dates.key}>
                            <p className=' flex  bg-darkGreen text-white hover:bg-darkGreen cursor-auto  justify-content-center col-11' style={{ width: '200px' }}> {dates.date[0]}   {dates.date[1]}  {dates.date[2]}  {dates.date[3]} <div className='flex justify-content-end col-1'> <IoIosRemoveCircle className="mt-1 ml-1 cursor-pointer " /></div></p>
                        </div>
                    )
                }
                <div className='d-flex justify-content-center mt-5 mb-3'>
                    <button className='btn bg-darkGreen text-white hover:bg-red' onClick={uploadForm}>Upload Program</button>
                </div>

            </div>
        </>
    )
}

export default AddProgramform