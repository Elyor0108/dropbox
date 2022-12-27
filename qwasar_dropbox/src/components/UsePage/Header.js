import React from "react"
import { Nav } from "react-bootstrap"
import { Link } from "react-router-dom"
import NewFolderButton from "./NewFolderButton"
import UploadFileButton from "./UploadFileButton"
import { useParams, useLocation } from "react-router-dom"
import { ApplyDirectory } from "../hooks/ApplyDirectory"


export default function Header() {
  const { folderId } = useParams()
  const { state = {} } = useLocation()
  const { folder } = ApplyDirectory(folderId, state.folder) 
  const newFolder = <NewFolderButton currentFolder={folder} />
  const FileUpload = <UploadFileButton currentFolder={folder} />


  return (
    <Nav bg="light" expand="sm">
      <>
          <img src="dropbox_logo.png" style={{
                                              width: "50px", 
                                              height: "50px", 
                                              marginTop: "4px",
                                              marginLeft:"5px"
                                            }}>                                
          </img>
      <Nav as={Link} to="/" style={{
              marginRight: "150px",
              marginLeft: "50px"

              }}>
        <h1 style={{
                    color:"#1E90FF",
                    textDecoration: "underline" /* Подчеркивание заголовка */
                  }}>
          HOME
        </h1>       
      </Nav>
      
        <Nav as={Link} to="/user">
          <h1 style={{
                      color:"#1E90FF",
                      marginRight: "100px",
                      textDecoration: "underline", /* Подчеркивание заголовка */
                    }}>
            Profile
          </h1>
        </Nav>

      </>
        <div className="d-flex align-items-center media_que" style={{}}>
          {FileUpload}
          {newFolder}
        </div>
    </Nav>
  )
}
