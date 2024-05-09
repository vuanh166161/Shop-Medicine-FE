import React, { Fragment, useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { routes } from './routes/index'
import DefaultComponent from './components/DefaultComponent/DefaultComponent'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { isJsonString } from './utils'
import { jwtDecode } from "jwt-decode";
import * as UserService from './services/UserService'
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from './redux/slides/userSlice'



function App() {
const dispatch = useDispatch();
const user = useSelector((state) => state.user)
  
useEffect(() => {
    const {storageData, decoded} = handleDecoded()
        if(decoded?.id) {
            handleGetDetailsUser(decoded?.id, storageData)
        }
    
    
  },[])

  const handleDecoded = () => {
    let storageData = localStorage.getItem('access_token')
    let decoded = {}
    if(storageData && isJsonString(storageData)) {
      storageData =JSON.parse(storageData)
        decoded = jwtDecode(storageData);
    }
    return {decoded,storageData}
  }

  UserService.axiosJWT.interceptors.request.use( async (config) => {
    const currentTime = new Date()
    const { decoded} = handleDecoded()
    if(decoded?.exp < currentTime.getTime() / 1000) {
      const data = await UserService.refreshToken()
      config.headers['token'] = `Bearer ${data?.access_token}`
    }
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

  const handleGetDetailsUser = async (id, token) => {
    // let storageRefreshToken = localStorage.getItem('refresh_token')
    // const refreshToken = JSON.parse(storageRefreshToken)
    const res = await UserService.getDetailsUser(id, token)
    dispatch(updateUser({...res?.data, access_token: token}))
}

  return (
    <div>
      <Router>
        <Routes>
          {routes.map((route) => {
            const Page = route.page
            const isCheckAuth = !route.isPrivate || user.isAmin
            const Layout = route.isShowHeader ? DefaultComponent : Fragment
            return (
              <Route key={route.path} path={isCheckAuth && route.path} element={
                <Layout>
                  <Page />
                </Layout>
              } />
            )
          })}
        </Routes>
      </Router>
    </div>
  )
}
export default App