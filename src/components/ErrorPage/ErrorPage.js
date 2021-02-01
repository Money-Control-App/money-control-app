import React from 'react';
import { Link } from 'react-router-dom';

import errorImage from '../../img/errorPage/error404.jpg';
import './error-page.sass';

export default function ErrorPage() {
  return (
    <div className='error__container'>
      <img
        className='error__img'
        alt='error'
        src={errorImage}
      />
      <Link className='error__link' to='/'>
        Return to main
      </Link>
    </div>
  );
}
