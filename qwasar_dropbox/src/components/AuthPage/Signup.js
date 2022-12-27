import CenterBlock from "./CenterBlock"
import { useAuth } from "./AuthComponent"
import { Link, useHistory } from "react-router-dom"
import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"

export default function Signup() {
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { signup } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const emailRef = useRef()
  
  const AuthLogo = <img src="firebase-auth.png"
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                          height: "90px",
                          width: "90px"
                        }}>
                    </img>

  async function handleSubmit(e) {
    e.preventDefault()


    try {
      setError("")
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)
      history.push("/")
    } catch {
      setError("Failed create User")
    }

    setLoading(false)    
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords 404 error")
    }

  }

  return (
    <CenterBlock>
      <Card>
        <Card.Body>
          {AuthLogo}
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <>Email</>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <>Password</>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group id="password-confirm">
              <>Password Confirm</>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" style={{
                                                                  background:"#DAA520",
                                                                  borderColor:"yellow"}
                                                                } type="submit"  >
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 #FFD700 text-center mt-2">
        Already have an account? <Link to="/login"><h6  className="#FFD700" 
                                                        style={{
                                                          fontSize:"16px", 
                                                          color:"#DAA520"
                                                          }}
                                                      >||-- Log In</h6></Link>
      </div>
    </CenterBlock>
  )
}
