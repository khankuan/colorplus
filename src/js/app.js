import Views from './views';
import React from 'react/addons';
import Actions from './actions';

//  Load the styles
import '../sass/app.scss';

(function () {
  Actions.App.init();
  React.initializeTouchEvents(true);
  React.render(<Views.App />, document.body);
})();
