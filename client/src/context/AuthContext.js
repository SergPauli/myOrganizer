import {createContext} from "react"
function noop(){} // костыль "пустая функция"
export const AuthContext = createContext({
  token: null,
  userId: null,
  logIn: noop(),
  logOut: noop(),
  isAuthenticated: false
})
