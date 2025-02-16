import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
    name: "company",
    initialState: {
        singleCompany: null,
        allCompanies: [],
        searchByText: ""
    },
    reducers: {
        setSingleCompany: (state, action) => {
            state.singleCompany = action.payload;
            // console.log("company data at companyslice :",state.singleJob);
        },
        setAllCompanies: (state, action) => {
            state.allCompanies = action.payload;
        },
        setSearchByText: (state, action) => {
            state.searchByText = action.payload;
        }
    }

})

export const { setSingleCompany, setAllCompanies, setSearchByText } = companySlice.actions;
export default companySlice.reducer;