import React, { useState, useEffect } from 'react';
import FillForm from './FillForm';
import { Input } from './PartsForm/Input';
import { ButtonSubmit } from './PartsForm/ButtonSubmit';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useData } from './DataUser';
import blankPhoto from '../../img/newUser/blank_photo.webp';
import * as yup from 'yup';
import "yup-phone";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/material.css';
import './form.sass';
const REGULAR_NOT_NUMBER = /^([^0-9]*)$/;
const MESSAGE_FOR_FILL = 'Fill this field';
const PHONE_REGEXP = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;
const TYPE_AVATAR = ["image/jpg",
    "image/jpeg",
    "image/gif",
    "image/png",
    "image/webp"];

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
    // loadAvatar:
    //     yup.mixed()
    //         .test(
    //             "fileFormat",
    //             "Unsupported Format",
    //             value => TYPE_AVATAR.includes(value.type)
    //         )
});

export const MainSetting = () => {
    const [phone, setPhone] = useState();

    const { data, setValues } = useData();
    const { register, handleSubmit, errors } = useForm({
        mode: 'onBlur',
        resolver: yupResolver(schema)
    });

    const infoUser = JSON.parse(localStorage.getItem("User-Info"));
    const avatarUser = JSON.parse(localStorage.getItem("avatar"));
    const [profilePhoto, setAvatar] = useState(avatarUser? avatarUser : blankPhoto);
console.log(infoUser)
    const photoHandle = (event) => {
        const newPhoto = new FileReader();
        newPhoto.onload = () => {
            if (newPhoto.readyState === 2) {
                setAvatar(newPhoto.result)
            }
        }
        newPhoto.readAsDataURL(event.target.files[0]);
    }

    const changeNumber = (number) => {
        setPhone(number)
    }

    useEffect(() => {
        setPhone(phone)
    }, [phone]);

    const onSubmit = (data) => {
        const phoneNumberInp = infoUser ? infoUser.data.phoneNumber : phone;
        data.phoneNumber = phoneNumberInp;
        setValues(data);
        localStorage.setItem("avatar", JSON.stringify(profilePhoto));
        localStorage.setItem('User-Info', JSON.stringify({ data }));
    };

    return (
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
                    <div className='form__avatar--block'><img src={profilePhoto} className='avatar' /></div>
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

    )
}

