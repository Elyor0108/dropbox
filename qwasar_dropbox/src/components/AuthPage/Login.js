import CenterBlock from "./CenterBlock"
import { useAuth } from "./AuthComponent"
import { Link, useHistory } from "react-router-dom"
import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"

export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      history.push("/")
    } catch {
      setError("Failed to log in")
    }

    setLoading(false)
  }

  const AuthLogo = <img src="firebase-auth.png" style={{justifyContent: "center",alignItems: "center", height: "90px",width: "90px"}}></img>
  return (
    <CenterBlock>
      <Card>
        <Card.Body>
        {AuthLogo}
          <h2 className="text-center mb-4">Log In</h2>
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

            <Button disabled={loading} className="w-100" type="submit"  style={{ background:"#DAA520",borderColor:"yellow"}}>
              Log In
            </Button>

          </Form>

          <div className="w-100 text-center mt-3">
            <Link to="/forgot-password" style={{ color:"#DAA520"}}>Forgot Password?</Link>
          </div>
        </Card.Body>
      <div className="text-center mb-3">
        Need an account? <Link to="/signup"style={{ color:"#DAA520"}}>Sign Up</Link>
      </div> 
      </Card>
    </CenterBlock>
  )
}
