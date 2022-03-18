import { authReducer } from '../../reducers/authReducer';
import { types } from '../../types/types';

describe('auth reducer test', () => {
  test('should return default', () => {
    const state = authReducer({}, {});
    expect(state).toEqual({});
  });

  test('should to login', () => {
    const action = {
      type: types.login,
      payload: {
        uid: 'tywrtw5636',
        displayName: 'Anotherking',
      },
    };

    const state = authReducer({}, action);

    expect(state).toEqual({
      uid: 'tywrtw5636',
      name: 'Anotherking',
    });
  });

  test('should to logout', () => {
    const action = {
      type: types.logout,
    };
    const state = authReducer({}, action);
    expect(state).toEqual({});
  });
});
