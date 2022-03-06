import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startSaveNote } from '../../actions/notes';

const NotesAppBar = () => {
  const dispatch = useDispatch();
  const { active: note } = useSelector(state => state.notes);

  const handleSaveNote = () => {
    dispatch(startSaveNote(note));
  };

  return (
    <div className="notes__appbar">
      <span>Feb 28th, 2022</span>
      <input id="fileSelector" name="file" type="file" style={{ display: 'none' }} />
      <div>
        <button className="btn">Picture</button>
        <button className="btn" onClick={handleSaveNote}>
          Save
        </button>
      </div>
    </div>
  );
};

export default NotesAppBar;
