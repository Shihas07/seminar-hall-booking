
import { createSlice } from "@reduxjs/toolkit";


export const booking=createSlice({
     name:"seminar_hall_booking",
     initialState:{bookings:[]},

        reducers:{
           addBooking:((state,action)=>{
            state.bookings.push(action.payload)

           }),
        }
})


export const {addBooking}=booking.actions;

export default booking.reducer;