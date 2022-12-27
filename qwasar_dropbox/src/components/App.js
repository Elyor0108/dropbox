import React from "react"
import Login from './AuthPage/Login.js'
import Signup from "./AuthPage/Signup"
import Profile from "./AuthPage/Profile.js"
import Panel from "./UsePage/PanelDash"
import Routeprvt from "./AuthPage/Routers"
import ResetPassword from "./AuthPage/ResetPassword"
import UpdateProfile from "./AuthPage/UpdateProfile"
import { AuthProvider } from "./AuthPage/AuthComponent"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

export default function App() {
  return (
     <Router>
     <AuthProvider>
       <Switch>
         {/* Root */}
         <Routeprvt exact path="/" component={Panel} />
         <Routeprvt exact path="/folder/:folderId" component={Panel} />
        {/* end root */}


         {/* Account */}
         <Routeprvt path="/user" component={Profile} />
         <Routeprvt path="/update-profile" component={UpdateProfile} />
        {/* end account */}


         {/* Authorization */}
         <Route path="/signup" component={Signup} />
         <Route path="/login" component={Login} />
         <Route path="/forgot-password" component={ResetPassword} />
         {/* end auth */}

         
       </Switch>
     </AuthProvider>
   </Router>
  )
}
