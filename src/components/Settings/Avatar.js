import React, { useState } from 'react';
import { Input } from './PartsForm/Input';
import blankPhoto from '../../img/newUser/blank_photo.webp';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import {ButtonSubmit} from './PartsForm/ButtonSubmit';
const schema = yup.object().shape({
    loadAvatar:
        yup.mixed()
            .required("HP")
})
export const Avatar = () => {
    const { register, handleSubmit } = useForm | ({})
    const [profilePhoto, setAvatar] = useState(blankPhoto);

    const photoHandle = (event) => {
        const newPhoto = new FileReader();
        newPhoto.onload = () => {
            if (newPhoto.readyState === 2) {
                setAvatar(newPhoto.result)
            }
        }
        newPhoto.readAsDataURL(event.target.files[0])
    }
    return (
        <div className='form__avatar'>
            <div><img src={profilePhoto} className='avatar' /></div>
            <form noValidate >
                <Input
                    ref={register}
                    className='form__avatar--load'
                    name='loadAvatar'
                    type='file'
                    id='loadAvatar'
                    label='Photo'
                    accept='.png, .jpg, .jpeg'
                    onChange={photoHandle}
                />
            <ButtonSubmit >OK</ButtonSubmit>
            </form>
        </div>
    )
}