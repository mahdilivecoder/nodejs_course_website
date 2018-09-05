
const App=require('./index');
require('dotenv').config();
//default selecting index.js
global.config=require('./config');

new App();
