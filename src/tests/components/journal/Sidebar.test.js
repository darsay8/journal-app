import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import '@testing-library/jest-dom';

import 'jsdom-global/register';

import { startLogOut } from '../../../actions/auth';
import Sidebar from '../../../components/journal/Sidebar';
import { startNewNote } from '../../../actions/notes';

jest.mock('../../../actions/auth', () => ({
  startLogOut: jest.fn(), //mock implementation
}));

jest.mock('../../../actions/notes', () => ({
  startNewNote: jest.fn(), //mock implementation
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
  auth: {
    uid: '123ABC',
    name: 'User',
  },
  ui: {
    loading: false,
    msgError: null,
  },
  notes: {
    active: null,
    notes: [],
  },
};

let store = mockStore(initState);
store.dispatch = jest.fn();

const charAt = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <Sidebar />
  </Provider>,
);

describe('<SideBar/> Test', () => {
  test('should render', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should logout', () => {
    wrapper.find('button').prop('onClick')();
    expect(startLogOut).toHaveBeenCalled();
  });

  test('should startNewNote', () => {
    wrapper.find('.journal__new-entry').prop('onClick')();
    expect(startNewNote).toHaveBeenCalled();
  });
});
