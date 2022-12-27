import React from "react"
import { Container } from "react-bootstrap"

export default function CenterBlock({ children }) {

  return (
    <Container className="d-flex align-items-center justify-content-center"
      style={{ 
        minHeight: "100vh", 
        color: "#FFD700" 
      }}
    >
      {/* {child_lk} */}
      <div className="w-100" style={{ maxWidth: "400px" }}>
        {children}
      </div>
    </Container>
  )
}
