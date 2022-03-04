import { db } from '../firebase/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { types } from '../types/types';

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

export const setNotes = notes => ({
  type: types.notesLoad,
  payload: notes,
});
