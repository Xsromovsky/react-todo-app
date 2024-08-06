import React, { ReactElement, ReactNode } from 'react'
import useAuthContext from '../hooks/useAuthContext'
import { Navigate, Route, RouteProps } from 'react-router-dom'

interface ProtectedRouteProps{
    element: ReactNode;
}


type Props =  {
    element: ReactElement
}

const ProtectedRoute = (props: Props) => {
    const authContext = useAuthContext()

    if(!authContext.accessToken){
        return <Navigate to='/'/>
    }

  return props.element
}

export default ProtectedRoute