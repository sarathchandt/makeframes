import React, { useEffect, useState } from 'react'
import './landingHome.css'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserDetails } from '../../../slices/fetchUserAccoutHome.mjs'
function LandingHome() {

  const [category, setCategory] = useState(['Director','Actor','nothing'])
  const dispatch = useDispatch()
  const usersAcc = useSelector(state => state.userFetch)

  useEffect(() => {
    dispatch(fetchUserDetails())
  }, [])

  console.log(usersAcc, 'll');

  const navigate = useNavigate()
  return (
    <div  >
      
      {usersAcc.loading ? <div className='loading  '>
        <div class="loader">
          <div class="loader-wheel"></div>
          <div class="loader-text"></div>
        </div>
      </div> :
        <div>
          <div className={usersAcc.loading ? 'blur' : ''}>
            <img src="../../../public/images/heightstour123rnational-tour-company.jpg" className=' mt-5 object-fit w-full h-6/12 object-cover' alt="" />
          </div>
          <div className='d-flex justify-content-end'>
            <button className=' p-1 m-2 bg-green rounded hover:bg-red' onClick={() => { navigate('/viewStageProgramUser') }}>Book Stage Shows</button>
          </div>
            {category.map(cate=>{
              return <>
          <h1 className='m-2'>Top {cate}</h1>
          <div className=" flex scrollEffect" style={{ width: '100%' }}>
            {
              usersAcc.users.data.map(obj => {
                return <>
                  {obj?.domain == `${cate}` ?
                    <div>
                      <div className='bg-dark m-2  rounded  w-40  '>
                        <img src={obj?.dpimage ?obj?.dpimage : '../../public/images/146-1468295_business-man-profile-icon-business-profile-icon-png.png' } className='p-2 w-12/12  rounded-circle object-cover' style={{aspectRatio:'1/1'}} alt="" />
                        <div className='d-flex justify-content-center'>
                          <p className=' text-xl'>{obj?.firstName}</p>
                        </div>
                        <div className='d-flex justify-content-center'>
                          <button className='btn bg-darkGreen text-white hover:bg-green mb-3 mt-1 '>View profile</button>
                        </div>
                      </div>
                    </div> : <></>}
                </>
              })
            }
          </div>
          </>})}
        </div>
      }
    </div>



  )
}

export default LandingHome