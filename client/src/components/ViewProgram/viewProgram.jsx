import React, { useEffect, useState } from 'react'
import { createSearchParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPrograms } from '../../../slices/Program.mjs'
import './viewProgram.css'
import axios from 'axios';
import { UURL } from '../../../API/apiCall.js';

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
    axios.post(`${UURL}viewPrograms`, { token: document.cookie }).then(res => {
      res.data.length == 0 ? Swal.fire({
        title: 'OOPS !',
        text: 'Please add Programs',
        imageWidth: 400,
        imageHeight: 200,
        confirmButtonText: 'Add Program',
        confirmButtonColor: '#021710'
      }).then(res => {
        res.isConfirmed == true ? navigate('/addPrograms') : navigate('/profetionalProfile');
      }) : console.log(true);
    })
  }, [])



  return (

    <div>
       {
           programs.loading ? <div>nothing</div> :
      <div className="container-fluid  p-5">
        <div className="row">
          <div className="col-12">
            <table className="table text-white" style={{ width: '100%' }} >
              <thead className='' >
                <tr>
                  <th scope="col"></th>
                  <th scope="col">Details</th>
                  <th scope="col">Amount</th>

                  <th scope="col">Category</th>
                  <th scope="col">Handle</th>
                </tr>
              </thead>
              <tbody>
              {programs.programs.data.map(obj=>{
                  return <>
              
                <tr>
                  <th scope="row"></th>
                  <td>
                  <img src={obj.imageArray[0]} className=' object-cover    p-1 w-70 ' style={{width:'150px', height:'150px'}} alt="Image Of Program" />
                  <h1 className='text-green text-uppercase font-extrabold ' style={{ fontSize: '20px',wordWrap: 'break-word' }}>{obj.name}</h1>                  </td>
                  <td className='text-red'>{obj.amount ?  obj.amount.toLocaleString():null} /-</td>

                  <td>{obj.category}</td>
                  <td>
                    <button className='btn bg-darkGreen text-white hover:bg-darkGreen m-1'onClick={() => {
                  gotoProgram(obj._id)
                }}>Go to</button>
                    <button className='btn bg-red text-white hover:bg-red m-1' >Block program </button>
                  </td>
                </tr>
                </> }) }
              </tbody>
            </table>
          </div>
        </div>
      </div>
}
    </div>


             

  )
}

export default viewProgram