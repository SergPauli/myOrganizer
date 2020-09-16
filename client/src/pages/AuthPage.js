import React, {useState, useEffect, useContext} from "react";
import {useHttp} from '../hooks/http.hook';
import {useMessage} from '../hooks/message.hook';
import {AuthContext} from '../context/AuthContext'
export const AuthPage = ()=> {
    const message = useMessage()
    const {loading,  hRequest, error, clearError} = useHttp()
    const [form, setForm] = useState({
      email:"", password:""
    })
    const auth = useContext(AuthContext)
    useEffect(() => {
      message(error)
      clearError()
    }, [error, message, clearError])

    useEffect(()=>{
      window.M.updateTextFields()
    },[])

    const changeHandler = event => {
      setForm({...form, [event.target.name]: event.target.value})
    }
    const registerHandler = async () => {
      try {
        const data = await hRequest('api/auth/register','POST', {...form})
        message(data.message)
      } catch (e) {
        // все уже обработано
      }
    }
    const loginHandler = async () => {
      try {
        const data = await hRequest('api/auth/login','POST', {...form})
        auth.logIn(data.token, data.userId)
        message(data.message)
      } catch (e) {
        // все уже обработано
      }
    }
    return (
      <div className = "row">
        <div className="col s12 m10 l8 xl6 offset-m1 offset-l2 offset-xl3">
          <h1 className="flow-text">MERN-стэк приложение</h1>
          <div className="card blue darken-1">
            <div className="card-content white-text">
              <span className="card-title flow-text">Авторизация</span>
              <div >
                <div className="input-field">
                  <input id="email" name="email"
                  type="text" className="yellow-input"
                  onChange={changeHandler} value={form.email}></input>
                  <label htmlFor="email">Email</label>
                </div>
                <div className="input-field">
                  <input id="password" name="password"
                  type="password" className="yellow-input"
                  onChange={changeHandler} value={form.password}></input>
                  <label htmlFor="password">Password</label>
                </div>
              </div>
            </div>
            <div className="card-action">
              <button className='btn yellow darken-4 default-margin'
                      disabled={loading}
                      onClick={loginHandler}>Войти</button>
              <button className='btn grey lighten-1 black-text'
                      onClick={registerHandler}
                      disabled={loading}>Регистрация</button>
            </div>
        </div>
       </div>
      </div>
    )
}
