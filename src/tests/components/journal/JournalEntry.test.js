import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import '@testing-library/jest-dom';
import 'jsdom-global/register';

import JournalEntry from '../../../components/journal/JournalEntry';
import { activeNote } from '../../../actions/notes';

jest.mock('../../../actions/notes', () => ({
  activeNote: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};

let store = mockStore(initState);
store.dispatch = jest.fn();

const note = {
  id: 10,
  date: 0,
  title: 'Title',
  body: 'Body Text',
  url: 'https://testimages.com/image.jpg',
};

const wrapper = mount(
  <Provider store={store}>
    <JournalEntry note={note} />
  </Provider>,
);

describe('<JournalEntry/> Test', () => {
  test('should match with snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should active note ', () => {
    // wrapper.find('.journal__entry').simulate('click');
    wrapper.find('.journal__entry').prop('onClick')();

    expect(store.dispatch).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledWith(activeNote(note.id, { ...note }));
  });
});
