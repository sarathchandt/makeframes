import {configureStore} from '@reduxjs/toolkit'

import checkLoginSlice from '../slices/checkLogin.mjs'
import checkArstistSlice from '../slices/isArtist.mjs'


const store = configureStore({
    reducer : {
        checkLogin : checkLoginSlice ,
        checkArtist : checkArstistSlice,
    }
})

export default store