import React from "react"
import { Link } from "react-router-dom"
import { Button } from "react-bootstrap"
import { faFolder } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function Directory({ folder }) {
  return (
    <Button to={{  
      pathname: `/folder/${folder.id}`,state: { folder: folder },}}
      as={Link}
      variant="outline-info"
      className="btn btn-outline-info text-truncate w-200"
    >
      <FontAwesomeIcon className="mr-2" icon={faFolder}/>
      {folder.name}
    </Button>
  )
}
