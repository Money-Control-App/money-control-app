import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/material.css';

import * as yup from 'yup';
import "yup-phone";

import FillForm from './FillForm';
import { Input } from '../PartsForm/Input';
import { AlertOwn } from '../PartsForm/Alert';
import { ButtonSubmit } from '../PartsForm/ButtonSubmit';
import { app } from '../../../firebase/base';
import { useData } from './DataUser';
import blankPhoto from '../../../img/newUser/blank_photo.webp';

import './form.sass';

const REGULAR_NOT_NUMBER = /^([^0-9]*)$/;
const MESSAGE_FOR_FILL = 'Fill this field';
const DELAY_FOR_ALERT = 2000;

const schema = yup.object().shape({
    firstName:
        yup.string()
            .matches(REGULAR_NOT_NUMBER, 'First name should be without numbers')
            .required(MESSAGE_FOR_FILL)
            .min(2, "At least two characters"),
    lastName:
        yup.string()
            .matches(REGULAR_NOT_NUMBER, 'Last name should be without numbers')
            .required(MESSAGE_FOR_FILL)
            .min(2, "At least two characters"),
    email:
        yup.string()
            .email("Email. should have correct format")
            .required(MESSAGE_FOR_FILL),
});

export const SettingUser = () => {
    const [phone, setPhone] = useState();
    const { data, setValues } = useData();
    const { register, handleSubmit, errors } = useForm({
        mode: 'onBlur',
        resolver: yupResolver(schema)
    });
    const [open, setOpen] = useState(true);
    const [alert, setAlert] = useState(false);
    const infoUser = JSON.parse(localStorage.getItem("User-Info"));
    const avatarUser = JSON.parse(localStorage.getItem("avatar"));
    const [profilePhoto, setAvatar] = useState(avatarUser ? avatarUser : blankPhoto);

    const photoHandle = async (event) => {
        const file = event.target.files[0];
        const storageRef = app.storage().ref();
        const fileRef = storageRef.child(file.name);
        await fileRef.put(file);
        setAvatar(await fileRef.getDownloadURL());
    };
    const changeNumber = (number) => setPhone(number);

    useEffect(() => {
        setPhone(phone);
    }, [phone]);

    const resetAlert = () => {
        setOpen(false);
        setAlert(false);
    };

    const onSubmit = (data) => {
        const phoneNumberInp = infoUser ? infoUser.data.phoneNumber : phone;
        data.phoneNumber = phoneNumberInp;
        setValues(data);
        setAlert(true);
        setOpen(true);
        setTimeout(resetAlert, DELAY_FOR_ALERT);
        localStorage.setItem("avatar", JSON.stringify(profilePhoto));
        localStorage.setItem('User-Info', JSON.stringify({ data }));
    };

    return (
        <>
            <FillForm onSubmit={handleSubmit(onSubmit)} >
                <div className='form__head'>
                    <div className="form__names">
                        <Input
                            ref={register}
                            id='firstName'
                            type='text'
                            label='First name'
                            name='firstName'
                            defaultValue={infoUser ? infoUser.data.firstName : ''}
                            error={!!errors.firstName}
                            helperText={errors?.firstName?.message}
                        />
                        <Input
                            ref={register}
                            id='lastName'
                            type='text'
                            label='Last name'
                            name='lastName'
                            defaultValue={infoUser ? infoUser.data.lastName : ''}
                            error={!!errors.lastName}
                            helperText={errors?.lastName?.message}
                        />
                    </div>

                    <div className='form__avatar'>
                        <div className='form__avatar--block'>
                            <img
                                src={profilePhoto}
                                alt='user avatar'
                                className='avatar'
                            />
                        </div>
                        <Input
                            ref={register}
                            name='loadAvatar'
                            type='file'
                            id='loadAvatar'
                            onChange={photoHandle}
                            error={!!errors.loadAvatar}
                            helperText={errors?.loadAvatar?.message}
                        />
                    </div>

                </div>
                <Input
                    ref={register}
                    id='nickname'
                    type='text'
                    label='Nickname'
                    defaultValue={infoUser ? infoUser.data.nickname : '@'}
                    name='nickname'
                />
                <Input
                    ref={register}
                    id='email'
                    type='email'
                    label='E-mail'
                    name='email'
                    defaultValue={infoUser ? infoUser.data.email : ''}
                    error={!!errors.email}
                    helperText={errors?.email?.message}
                />
                <PhoneInput
                    inputStyle={{ width: '100%' }}
                    country='ua'
                    placeholder='+380991234567'
                    value={infoUser ? infoUser.data.phoneNumber : ''}
                    enableSearch
                    disableSearchIcon
                    preferredCountries={['de', 'es', 'fr', 'ru', 'jp']}
                    onChange={changeNumber}
                />
                <ButtonSubmit>Ok</ButtonSubmit>
            </FillForm>
            {alert &&
                <AlertOwn
                    open={open}
                    resetAlert={resetAlert}
                    text='User add'
                />
            }
        </>
    )
}

