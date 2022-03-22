import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import '@testing-library/jest-dom';

import { login, logout, startLoginEmailPassword, startLogOut } from '../../actions/auth';
import { types } from '../../types/types';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

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

describe('Auth actions tests', () => {
  beforeEach(() => {
    store = mockStore(initState);
  });
  test('login and logout should create actions', () => {
    const uid = '123uid';
    const displayName = 'Username';

    const loginAction = login(uid, displayName);
    const logoutAction = logout();

    expect(loginAction).toEqual({
      type: types.login,
      payload: {
        uid: '123uid',
        displayName: 'Username',
      },
    });

    expect(logoutAction).toEqual({ type: types.logout });
  });

  test('should dispatch startLogout ', async () => {
    await store.dispatch(startLogOut());
    const actions = store.getActions();

    expect(actions[0]).toEqual({ type: types.logout });
  });

  test('should dispatch startLoginEmailPassword', async () => {
    const data = {
      email: 'user@mail.com',
      password: '123456',
    };

    const { email, password } = data;

    await store.dispatch(startLoginEmailPassword(email, password));

    const actions = store.getActions();

    expect(actions[1]).toEqual({
      type: types.login,
      payload: {
        uid: 'cR2AxLvWR1Zf3kcLIZULO1Xa56u2',
        displayName: null,
      },
    });
  });
});
