import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  startLoadingNotes,
  startNewNote,
  startSaveNote,
  startUploading,
} from '../../actions/notes';
import { db } from '../../firebase/firebaseConfig';
import { disableNetwork } from 'firebase/firestore';
import { types } from '../../types/types';
import { doc, deleteDoc, getDoc } from '@firebase/firestore';
import { fileUpload } from '../../helpers/fileUpload';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

/* jest.mock('../../helpers/fileUpload', () => ({
  fileUpload: jest.fn(() => {
    // return 'https://hello.com/thing.jpg';
    return Promise.resolve('https://hello.com/thing.jpg');
  }),
})); */

jest.mock('../../helpers/fileUpload');

const initState = {
  auth: {
    uid: 'TESTING',
  },
  notes: {
    active: {
      id: '3eROLFflhXgwS9d5c4Av',
      title: 'Title',
      body: 'Body for the active note',
    },
  },
};

let store = mockStore(initState);

describe('Notes actions tests', () => {
  beforeEach(() => {
    store = mockStore(initState);
  });

  afterAll(() => {
    disableNetwork(db);
  });

  test('should create a new note', async () => {
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

  test('should load notes', async () => {
    await store.dispatch(startLoadingNotes('TESTING'));
    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.notesLoad,
      payload: expect.any(Array),
    });

    const expected = {
      id: expect.any(String),
      title: expect.any(String),
      body: expect.any(String),
      date: expect.any(Number),
    };

    expect(actions[0].payload[0]).toMatchObject(expected);
  });

  test('should update note', async () => {
    const note = {
      id: '3eROLFflhXgwS9d5c4Av',
      title: 'New Title',
      body: 'This is a new body for test update note',
    };

    await store.dispatch(startSaveNote(note));

    const actions = store.getActions();

    expect(actions[0].type).toBe(types.notesUpdated);

    const docId = actions[0].payload.id;
    const docRef = doc(db, `/${store.getState().auth.uid}/journal/notes/${docId}`);

    const docSnap = await getDoc(docRef);

    expect(docSnap.data().title).toBe(note.title);
  });

  test('should update note url', async () => {
    global.File = class MockFile {
      constructor(parts, filename, properties) {
        this.filename = filename;
      }
    };

    // global.FormData = jest.fn();

    const file = new File([], 'file.jpg');

    fileUpload.mockImplementation(() => 'https://hello.com/thing.jpg');

    await store.dispatch(startUploading(file));

    const docId = initState.notes.active.id;

    const docRef = doc(db, `/${store.getState().auth.uid}/journal/notes/${docId}`);
    const docSnap = await getDoc(docRef);
    console.log(docSnap.data().url);

    expect(docSnap.data().url).toBe('https://hello.com/thing.jpg');
  });
});
