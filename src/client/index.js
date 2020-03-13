import { onTextChange, 
  onUrlBlur,
  onUrlChange,
  tabClickHandler,
  handleTextSubmit,
  handleUrlSubmit } from './js/eventHandlers';
import './styles/main.scss';
import '../../favicon.ico';

// Externally hosted express server
const baseUrl = "https://news-digest-express.herokuapp.com/";

// Local express server (uncomment for development)
// const baseUrl = "http://localhost:8081/";

export {
  baseUrl,
  handleTextSubmit,
  handleUrlSubmit,
  onTextChange,
  onUrlBlur,
  onUrlChange,
  tabClickHandler
}