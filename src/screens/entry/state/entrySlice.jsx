import { createSlice } from "@reduxjs/toolkit";
import { checkFirstVisit, markFirstVisit } from "./entryThunk";

const initialState = {

    hasEntered :null,
    loading:true
}



const entrySlice = createSlice({
    name:"auth",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(checkFirstVisit.pending,(state)=>{
            state.hasEntered=null
            state.loading=true;
        }).addCase(checkFirstVisit.fulfilled,(state,action)=>{
             state.hasEntered = action.payload;
            state.loading=false;
        }).addCase(checkFirstVisit.rejected,(state,action)=>{
            state.hasEntered=false;
            state.loading=false;
        }).addCase(markFirstVisit.pending,(state)=>{
            state.loading=true;
        }).addCase(markFirstVisit.fulfilled,(state,action)=>{
            state.hasEntered=action.payload
            state.loading=false;
          
        }).addCase(markFirstVisit.rejected,(state,action)=>{
           
            state.loading=false;
        })
               


    }
})

export default entrySlice.reducer