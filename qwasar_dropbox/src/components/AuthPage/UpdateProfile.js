import CenterBlock from "./CenterBlock"
import { useAuth } from "./AuthComponent"
import { Link, useHistory } from "react-router-dom"
import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"

export default function UpdateProfile() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { currentUser, updatePassword, updateEmail } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  function handleSubmit(e) {
    e.preventDefault()
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    const promises = []
    setLoading(true)
    setError("")

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value))
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value))
    }

    Promise.all(promises)
      .then(() => {
        history.push("/user")
      })
      .catch(() => {
        setError("Failed to update account")
      })
      .finally(() => {
        setLoading(false)
      })
  }
  const AuthLogo = <img src="firebase-auth.png"
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                          height: "90px",
                          width: "90px"
                        }}>
                    </img>
  return (
    <CenterBlock>
      <Card>
        <Card.Body>
          {AuthLogo}
          <h2 className="text-center mb-4">Update Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <>Email</>
              <Form.Control
                type="email"
                ref={emailRef}
                required
                defaultValue={currentUser.email}
              />
            </Form.Group>
            <Form.Group id="password">
              <>Password</>
              <Form.Control
                type="password"
                ref={passwordRef}
                placeholder="Leave blank to keep the same"
              />
            </Form.Group>
            <Form.Group id="password-confirm">
              <>Password Confirm</>
              <Form.Control
                type="password"
                ref={passwordConfirmRef}
                placeholder="Leave blank to keep the same"
              />
            </Form.Group>
            <Button disabled={loading} 
              className="w-100"
              style={{
                background:"#FFD700", 
                borderColor:"#FFD700"
              }} 
              type="submit">
              Up to date
            </Button>
          </Form>
      <div className="w-100 text-center mt-4">
        <Link to="/user" style={{
          color:"#FFD700",
          border:"1px solid",
          borderRadius:"4px"
          }}>Cancel</Link>
      </div>
        </Card.Body>
      </Card>
    </CenterBlock>
  )
}
