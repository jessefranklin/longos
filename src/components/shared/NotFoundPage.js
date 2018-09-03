import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <div>
    Dont know how you got here but you can't stay. <Link to="/">Go home.</Link>
  </div>
);

export default NotFoundPage;
