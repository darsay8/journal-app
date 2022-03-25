import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import '@testing-library/jest-dom';

import 'jsdom-global/register';

import NoteScreen from '../../../components/notes/NoteScreen';
import { activeNote } from '../../../actions/notes';

jest.mock('../../../actions/notes', () => ({
  activeNote: jest.fn(), //mock implementation
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
    active: {
      id: 1234,
      title: 'Title',
      body: 'Body text for testing purposes',
      date: 0,
    },
    notes: [],
  },
};

let store = mockStore(initState);
store.dispatch = jest.fn();

const charAt = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <NoteScreen />
  </Provider>,
);

describe('<NoteScreen/> Test', () => {
  test('should to match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should to have been called activeNote ', () => {
    wrapper.find('input[name="title"]').simulate('change', {
      target: {
        name: 'title',
        value: 'hello',
      },
    });

    // is called twice because the effect
    expect(activeNote).toHaveBeenLastCalledWith(1234, {
      body: 'Body text for testing purposes',
      title: 'hello',
      id: 1234,
      date: 0,
    });
  });
});
