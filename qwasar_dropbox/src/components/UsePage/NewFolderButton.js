import { useAuth } from "../AuthPage/AuthComponent"
import { database } from "../../firebase/firebase"
import { ROOT_FOLDER } from "../hooks/ApplyDirectory"
import { faFolderPlus } from "@fortawesome/free-solid-svg-icons"
import React,{ useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Modal, Form } from "react-bootstrap"

export default function NewFolderButton({ currentFolder }) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const { currentUser } = useAuth()

  function openModal() {
    setOpen(true)
  }
  
    function closeModal() {
      setOpen(false)
    }
  function handleSubmit(e) {
    e.preventDefault()


    if (currentFolder == null) return

    const path = [...currentFolder.path]
    if (currentFolder !== ROOT_FOLDER) {
      path.push({ name: currentFolder.name, id: currentFolder.id })
    }

    database.folders.add({
      name: name,
      parentId: currentFolder.id,
      userId: currentUser.uid,
      path: path,
      createdAt: database.getCurrentTimestamp(),
    })
    closeModal()
    setName("")
  }

  return (
    <>
      <button onClick={openModal} 
        style={{borderColor: "#1E90FF", backgroundColor:"white",height: "50px",width: "50px",borderRadius: "100px"}} >
        <FontAwesomeIcon icon={faFolderPlus} style={{height: "18px",width: "18px", color: "#1E90FF",}} />
      </button>

      <Modal show={open} onHide={closeModal}>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <div>
              <h4>Enter Folder Name</h4>
              <Form.Control
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>
          </Modal.Body>
          <div style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: "15px",
                        marginTop: "15px"
                      }}>
            <button onClick={closeModal} variant="secondary"  style={{
                                                                      width: "120px",
                                                                      borderColor: "#1E90FF",
                                                                      borderRadius: "30px",
                                                                      color: "#1E90FF",
                                                                      marginRight: "8px",
                                                                      backgroundColor: "#D3D3D3"
                                                                    }} >
              Close
            </button>
            <button  type="submit"style={{
                width: "120px",
                borderColor: "#1E90FF",
                borderRadius: "30px",
                color: "white",
                backgroundColor: "#1E90FF"
              }}>
              Add Folder
            </button>
          </div>
        </Form>
      </Modal>
    </>
  )
}
