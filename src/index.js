import React from 'react';
import ReactDOM from 'react-dom';
import RedBox from 'redbox-react';
import AppContainer from './containers';
import store from './store';
import history from './store/history';

const ENTRY_POINT = document.querySelector('#react-app-root');

// creating starting endpoint for app.
const render = () => {
  ReactDOM.render(<AppContainer store={store} history={history} />, ENTRY_POINT);
};

// this will help us understand where the problem is located once app will fall.
const renderError = error => {
  ReactDOM.render(<RedBox error={error} />, ENTRY_POINT);
};

// This code is excluded from production bundle
if (__DEV__) {
  window.state = store;
  // ========================================================
  // DEVELOPMENT STAGE! HOT MODULE REPLACE ACTIVATION!
  // ========================================================
  const devRender = () => {
    if (module.hot) {
      module.hot.accept('./containers/index.js', () => render());
    }

    render();
  };

  // Wrap render in try/catch
  try {
    devRender();
  } catch (error) {
    console.error(error);
    renderError(error);
  }
} else {
  // ========================================================
  // PRODUCTION GO!
  // ========================================================
  render();
}
