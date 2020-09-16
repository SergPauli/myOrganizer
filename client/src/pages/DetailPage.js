import React, {useState, useCallback, useEffect, useContext} from 'react'
import {useParams} from 'react-router-dom'
import {Loader} from '../componets/Loader'
import {LinkCard} from '../componets/LinkCard'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
export const DetailPage = ()=> {
  const [link, setLink] = useState(null)
  const linkId = useParams().id
  const routStr = `http://localhost:3000/api/links/${linkId}`
  const {hRequest, loading} = useHttp()
  const {token} = useContext(AuthContext)
  const tokenStr = `Bearer ${token}`
  const getLink = useCallback( async ()=>{
    try {
      const fetched = await hRequest(routStr,'GET',null,{'Authorization':  tokenStr})
      setLink(fetched)
    } catch (e) {
      console.log(e.message)
    }
  },[tokenStr, hRequest, routStr])
  useEffect(()=>{getLink()}, [getLink])
  if(loading) {
    return (<Loader />)
  }
    return (
      <>
       {!loading && link && <LinkCard link={link} />}
      </>
    )
}
