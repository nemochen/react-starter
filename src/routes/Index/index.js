import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getRate } from './action';

import './style.scss';

class Index extends React.Component {
  static propTypes = {
    // state
    rate: PropTypes.object.isRequired,
    // action
    getRate: PropTypes.func.isRequired
  }

  static defaultProps = {
  };

  componentDidMount() {
    this.props.getRate();
  }

  _handleClick = () => {
  }

  render() {
    return (
      <div onClick={this._handleClick}>
        CNY:USD = {this.props.rate.CNY}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  rate: state.Index.rate
});

const mapDispatchToProps = {
  getRate
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
