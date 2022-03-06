import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startSaveNote, startUploading } from '../../actions/notes';

const NotesAppBar = () => {
  const dispatch = useDispatch();
  const { active: note } = useSelector(state => state.notes);

  const fileSelector = useRef(null);

  const handleSaveNote = () => {
    dispatch(startSaveNote(note));
  };

  const handlePictureClick = () => {
    fileSelector.current.click();
  };

  const handleFileChange = e => {
    const file = e.target.files[0];
    if (file) {
      dispatch(startUploading(file));
    }
  };

  return (
    <div className="notes__appbar">
      <span>Feb 28th, 2022</span>
      <input
        ref={fileSelector}
        name="file"
        type="file"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <div>
        <button className="btn" onClick={handlePictureClick}>
          Picture
        </button>
        <button className="btn" onClick={handleSaveNote}>
          Save
        </button>
      </div>
    </div>
  );
};

export default NotesAppBar;
