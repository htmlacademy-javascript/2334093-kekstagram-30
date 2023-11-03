import {getDataArray} from './data.js';
import {renderThumbnails} from './rendering-thumbnails.js';

const pictures = getDataArray();

renderThumbnails(pictures);
