import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { testReducer } from './action';

import './style.scss';

class Index extends React.PureComponent {
  static propTypes = {
    // state
    state: PropTypes.object.isRequired,
    // action
    testReducer: PropTypes.func.isRequired
  }

  static defaultProps = {
  };

  _handleClick = () => {
    this.props.testReducer(5);
  }

  render() {
    return (
      <div onClick={this._handleClick}>
        Index {this.props.state.count}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  state: state.Index
});

const mapDispatchToProps = {
  testReducer
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
