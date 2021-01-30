import React from 'react';
import {Link} from 'react-router-dom';

import './error-page.sass'

export default function ErrorPage() {
  return (
    <div className='error__container'>
      <Link className='error__link'  to='/'>
        Return to main
      </Link>
      
    </div>
  );
}
