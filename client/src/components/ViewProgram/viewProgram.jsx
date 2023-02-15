import React, { useEffect, useState } from 'react'
import { createSearchParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPrograms } from '../../../slices/Program.mjs'
import './viewProgram.css'

function viewProgram() {

  const navigate = useNavigate()
  const programs = useSelector(state => state.fetchProgram)
  const dispatch = useDispatch()

  function gotoProgram(id) {
    navigate({
      pathname: '/viewSingleProgram',
      search: createSearchParams({
        id: id
      }).toString()
    })
  }


  useEffect(() => {
    dispatch(fetchPrograms())
    programs.programs.data.length == 0 ? Swal.fire({
      title: 'OOPS !',
      text: 'Please add Programs',
      imageWidth: 400,
      imageHeight: 200,
      confirmButtonText: 'Add Program',
      confirmButtonColor: '#021710'
    }).then(res=>{
    res.isConfirmed == true ? navigate('/addPrograms') : navigate('/profetionalProfile');
  }):console.log(true);
  }, [])



  return (

    <div>
      <div className="container-fluid">
        <div className="row">
          {
            programs.loading ? <div>nothing</div> : programs.programs.data.map(obj => {
              return <>
                <div className="col-md-6 mt-3 d-flex justify-content-center cursor" onClick={() => {
                  gotoProgram(obj._id)
                }}>
                  <img src={obj.imageArray[0]} className=' w-fill mt-5 p-4 w-70 ' alt="Image Of Program" />
                </div>
                <div className="col-md-6 cursor" onClick={() => {
                  gotoProgram(obj._id)
                }}>
                  <div className='d-md-block d-none'>
                    <h1 className='text-green text-uppercase font-extrabold mt-20' style={{ fontSize: '30px' }}>{obj.name}</h1>
                    <p className='text-red text-uppercase font-bold'  >{obj.category}</p>
                    <p className='p-5'>{obj.description}</p>
                  </div>
                  <div className='d-md-none d-block mb-5'>
                    <h1 className='d-flex justify-content-center text-green text-uppercase font-extrabold ' style={{ fontSize: '30px' }}>{obj.name}</h1>
                    <p className='d-flex justify-content-center text-red text-uppercase font-bold'  >{obj.category}</p>
                    <p className=' d-flex justify-content-center'>{obj.description}</p>
                  </div>
                </div>
              </>
            })
          }
        </div>
      </div>
    </div>
        
        )
}

export default viewProgram