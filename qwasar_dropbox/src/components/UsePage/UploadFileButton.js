import { useAuth } from "../AuthPage/AuthComponent"
import { ROOT_FOLDER } from "../hooks/ApplyDirectory"
import { v4 as uuidV4 } from "uuid"
import { faFileUpload } from "@fortawesome/free-solid-svg-icons"
import React, { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { storage, database } from "../../firebase/firebase"
import ReactDOM from "react-dom"

function UploadFileButton({ currentFolder }) {
  const [uploadingFiles, setUploadingFiles] = useState([])
  const { currentUser } = useAuth()

  function handleUpload(e) {
    const file = e.target.files[0]
    if (currentFolder == null || file == null) return

    const id = uuidV4()
    setUploadingFiles(preLoad => [
      ...preLoad,
      { 
        id: id, 
        name: file.name, 
        progress: 0, 
        error: false 
      },
    ])
    const filePath =
      currentFolder === ROOT_FOLDER
        ? `${currentFolder.path.join("/")}/${file.name}`
        : `${currentFolder.path.join("/")}/${currentFolder.name}/${file.name}`

    const uploadTask = storage
      .ref(`/files/${currentUser.uid}/${filePath}`)
      .put(file)

    uploadTask.on(
      "state_changed",
      snapshot => {
        const progress = snapshot.bytesTransferred / snapshot.totalBytes
        setUploadingFiles(preLoad => {
          return preLoad.map(uploadFile => {
            if (uploadFile.id === id) {
              return { ...uploadFile, 
                progress: progress 
              }
            }

            return uploadFile
          })
        })
      },
      () => {
        setUploadingFiles(preLoad => {
          return preLoad.filter(uploadFile => {
            return uploadFile.id !== id
          })
        })

        uploadTask.snapshot.ref.getDownloadURL().then(url => {
          database.files
            .where("name", "==", file.name)
            .where("userId", "==", currentUser.uid)
            .where("folderId", "==", currentFolder.id)
            .get()
            .then(beingFiles => {
              const beingFile = beingFiles.docs[0]
              if (beingFile) {
                beingFile.ref.update({ url: url })
              } else {
                database.files.add({
                  url: url,
                  name: file.name,
                  createdAt: database.getCurrentTimestamp(),
                  folderId: currentFolder.id,
                  userId: currentUser.uid,
                })
              }
            })
        })
      },
      () => {
        setUploadingFiles(preLoad => {
          return preLoad.map(uploadFile => {
            if (uploadFile.id === id) {
              return { ...uploadFile, error: true }
            }
            return uploadFile
          })
        })
      }
    )
  }

  return (
    <>
    <button style={{
                  marginRight: "10px",
                  backgroundColor:"white",
                  borderColor: "#1E90FF",
                  width: "50px",
                  height: "50px",
                  borderRadius: "100px",
      
                }}>
      <label className="btn" style={{
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      marginTop: "5px",
                                      marginLeft: "2px"
                                    }}>
        <FontAwesomeIcon icon={faFileUpload} 
          style={{
              width: "18px",
              height: "18px",
              color: "#1E90FF",
              }} />
        <input
          type="file"
          onChange={handleUpload}
          style={{ 
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            opacity: 0, 
            position: "absolute", 
            left: "-9999px" 
          }}
          />
      </label>
    </button>
    {uploadingFiles.length > 0 &&
      ReactDOM.createPortal(
        <div
          style={{
            position: "absolute",
            bottom: "1rem",
            right: "1rem",
            maxWidth: "250px",
          }}
        >
          {uploadingFiles.map(file => (
            <div
              key={file.id}
              onClose={() => {
                setUploadingFiles(preLoad => {
                  return preLoad.filter(uploadFile => {
                    return uploadFile.id !== file.id
                  })
                })
              }}
            >
              <div
                closeButton={file.error}
                className="text-truncate w-100 d-block"
              >
                {file.name}
              </div>
              <div>
                <div
                  animated={!file.error}
                  variant={file.error ? "danger" : "primary"}
                  now={file.error ? 100 : file.progress * 100}
                  label={
                    file.error 
                    ? "Error"
                    : `${Math.round(file.progress * 100)}%`
                  }
                />
              </div>
            </div>
          ))}
        </div>,
        document.body
      )}
  </>
)
}
export default UploadFileButton;