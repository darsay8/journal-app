import { finishLoading, removeError, setError, startLoading } from '../../actions/ui';
import { types } from '../../types/types';

describe('UI actions tests', () => {
  test('actions should work properly', () => {
    const action = setError('Error!');
    const removeErrorAction = removeError();
    const startLoadingAction = startLoading();
    const finishLoadingAction = finishLoading();

    expect(action).toEqual({
      type: types.uiSetError,
      payload: {
        msgError: 'Error!',
      },
    });

    expect(removeErrorAction).toEqual({
      type: types.uiRemoveError,
    });

    expect(startLoadingAction).toEqual({
      type: types.uiStartLoading,
    });

    expect(finishLoadingAction).toEqual({
      type: types.uiFinishLoading,
    });
  });
});
