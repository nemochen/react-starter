/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';

import Header from './components/Header';
import Footer from './components/Footer';

import './style.scss';

const className = 'pageLayout';

class PageLayout extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  };

  shouldComponentUpdate() {
    return true;
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className={`${className}`}>
        <Header />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}

export default PageLayout;
