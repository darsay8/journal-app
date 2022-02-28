const JournalEntry = () => {
  const imgUrl =
    'https://geniusbeauty.com/wp-content/uploads/2008/11/california-wallpaper-nature-10.jpg';

  return (
    <div className="journal__entry animate__animated animate__fadeIn animate__faster">
      <div
        className="journal__entry-picture"
        style={{
          backgroundSize: 'cover',
          backgroundImage: `url(${imgUrl})`,
        }}
      ></div>

      <div className="journal__entry-body">
        <p className="journal__entry-title">Entry</p>
        <p className="journal__entry-content">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
      </div>
      <div className="journal__entry-date-box">
        <span>Monday</span>
        <h4>28</h4>
      </div>
    </div>
  );
};

export default JournalEntry;
