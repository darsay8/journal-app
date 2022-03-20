import Swal from 'sweetalert2';
import { db } from '../firebase/firebaseConfig';
import { collection, doc, addDoc, updateDoc, deleteDoc } from '@firebase/firestore';
import { types } from '../types/types';
import { loadNotes } from '../helpers/loadNotes';
import { fileUpload } from '../helpers/fileUpload';

export const startNewNote = () => async (dispatch, getState) => {
  const { uid } = getState().auth;

  const newNote = {
    title: '',
    body: '',
    date: new Date().getTime(),
  };

  const collRef = collection(db, `${uid}/journal/notes`);
  const docRef = await addDoc(collRef, newNote);

  dispatch(activeNote(docRef.id, newNote));
  dispatch(addNewNote(docRef.id, newNote));
};

export const activeNote = (id, note) => ({
  type: types.notesActive,
  payload: {
    id,
    ...note,
  },
});

export const addNewNote = (id, note) => ({
  type: types.notesAddNew,
  payload: {
    id,
    ...note,
  },
});

export const startLoadingNotes = uid => async dispatch => {
  const notes = await loadNotes(uid);
  dispatch(setNotes(notes));
};

export const setNotes = notes => ({
  type: types.notesLoad,
  payload: notes,
});

export const startSaveNote = note => async (dispatch, getState) => {
  const { uid } = getState().auth;

  if (!note.url) {
    delete note.url;
  }

  const noteToFirestore = { ...note };
  delete noteToFirestore.id;
  // const { id, ...noteData } = note;

  const docRef = doc(db, `${uid}/journal/notes/${note.id}`);

  await updateDoc(docRef, noteToFirestore);

  dispatch(refreshNote(note.id, noteToFirestore));

  Swal.fire('Saved', note.title, 'success');
};

export const refreshNote = (id, note) => ({
  type: types.notesUpdated,
  payload: {
    id,
    note: { id, ...note },
  },
});

export const startUploading = file => async (dispatch, getState) => {
  const { active: activeNote } = getState().notes;

  Swal.fire({
    title: 'Uploading...',
    text: 'Please wait...',
    showConfirmButton: false,
    allowOutsideClick: false,
    willOpen: () => {
      Swal.showLoading();
    },
  });

  const fileUrl = await fileUpload(file);
  activeNote.url = fileUrl;
  dispatch(startSaveNote(activeNote));
  Swal.close();
};

export const startDeleting = id => async (dispatch, getState) => {
  const { uid } = getState().auth;

  const docRef = doc(db, `${uid}/journal/notes/${id}`);

  await deleteDoc(docRef);
  dispatch(deleteNote(id));
};

export const deleteNote = id => ({
  type: types.notesDelete,
  payload: id,
});

export const notesLogout = () => ({
  type: types.notesLogOutCleaning,
});
