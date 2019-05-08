import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

const className = 'pageLayoutHeader';

class Header extends React.Component {
  static propTypes = {
  };

  shouldComponentUpdate() {
    return true;
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className={`${className}`}>
        <Link to='/' className={`${className}-link`}>Index</Link>
        {' · '}
        <Link to='/home' className={`${className}-link`}>Home</Link>
      </div>
    );
  }
}

export default Header;
