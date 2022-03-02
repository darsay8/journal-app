import React from 'react';
import { render } from 'react-dom';
// import { BrowserRouter } from 'react-router-dom';
import JournalApp from './JournalApp';

import './styles/styles.scss';

const root = document.getElementById('root');
render(<JournalApp />, root);
