import CenterBlock from "./CenterBlock"
import { useAuth } from "./AuthComponent"
import React, { useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { Card, Button, Alert } from "react-bootstrap"

export default function Profile() {
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const history = useHistory()

  async function handleLogout() {
    setError("")

    try {
      await logout()
      history.push("/login")
    } catch {
      setError("Failed to log out")
    }
  }

  return (
    <CenterBlock>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email:</strong> {currentUser.email}
          <Link to="/update-profile" 
            className="btn w-100 mt-3" 
            style={{
              background:"#FFD700"
              }}>
            Update Profile
          </Link>
        </Card.Body>
      </Card>
      <div className="w-150 text-center mt-2">
        <Button variant="link" 
          style={{ 
            backgroundColor: "#FFD700",
            color:"black"
          }} 
          onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </CenterBlock>
  )
}
