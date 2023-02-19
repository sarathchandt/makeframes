import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { fetchOneProgram } from '../../../slices/fetchProgramForBook.mjs'
import Map, { GeolocateControl, Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";


function viewOneBook() {

    const [events, setEvent] = useState([])
    const [viewport, setViewport] = useState({});
    const [mark, setMark] = useState({})
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [address, setAddress] = useState('');
    const [mob,setMob] = useState()


    const [searchParams] = useSearchParams()
    const dispatch = useDispatch()
    const fetchedPg = useSelector(state => state.fetchOnePg)
    const localizer = momentLocalizer(moment);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((pos) => {

            setViewport({
                ...viewport,
                latitude: pos.coords.latitude,
                longitude: pos.coords.longitude,
                zoom: 3.5,
            })
          
        })
    }, [])

    function putSetMark(e){
        console.log(e);
        setMark({...mark,
            latitude:e.lngLat.lat,
            longitude: e.lngLat.lng, 
            zoom: 3.5, })
    }
console.log(mark);

    useEffect(() => {
        fetchedPg.program.data?.selectedDaates.forEach(item => {
            events.push({
                title: 'Event ',
                start: new Date(item),
                end: new Date(item),
                allDay: true,
            })
            fetchedPg.loading ? setEvent([]) : null;
        })
    }, [fetchedPg.loading])


    useEffect(() => {
        dispatch(fetchOneProgram(searchParams.get('id')))
    }, [])


    return (
        <div>

            {
                fetchedPg.loading && viewport.latitude && viewport.longitude ? <>loading..</> : viewport.latitude && viewport.longitude && (
                    <>

                        <div className="container-fluid mt-5">
                            <div className="row">
                                <div style={{ fontSize: '20px' }} className="col-12 mb-5 ps-5 pe-5 text-uppercase text-green font-bold   d-flex justify-content-md-start  justify-content-center">
                                    <h1 className='text-break ' >{fetchedPg.program.data.name}</h1>
                                </div><br /><br />
                                <div className=" col-md-6 d-flex justify-content-md-end  justify-content-center ">
                                    <video src={fetchedPg.program.data.vdoFile} className='' style={{ width: '80%' }} controls />
                                </div>
                                <div className="col-md-4 p-md-0 p-5">
                                    <div className="container-fluid">
                                        <div className="row  ">
                                            {fetchedPg.loading ? <></> : fetchedPg.program.data?.imageArray.map(obj => {
                                                return <>
                                                    <div className="col-6 mt-md-0 mt-4 mb-md-0  ">
                                                        <img src={obj} alt="img" className='object-cover' style={{ aspectRatio: '2/1' }} />
                                                    </div>
                                                </>
                                            })
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-2"></div>
                                <div className="col-md-2"></div>

                                <div className="col-md-8 mt-3 mt-md-5 ps-5 d-flex justify-content-start mb-2 ">
                                    <h6 className='text-uppercase fw-bold' style={{ fontSize: '100%' }} >description</h6>
                                </div>
                                <div className="col-md-2"></div>

                                <div className="col-md-2"></div>
                                <div className="col-md-8">
                                    <p className='text-break  ' style={{ fontSize: '15px' }} >{fetchedPg.program.data.description}</p>
                                    <p className='text-break  text-red '>Amount Per Show <b> {fetchedPg.program.data.amount.toLocaleString()} /-</b> Only</p>
                                </div>
                                <div className="col-md-2"></div>
                                <div className="col-12 d-flex justify-content-center mt-5 ">
                                    <Calendar
                                        onSelectEvent={event => alert(event.title)}
                                        localizer={localizer}
                                        defaultDate={new Date()}
                                        events={events}
                                        defaultView="month"
                                        style={{ height: "400px", width: '400px' }}
                                    />

                                </div>
                                <div className='col-12 d-flex justify-content-center mt-2' ><div className='text-red  me-1 bg-red rounded' style={{ width: '25px', height: '25px' }}></div>The artist is busy at marked dates</div>
                                <div className="col-md-3"></div>
                                <div className="col-md-6 bg-darkGreen gb-opacity-1 mt-5 rounded">
                                    <div className='d-flex justify-content-center'>
                                        <h1 className='mt-2 text-bold' style={{ fontSize: '20px' }}>Fill the form to book</h1><br />
                                    </div>
                                    <div className='d-flex justify-content-center mt-4'>
                                        <label htmlFor="date">Select Date</label>
                                    </div>
                                    <div className='d-flex justify-content-center'>
                                        <input type="date" className='ms-3 me-3 mb-3 email w-fill text-black  border-4 rounded-lg bg-lightGreen ' />
                                    </div>
                                    <div className='d-flex justify-content-center '>
                                        <label htmlFor="date">Select Time</label>
                                    </div>
                                    <div className='d-flex justify-content-center'>
                                        <input type="time" className='ms-3 me-3 mb-3 email w-fill text-black   border-4 rounded-lg bg-lightGreen  ' />
                                    </div>
                                    <div className='d-flex justify-content-center '>
                                        <label htmlFor="date">Full address of the stage</label>
                                    </div>
                                    <div className='d-flex justify-content-center'>
                                        <input type="text" className='ms-3 me-3 mb-3 email w-fill text-black  border-4 rounded-lg bg-lightGreen  ' />
                                    </div>
                                    <div className='d-flex justify-content-center '>
                                        <label htmlFor="date">Share the stage location</label>
                                    </div>
                                    <div className='d-flex justify-content-center ' >
                                     <div  className='ps-4 pe-4 pb-4 rounded' style={{ width:'100%', height: '300px' }}>
                                        <Map
                                            
                                            mapboxAccessToken=
                                            initialViewState={viewport}
                                            mapStyle="mapbox://styles/mapbox/streets-v11"
                                            onClick={(e) => { putSetMark(e) }}
                                        >
                                            <Marker
                                                longitude={viewport.longitude}
                                                latitude ={viewport.latitude} />
                                            <Marker
                                                latitude={ mark.latitude? mark.latitude:null }
                                                longitude={ mark.longitude ?mark.longitude:null  } />
                                                
                                            <GeolocateControl
                                                positionOptions={{ enableHighAccuracy: true }}
                                                trackUserLocation={true}
                                            />
                                        </Map>
                                        </div>
                                    </div>
                                    <div className='d-flex justify-content-center '>
                                        <label htmlFor="date">Mobile number</label>
                                    </div>
                                    <div className='d-flex justify-content-center'>
                                        <input type="number" className='ms-3 me-3 mb-3 email w-fill text-black  border-4 rounded-lg bg-lightGreen  ' />
                                    </div>
                                    <div className='d-flex justify-content-center '>
                                        <button className='btn bg-green hover:bg-red text-white mb-5' >Book now</button>
                                    </div>

                                </div>
                                <div className="col-md-3"></div>
                            </div>
                        </div>
                    </>
                )
            }


        </div>
    )
}

export default viewOneBook