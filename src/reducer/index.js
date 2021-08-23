import {combineReducers} from 'redux';
import movie from './movie';
import news from './news';
import booking from './booking';

export default combineReducers({
  movie,
  news,
  booking,
});
