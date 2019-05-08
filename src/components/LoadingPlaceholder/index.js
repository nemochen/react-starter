import React, { memo } from 'react';
import './style.scss';

const className = 'componentLoadingPlaceholder';

const LoadingPlaceholder = () => {
  return (
    <div className={`${className}`}>
      <span>Loading...</span>
    </div>
  );
};

export default memo(LoadingPlaceholder);
