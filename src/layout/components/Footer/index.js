import React from 'react';
import './style.scss';

const className = 'pageLayoutFooter';

class Footer extends React.Component {
  static propTypes = {
  };

  shouldComponentUpdate() {
    return true;
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className={`${className}`}>This is footer</div>
    );
  }
}

export default Footer;
