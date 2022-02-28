import React from 'react';
import JournalEntry from './JournalEntry';

const entries = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const JournalEntries = () => {
  return (
    <div className="journal__entries animate__animated animate__fadeIn animate__faster">
      {entries.map(value => (
        <JournalEntry key={value} />
      ))}
    </div>
  );
};

export default JournalEntries;
