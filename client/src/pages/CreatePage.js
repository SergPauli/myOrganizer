import React, {useState, useEffect, useContext} from 'react'
import { useHistory } from 'react-router-dom'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
export  const CreatePage = ()=>{
  const [link, setLink] = useState('')
  const {hRequest} = useHttp()
  // создаём кастомную историю
  const history = useHistory()
  const auth = useContext(AuthContext)
  const pressHandler = async (event) => {
    if(event.key ==='Enter'){
      try {
        const tokenStr = `Bearer ${auth.token}`
        const data = await hRequest('api/links/generate', 'POST', {from: link},
         {'Authorization':  tokenStr, 'Content-Type': 'application/json;charset=utf-8'})
          history.push(`/detail/${data.link._id}`)
      } catch (e) {

      }
    }
  }
  useEffect(()=>{
    window.M.updateTextFields()
  },[])
    return (
      <div className="row">
       <div className="col s12 m10 l8  offset-m1 offset-l2">
         <div className="input-field default-top-margin" >
           <input id="link"
           type="text" value={link}
           onChange={(e)=>setLink(e.target.value)}
           onKeyPress={pressHandler}></input>
           <label htmlFor="link">Вставте ссылку</label>
         </div>
       </div>
      </div>
    )
}
