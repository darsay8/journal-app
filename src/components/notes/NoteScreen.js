import NotesAppBar from './NotesAppBar';

const NoteScreen = () => {
  const imgUrl =
    'https://geniusbeauty.com/wp-content/uploads/2008/11/california-wallpaper-nature-10.jpg';

  return (
    <div className="notes__main-content">
      <NotesAppBar />
      <div className="notes__content">
        <form action="">
          <input
            type="text"
            placeholder="Some awesome title"
            className="notes__title-input"
            autoComplete="off"
            name="title"
          />
          <textarea
            placeholder="What happened today"
            className="notes__textarea"
            name="body"
          ></textarea>
        </form>

        <div className="notes__image">
          <img src={imgUrl} alt="landscape" />
        </div>
      </div>
      <button className="btn btn-danger">Delete</button>
    </div>
  );
};

export default NoteScreen;
