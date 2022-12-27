import React from "react"
import { faFile } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function File({ file }) {
  const fileIcon = <FontAwesomeIcon icon={faFile} className="mr-2" />
  return (
    <a
      href={file.url}
      target="_blank"
      className="btn btn-outline-dark text-truncate"
    >
      {fileIcon}  
      {file.name}
    </a>
  )
}
