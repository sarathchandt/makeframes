import React,{useEffect} from 'react'
import { useSearchParams } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import {fetchSingleProgram} from '../../../slices/singleProgramFetch.mjs'

function SingleProgram() {
  const [searchParams] = useSearchParams()
  const singleProgram = useSelector(state=>state.fetchSingleProgram)
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(fetchSingleProgram(searchParams.get('id')))
    console.log(singleProgram);
  },[])
  return (
    <div>

    </div>
  )
}

export default SingleProgram