import { types } from '../../types/types';

describe('types test', () => {
  test('should have types', () => {
    expect(types).toEqual({
      login: '[Auth] Login',
      logout: '[Auth] Logout',

      uiSetError: '[UI] Set Error',
      uiRemoveError: '[UI] Remove Error',

      uiStartLoading: '[UI] Start loading',
      uiFinishLoading: '[UI] Finish loading',

      notesAddNew: '[Notes] New note',
      notesActive: '[Notes] Set active note',
      notesLoad: '[Notes] Load note',
      notesUpdated: '[Notes] Updated note',
      notesFileUrl: '[Notes] Updated image Url',
      notesDelete: '[Notes] Delete note',
      notesLogOutCleaning: '[Notes] Logout Cleaning',
    });
  });
});
