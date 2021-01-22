import { Container } from '@material-ui/core';
import React from 'react';
import standartPhoto from '../../img/newUser/blank_photo.webp';

import './main-page.sass';

export const MainPage = () => {
    const infoUser = JSON.parse(localStorage.getItem("User-Info"));
    const avatarUser = JSON.parse(localStorage.getItem("avatar"));

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
                        <img className='main__avatar' src={avatarUser ? avatarUser : standartPhoto} />
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
                    Total balance: 
                </div>
            }
        </Container>
    )
}