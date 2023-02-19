import React,{useEffect, useState} from 'react'
import { useSearchParams } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import {fetchSingleProgram} from '../../../slices/singleProgramFetch.mjs'
import axios from 'axios'
import { UURL } from '../../../API/apiCall.js'

function SingleProgram() {


   const [program, setProgram] = useState([])
  const [searchParams] = useSearchParams()
  const singleProgram = useSelector(state=>state.fetchSingleProgram)
  const dispatch = useDispatch()
  console.log(program);
  useEffect(()=>{
    axios.post(`${UURL}takeSingleProgram`,{id:searchParams.get('id')}).then(result=>{
      setProgram(result)
      dispatch(fetchSingleProgram(searchParams.get('id')))
      
     })
  
  },[])
  return (
    <div>
     {singleProgram.loading ? <div>loading</div> : 

       <div className="container-fluid">
        <div className="row">
          <div className=" p-5 col-md-6">
         { singleProgram.loading ? <div>loading..</div>:   <video src={program.data?.vdoFile}  width="100%"  controls /> }
         <h1 className='text-green font-extrabold text-uppercase p-2' style={{fontSize:'20px'}}>{program.data.name}</h1>
          </div>
          <div className="col-md-6">
            <div className="container-fluid">
              <div className="row d-flex justify-content-center">
               { singleProgram.loading ? <div>loading...</div> : 
               program.data.imageArray.map(objImg=>{
                 return <>
                  <div className=" d-md-block d-none col-6 pt-5">
                    <img src={objImg} className='object-cover' style={{width:'80%', height:'50%'}}  alt="" />
                  </div> 
                  <div className=" d-md-none col-6 pt-5">
                    
                    <img src={objImg} className='object-cover' style={{width:'80%', height:'50%'}}  alt="" />
                  </div> 
                 
                  </>
               }) 
             
              }
              </div>
              
            </div>
          </div>
        </div>
      </div>
      }
      {singleProgram.loading ? <div>loading</div> : 
      <div className="container-fluid">
        <div className="row">

        <h1 className='d-flex justify-content-center font-extrabold text-red mt-1'>DESCRIPTION</h1>
          <div className="d-flex justify-content-center col-12">
          
            
            <p>{program.data.description}</p>
          </div>
        </div>
      </div>
}

    </div>
          
  )
}

export default SingleProgram