import React, { lazy } from 'react';
import PropTypes from 'prop-types';
import { injectReducer } from '../store/reducers';
import rootStore from '../store';

const Index = lazy(() => import(/* webpackChunkName: "Index" */ './Index/index'));
const Home = lazy(() => import(/* webpackChunkName: "Home" */ './Home'));
const PageNotFound = lazy(() => import(/* webpackChunkName: "Home" */ './PageNotFound'));

const Conponents = {
  Index,
  Home,
  PageNotFound
};

const AsyncComponent = props => {
  const { componentName } = props;

  import(`./${componentName}/reducer`).then(({ default: reducer }) => {
    injectReducer(rootStore, { key: componentName, reducer });
  });

  const Component = Conponents[componentName];

  return <Component {...props} />;
};

AsyncComponent.propTypes = {
  componentName: PropTypes.string.isRequired
};

AsyncComponent.defaultProps = {
};

export default AsyncComponent;
