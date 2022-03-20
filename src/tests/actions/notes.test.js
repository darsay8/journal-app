import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startNewNote } from '../../actions/notes';
import { db } from '../../firebase/firebaseConfig';
import { disableNetwork } from 'firebase/firestore';
import { types } from '../../types/types';
import { doc, deleteDoc } from '@firebase/firestore';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const store = mockStore({
  auth: {
    uid: 'TESTING',
  },
});

describe('Pruebas con las acciones de notes', () => {
  afterAll(() => {
    disableNetwork(db);
    // --exit;
  });

  test('debe de crear una nueva nota startNewNote', async () => {
    await store.dispatch(startNewNote());

    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.notesActive,
      payload: {
        id: expect.any(String),
        title: '',
        body: '',
        date: expect.any(Number),
      },
    });

    expect(actions[1]).toEqual({
      type: types.notesAddNew,
      payload: {
        id: expect.any(String),
        title: '',
        body: '',
        date: expect.any(Number),
      },
    });

    const docId = actions[0].payload.id;
    const noteRef = doc(db, `/${store.getState().auth.uid}/journal/notes/${docId}`);
    await deleteDoc(noteRef);
  });
});
