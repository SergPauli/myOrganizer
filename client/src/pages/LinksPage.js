import React, {useState, useEffect, useCallback, useContext} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {Loader} from '../componets/Loader'
import {LinksList} from '../componets/LinksList'
export const LinksPage = ()=>{
  const [links, setLinks] = useState([])
  const {hRequest, loading} = useHttp()
  const {token} = useContext(AuthContext)
  const tokenStr = `Bearer ${token}`
  const fetchList = useCallback( async ()=>{
    try {
      const fetched = await hRequest('/api/links/', 'GET',null, {'Authorization': tokenStr})
      setLinks(fetched)
    } catch (e)
    { console.log(e.message) }
  },[tokenStr, hRequest]  )
  useEffect(()=>{fetchList()}, [fetchList] )
  if(loading) {
    return (<Loader />)
  }
    return (
      <>
       {!loading && links && <LinksList links={links} />}
      </>
    )
}
