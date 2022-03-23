import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import '@testing-library/jest-dom';

import 'jsdom-global/register';

import LoginScreen from '../../../components/auth/LoginScreen';

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

describe('<LoginScreen/> Test', () => {
  beforeEach(() => {
    store = mockStore(initState);
  });

  test('should display correctly', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <LoginScreen />
        </MemoryRouter>
      </Provider>,
    );

    expect(wrapper).toMatchSnapshot();
  });
});
