import React from 'react';

const Loading = ({loading}) => (
  <div className={loading?'loading-container active':'loading-container'}>
    <div className="loading" tabIndex="-1"></div>
  </div>
);

export default Loading;
