import { configureStore } from "@reduxjs/toolkit"
import authReducer from "../features/authSlice"
import jobReducer from "../features/jobSlice"
import companyReducer from "../features/companySlice"
import applicantReducer from "../features/applicantsSlice"
import appliedReducer from "../features/AppliedJobs"

const store = configureStore({
    reducer: {
        auth: authReducer,
        jobs: jobReducer,
        company : companyReducer ,
        applicants : applicantReducer,
        appliedJobs : appliedReducer


    }
})

export default store 