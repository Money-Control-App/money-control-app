import { Container } from '@material-ui/core';
import React, { useState } from 'react';

import Balance from '../Balance/Balance';

import standartPhoto from '../../img/newUser/blank_photo.webp';
import './main-page.sass';

export const MainPage = () => {
    const [charges, setCharges] = useState(
        JSON.parse(localStorage.getItem('charges'))
    );
    const [incomes, setIncomes] = useState(
        JSON.parse(localStorage.getItem('incomes'))
    );
    const infoUser = JSON.parse(localStorage.getItem('User-Info'));
    const avatarUser = JSON.parse(localStorage.getItem('avatar'));

    return (
        <Container maxWidth='md'>
            <div className='main--page'>
                <div className='main--user'>
                    <div>
                        <h5 className='main__name'>Hello,&nbsp;
                     {infoUser ? infoUser.data.firstName : 'person'}
                     !</h5>
                    </div>
                    <div className='avatar-block'>
                        <img
                            className='main__avatar'
                            alt='avatar user'
                            src={avatarUser ? avatarUser : standartPhoto} />
                    </div>
                </div>
                <div className='main__text'>
                    We help you <br />
                &nbsp;&nbsp;&nbsp;to save your money! <br />
                Don't forget to fill it
            </div>
            </div>
            {infoUser &&
                <div className='main__balance'>
                    Total balance: <Balance charges={charges} incomes={incomes} />
                </div>
            }
        </Container>
    )
}