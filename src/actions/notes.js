import swal from 'sweetalert2';
import { db } from '../firebase/firebaseConfig';
import { collection, addDoc, doc, updateDoc } from 'firebase/firestore';
import { types } from '../types/types';
import { loadNotes } from '../helpers/loadNotes';

export const startNewNote = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    const newNote = {
      title: '',
      body: '',
      date: new Date().getTime(),
    };

    try {
      const docRef = await addDoc(collection(db, `${uid}/journal/notes`), newNote);

      dispatch(activeNote(docRef.id, newNote));
    } catch (e) {
      console.log(e);
    }
  };
};

export const activeNote = (id, note) => ({
  type: types.notesActive,
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
  // const noteToFirestore = { ...note };
  // delete noteToFirestore.id;
  const { id, url = null, ...noteData } = note;

  const docRef = doc(db, `${uid}/journal/notes/${id}`);
  await updateDoc(docRef, { url, ...noteData });
  dispatch(refreshNote(id, noteData));
  swal.fire('Saved', note.title, 'success');
};

export const refreshNote = (id, note) => ({
  type: types.notesUpdated,
  payload: {
    id,
    note: { id, ...note },
  },
});
