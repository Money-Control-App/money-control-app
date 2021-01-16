import React, { useState } from 'react';
import FillForm from './FillForm';
import { Input } from './PartsForm/Input';
import { ButtonSubmit } from './PartsForm/ButtonSubmit';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useData } from './DataUser';
import blankPhoto from '../../img/newUser/blank_photo.webp';
import * as yup from 'yup';
import "yup-phone";
import parsePhoneNumberFromString from 'libphonenumber-js';

const REGULAR_NOT_NUMBER = /^([^0-9]*)$/;
const MESSAGE_FOR_FILL = 'Fill this field';
const PHONE_REGEXP = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;
const TYPE_AVATAR = ["image/jpg",
    "image/jpeg",
    "image/gif",
    "image/png"];

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
    phoneNumber:
        yup.string()
            .required(MESSAGE_FOR_FILL)
            .matches(PHONE_REGEXP, 'Phone number is invalid'),
    loadAvatar:
        yup.mixed()
            .test(
                "fileFormat",
                "Unsupported Format",
                value => value && TYPE_AVATAR.includes(value[0].type)
            )
            .typeError("1234")
});

const formatTheNumber = (inputNumber) => {
    const phoneNumber = parsePhoneNumberFromString(inputNumber);
    return (!phoneNumber) ? inputNumber :
        phoneNumber.formatInternational();
};

export const MainSetting = () => {
    const { data, setValues } = useData();
    const { register, handleSubmit, errors } = useForm({
        mode: 'onBlur',
        resolver: yupResolver(schema)
    });
    // const { register, handleSubmit } = useForm | ({})
    const [profilePhoto, setAvatar] = useState(blankPhoto);

    localStorage.setItem("avatar", (blankPhoto));

    const photoHandle = (event) => {
        const newPhoto = new FileReader();
        newPhoto.onload = () => {
            if (newPhoto.readyState === 2) {
                setAvatar(newPhoto.result)
            }
        }


        newPhoto.readAsDataURL(event.target.files[0]);
    }
    const onSubmit = (data) => {
        // кудась перейти
        console.log(data)
        setValues(data);
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
                        required
                        error={!!errors.firstName}
                        helperText={errors?.firstName?.message}
                    />
                    <Input
                        ref={register}
                        id='lastName'
                        type='text'
                        label='Last name'
                        name='lastName'
                        required
                        error={!!errors.lastName}
                        helperText={errors?.lastName?.message}
                    />
                </div>

                <div className='form__avatar'>
                    <div className='form__avatar--block'><img src={profilePhoto} className='avatar' /></div>
                    <Input
                        ref={register}
                        className='form__avatar--load'
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
                name='nickname'
                defaultValue='@'
            />
            <Input
                ref={register}
                id='email'
                type='email'
                label='E-mail'
                name='email'
                required
                error={!!errors.email}
                helperText={errors?.email?.message}
            />
            <Input
                ref={register}
                id='phoneNumber'
                type='tel'
                label='Phone number'
                name='phoneNumber'
                defaultValue='+38'
                error={!!errors.phoneNumber}
                helperText={errors?.phoneNumber?.message}
                onChange={(event) => event.target.value = formatTheNumber(event.target.value)}
            />
            <ButtonSubmit>Ok</ButtonSubmit>

        </FillForm>

    )
}

