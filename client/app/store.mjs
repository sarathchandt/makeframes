import {configureStore} from '@reduxjs/toolkit'
import { getDefaultMiddleware } from '@reduxjs/toolkit'
import checkLoginSlice from '../slices/checkLogin.mjs'
import checkArstistSlice from '../slices/isArtist.mjs'
import fetchProgramData from '../slices/Program.mjs'
import fetchSingleProgram from '../slices/singleProgramFetch.mjs'
import takePost from '../slices/fetchPost.mjs'
import bringAllProgram from '../slices/bringAllProgram.mjs'
import fetchOnePg from "../slices/fetchProgramForBook.mjs"
import booked from '../slices/bookProgram.mjs'
import fetchBooked from '../slices/bookedDetailsFetch.mjs'
import userFetch from '../slices/fetchUserAccoutHome.mjs'

const store = configureStore({
    reducer : {
        checkLogin : checkLoginSlice ,
        checkArtist : checkArstistSlice,
        fetchProgram:fetchProgramData,
        fetchSingleProgram:fetchSingleProgram,
        takePost : takePost,
        bringAllProgram:bringAllProgram,
        fetchOnePg:fetchOnePg,
        booked:booked,
        fetchBooked:fetchBooked,
        userFetch:userFetch
    },
   middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }), 
  
})

export default store

