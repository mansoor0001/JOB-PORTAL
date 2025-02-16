import { createSlice } from "@reduxjs/toolkit";

const applicantSlice = createSlice({
    name: "applicants",
    initialState: {
        jobApplicants: [],
    },
    reducers: {
        setJobApplicants: (state, action) => {
            state.jobApplicants = action.payload;
        }
    }
})

export const { setJobApplicants } = applicantSlice.actions;
export default applicantSlice.reducer