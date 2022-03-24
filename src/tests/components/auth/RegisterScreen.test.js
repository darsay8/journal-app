import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import '@testing-library/jest-dom';
import 'jsdom-global/register';

import RegisterScreen from '../../../components/auth/RegisterScreen';
import { types } from '../../../types/types';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
  auth: {},
  ui: {
    loading: false,
    msgError: null,
  },
};

let store = mockStore(initState);

const wrapper = mount(
  <Provider store={store}>
    <MemoryRouter>
      <RegisterScreen />
    </MemoryRouter>
  </Provider>,
);

describe('<RegisterScreen/> Tests', () => {
  test('should wrapper match with snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should dispatch actions', () => {
    const emailField = wrapper.find('input[name="email"]');
    // console.log(emailField.exists());
    emailField.simulate('change', {
      target: {
        value: '',
        name: 'email',
      },
    });

    wrapper.find('form').simulate('submit', {
      preventDefault() {},
    });

    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.uiSetError,
      payload: {
        msgError: 'Email is not valid',
      },
    });
  });

  test('should display alert error box', () => {
    const store = mockStore({
      auth: {},
      ui: {
        loading: false,
        msgError: 'Email is not valid 🚨',
      },
    });

    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <RegisterScreen />
        </MemoryRouter>
      </Provider>,
    );

    const errorBox = wrapper.find('.auth__alert-error');

    const state = store.getState();

    expect(errorBox.exists()).toBe(true);
    expect(errorBox.text().trim()).toBe(state.ui.msgError);
  });
});
