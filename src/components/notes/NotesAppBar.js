import React from 'react';

const NotesAppBar = () => {
  return (
    <div className="notes__appbar">
      <span>Feb 28th, 2022</span>
      <input id="fileSelector" name="file" type="file" style={{ display: 'none' }} />
      <div>
        <button className="btn">Picture</button>
        <button className="btn">Save</button>
      </div>
    </div>
  );
};

export default NotesAppBar;
