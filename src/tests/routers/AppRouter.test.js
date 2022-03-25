import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import '@testing-library/jest-dom';

import 'jsdom-global/register';
import { login } from '../../actions/auth';
import AppRouter from '../../routers/AppRouter';

import { act } from 'react-dom/test-utils';
import { getAuth, signInWithEmailAndPassword } from '@firebase/auth';

import Swal from 'sweetalert2';

jest.mock('sweetalert2', () => ({
  fire: jest.fn(), //when is used the default import just the method is called
}));

jest.mock('../../actions/auth', () => ({
  login: jest.fn(), //mock implementation
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
  auth: {},
  ui: {
    loading: false,
    msgError: null,
  },
  notes: {
    active: {
      id: 'ABC',
    },
    notes: [],
  },
};

let store = mockStore(initState);
store.dispatch = jest.fn();

describe('<AppRouter/> Test1', () => {
  test('should call login action if user is authenticated', async () => {
    let user;

    await act(async () => {
      // async because it dispatch a firebase action

      const auth = getAuth();
      const userCred = await signInWithEmailAndPassword(auth, 'user@mail.com', '123456');
      user = userCred.user;

      const wrapper = mount(
        <Provider store={store}>
          <AppRouter />
        </Provider>,
      );
    });
    expect(login).toHaveBeenCalledWith('cR2AxLvWR1Zf3kcLIZULO1Xa56u2', null);
  });
});
