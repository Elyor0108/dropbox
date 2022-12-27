import React from "react"
import { useAuth } from "./AuthComponent"
import { Route, Redirect } from "react-router-dom"

export default function Routeprvt({ component: Component, ...rest }) {
  const { currentUser } = useAuth()

  return (
    <Route
      {...rest}
      render={props => {
        return (
          currentUser ? <Component {...props} /> : <Redirect to="/login" />
        )
}}
    ></Route>
  )
}
