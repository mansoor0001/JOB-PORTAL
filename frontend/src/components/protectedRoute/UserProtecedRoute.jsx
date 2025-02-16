import store from '@/redux/store/store';
import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';

function UserProtectedRoute({ children, requiredRole }) {
    const { user } = useSelector(store => store.auth)
    if (user === null || user?.data?.role !== "student") {
        return <Navigate to="/admin/companies" />
    }

    return children;
}

export default UserProtectedRoute