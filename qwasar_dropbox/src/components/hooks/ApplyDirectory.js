import { useReducer, useEffect } from "react"
import { database } from "../../firebase/firebase"
import { useAuth } from "../AuthPage/AuthComponent"

export const ROOT_FOLDER = { name: "Root", id: null, path: [] }

const ACTIONS = {
  SELECT_FOLDER: "select-folder",
  UPDATE_FOLDER: "update-folder",
  SET_CHILD_FILES: "set-child-files",
  SET_CHILD_FOLDERS: "set-child-folders",
}


// they take the state so far and the action, and return the next state
function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.SELECT_FOLDER:
      return {
        folderId: payload.folderId,
        folder: payload.folder,
        childFiles: [],
        childFolders: [],
      }    
    case ACTIONS.SET_CHILD_FOLDERS:
      return {
        ...state,childFolders: payload.childFolders,
      }
    case ACTIONS.UPDATE_FOLDER:
      return {
        ...state,
        folder: payload.folder,
      }

    case ACTIONS.SET_CHILD_FILES:
      return {
        ...state,
        childFiles: payload.childFiles,
      }
    default:
      return state
  }
}
// using folders in a dropbox project
// according to their id.
// using id user

export function ApplyDirectory(folderId = null, folder = null) {
  const [state, dispatch] = useReducer(reducer, {
    folderId,
    folder,
    childFolders: [],
    childFiles: [],
  })
  const { currentUser } = useAuth()

// The Effect Hook lets you perform side effects in function components:
  useEffect(() => {
    dispatch({ 
      type: ACTIONS.SELECT_FOLDER, 
      payload: { folderId, folder }})
  }, [folderId, folder])

  useEffect(() => {
    if (folderId == null) {
      return dispatch({
        type: ACTIONS.UPDATE_FOLDER,
        payload: { folder: ROOT_FOLDER },
      })
    }

// determining if there are errors in the code
    database.folders
      .doc(folderId)
      .get()
      .then(doc => {
        // dispatch is just a function that dispatches actions to the   store.
        dispatch({
          type: ACTIONS.UPDATE_FOLDER,
          payload: { folder: database.formatDoc(doc) },
        })
      })
      .catch(() => {
        dispatch({
          type: ACTIONS.UPDATE_FOLDER,
          payload: { folder: ROOT_FOLDER },
        })
      })
  }, [folderId])

  useEffect(() => {
    return database.folders     
      .where("parentId", "==", folderId)
      .orderBy("createdAt")
      .where("userId", "==", currentUser.uid)
      .onSnapshot(snapshot => {
      dispatch({
        type: ACTIONS.SET_CHILD_FOLDERS,
        payload: { 
          childFolders: snapshot.docs.map(database.formatDoc) 
        },
      })
    })
  }, [folderId, currentUser])

// database usage
  useEffect(() => {
    return (
      database.files
        .where("folderId", "==", folderId)
        .where("userId", "==", currentUser.uid)
        .orderBy("createdAt")
        .onSnapshot(snapshot => {
      dispatch({
        type: ACTIONS.SET_CHILD_FILES,
        payload: { 
          childFiles: snapshot.docs.map(database.formatDoc) 
        },
      })
        })
    )
  }, [folderId, currentUser])

  return state
}
