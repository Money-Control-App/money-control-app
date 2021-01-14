import React from 'react';
import FillForm from './FillForm';
import { Input } from './PartsForm/Input';
import { ButtonSubmit } from './PartsForm/ButtonSubmit';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import "yup-phone";
import parsePhoneNumberFromString from 'libphonenumber-js';

const REGULAR_NOT_NUMBER = /^([^0-9]*)$/;
const MESSAGE_FOR_FILL = 'Fill this field';
const phoneRegExp = /^\+(?:[0-9] ?){6,14}[0-9]$/;

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
            .matches(phoneRegExp, 'Phone number is invalid')
});

const formatTheNumber = (inputNumber) => {
    const phoneNumber = parsePhoneNumberFromString(inputNumber);
    return (!phoneNumber) ? inputNumber :
        phoneNumber.formatInternational();
};

export const MainSetting = () => {
    const { register, handleSubmit, errors } = useForm({
        mode: 'onBlur',
        resolver: yupResolver(schema)
    });

    const onSubmit = (data) => {
        console.log(data);
    };
    return (
        <FillForm onSubmit={handleSubmit(onSubmit)} >
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
            <Input
                ref={register}
                id='nickname'
                type='text'
                label='Nickname'
                name='nickname'
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
                error={!!errors.phoneNumber}
                helperText={errors?.phoneNumber?.message}
                onChange={(event) => event.target.value = formatTheNumber(event.target.value)}
            />
            <ButtonSubmit>Ok</ButtonSubmit>
        </FillForm>
    )
}

