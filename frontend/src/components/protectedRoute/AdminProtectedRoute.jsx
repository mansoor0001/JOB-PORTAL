import store from '@/redux/store/store';
import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';

function AdminProtectedRoute({ children, requiredRole }) {
    const { user } = useSelector(store => store.auth)
    console.log(user);
    
    if (user === null || user?.data?.role !== "recruiter") {
        return <Navigate to="/" />
    }

    return children;
}

export default AdminProtectedRoute