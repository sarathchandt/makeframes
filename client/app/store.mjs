import {configureStore} from '@reduxjs/toolkit'

import checkLoginSlice from '../slices/checkLogin.mjs'
import checkArstistSlice from '../slices/isArtist.mjs'
import fetchProgramData from '../slices/Program.mjs'
import fetchSingleProgram from '../slices/singleProgramFetch.mjs'


const store = configureStore({
    reducer : {
        checkLogin : checkLoginSlice ,
        checkArtist : checkArstistSlice,
        fetchProgram:fetchProgramData,
        fetchSingleProgram:fetchSingleProgram
    },
    // middleware:(getDefaultMiddleware)=> getDefaultMiddleware({
    //     serializableCheck: false
    //   })
})

export default store

