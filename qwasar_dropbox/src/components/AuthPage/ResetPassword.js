import CenterBlock from "./CenterBlock"
import { Link } from "react-router-dom"
import { useAuth } from "./AuthComponent"
import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"

export default function ResetPassword() {
  const emailRef = useRef()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const { resetPassword } = useAuth()

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setMessage("")
      setError("")
      setLoading(true)
      await resetPassword(emailRef.current.value)
      setMessage("Check your email")
    } catch {
      setError("Reset password -Failed-")
    }

    setLoading(false)
  }
  const AuthLogo = <img src="firebase-auth.png" 
    style={{
      justifyContent: "center",
      alignItems: "center", 
      height: "90px",width: "90px" 
    }}>
  </img>


  return (
    <CenterBlock>
      <Card>
        <Card.Body>
          {AuthLogo}
          <h2 className="text-center mb-4">Password Reset</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <>Email</>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Button disabled={loading} 
              className="w-100" 
              type="submit" 
              style={{ 
                background:"#DAA520",
                borderColor:"yellow"
              }}>
              Reset Password
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/login" style={{
              color:"#DAA520"
            }}>Login</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/signup"
          style={{
            color:"#DAA520"
            }}>Sign Up</Link>
      </div>
    </CenterBlock>
  )
}
