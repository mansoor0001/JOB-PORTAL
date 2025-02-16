import { createSlice } from "@reduxjs/toolkit";
import { setSearchByText } from "./companySlice";


const jobSlice = createSlice({
    name: "job",
    initialState: {
        allJobs: [],
        singleJob: null,
        allAdminJobs: [],
        searchJobByText: "",
        searchQuery: null,
        filterQuery: null,
    },
    reducers: {
        setAllJobs: (state, action) => {
            state.allJobs = action.payload;

        },
        setSingleJob: (state, action) => {
            state.singleJob = action.payload;
        },
        setAllAdminJobs: (state, action) => {
            state.allAdminJobs = action.payload;
        },
        setSearchJobByText: (state, action) => {
            state.searchJobByText = action.payload;
        },
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        },
        setFilterQuery: (state, action) => {
            state.filterQuery = action.payload;
        }

    }
})

export const { setAllJobs, setSingleJob, setAllAdminJobs, setSearchJobByText, setSearchQuery, setFilterQuery } = jobSlice.actions;
export default jobSlice.reducer;