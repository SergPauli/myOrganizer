import React from 'react'
import 'materialize-css'
import {useRoutes} from './routes'
import {NavBar} from './componets/NavBar'
import {Loader} from './componets/Loader'
import {useAuth} from './hooks/auth.hook'
import {AuthContext} from './context/AuthContext'

const App =()=> {
  const {logIn, logOut, token, setUserId, isReady} = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)

  if (!isReady) {
    return (<Loader />)
  }

  return (
    <AuthContext.Provider value ={{
        logIn, logOut, token,
        setUserId, isAuthenticated}}>
        { isAuthenticated && <NavBar /> }
        <div className='container'>
          {routes}
        </div>
    </AuthContext.Provider>
  )
}

export default App;
