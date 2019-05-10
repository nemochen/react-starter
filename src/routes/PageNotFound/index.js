import React from 'react';
import { connect } from 'react-redux';
import './style.scss';

const PageNotFound = () => {
  const image404 = require('./asset/404.png');

  return (
    <div>
      <img src={image404} />
    </div>
  );
};

const mapStateToProps = () => ({});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PageNotFound);
