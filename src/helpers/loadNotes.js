import { collection, query, getDocs } from '@firebase/firestore';
import { db } from '../firebase/firebaseConfig';

export const loadNotes = async uid => {
  const collRef = collection(db, `${uid}/journal/notes`);
  const notesSnap = await getDocs(query(collRef));

  const notes = [];

  notesSnap.forEach(snapChildren => {
    notes.push({
      id: snapChildren.id,
      ...snapChildren.data(),
    });
  });

  return notes;
};
