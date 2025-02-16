import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        loading: false,
        user: null
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
            if (state.user && Object.keys(state.user).length > 0) {
                localStorage.setItem("user", JSON.stringify(action.payload));
            }
            // state.user = JSON.parse   (localStorage.getItem("user")) ;
            // console.log("At authslice : ",state.user);

        }
    }
})

export const { setLoading, setUser } = authSlice.actions;
export default authSlice.reducer;