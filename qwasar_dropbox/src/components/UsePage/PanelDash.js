import React from "react"
import { useParams, useLocation } from "react-router-dom"
import { ApplyDirectory } from "../hooks/ApplyDirectory"
import File from "./File"
import Header from "./Header"
import Directory from "./Directory"
import FolderRoot from "./FolderRoot"

function Panel() {
  const { folderId } = useParams()
  const { state = {} } = useLocation()
  const { folder, childFolders, childFiles } = ApplyDirectory(folderId, state.folder)


  return (
    <>
      <Header />
      <container fluid>
      <FolderRoot style={{marginLeft: "100px",}}/>
        {childFolders.length > 0 && (
          <div className="d-flex flex-wrap">
            {childFolders.map(childFolder => (
              <div key={childFolder.id} 
                   style={{ maxWidth: "250px" }} 
                   className="p-2">
                <Directory folder={childFolder} />
              </div>
            ))}
          </div>
        )}
        {childFiles.length > 0 && childFolders.length > 0 && <hr />}
        {childFiles.length > 0 && (
          <div className="d-flex flex-wrap">
            {childFiles.map(childFile => (
              <div key={childFile.id} style={{ maxWidth: "250px" }}className="p-2">
                <File file={childFile} />
              </div>
            ))}
          </div>
        )}
      </container>
    </>
  )
}
export default Panel;
