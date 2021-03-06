import {useState, useCallback, useEffect} from "react";
const storageName = 'userData'
export const useAuth = ()=>{
  const [token, setToken] = useState(null)
  const [userId, setUserId] = useState(null)
  const [isReady, setIsReady] = useState(false)
  const logIn = useCallback((jwtWebToken, id)=>{
    setToken(jwtWebToken)
    setUserId(id)
    localStorage.setItem(storageName, JSON.stringify({
      userId: id, token: jwtWebToken
    }))
  },[])
  const logOut = useCallback(()=>{
    setToken(null)
    setUserId(null)
    localStorage.removeItem(storageName)
  },[])

  useEffect(()=>{
    const data = JSON.parse(localStorage.getItem(storageName))
    if (data && data.token){
      logIn(data.token, data.userId)
    }
    setIsReady(true)
  },[logIn])

  return {logIn, logOut, token, userId, isReady}
}
