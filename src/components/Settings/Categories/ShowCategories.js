import React, { useState, useEffect } from 'react';

import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TextField,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    FormControl
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import './show-categories.sass';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';

export const ShowCategories = ({ title }) => {
    const arrayCategories = JSON.parse(localStorage.getItem(title + 'Categories'));
    const numberIcon = (new Array(11).fill(1));
    // const numberEdit = (new Array(arrayCategories.length).fill(0));
    const [icon, setIcon] = useState(null);
    const [nameCategory, setNameCategory] = useState(null);
    const [categories, setCategories] = useState(arrayCategories);
    const handleChangeIcon = (e) => setIcon(e.target.value);
    const editArray = new Array(arrayCategories.length).fill(false);
    const [edit, setEdit] = useState(editArray);
    // setEdit(new Array(arrayCategories.length).fill(false));
    console.log(title)
    console.log(edit)
    console.log(arrayCategories)
    const FormCategory = () => {
        return (
            <form className='form-add-category'>
                <FormControl >
                    <InputLabel id="demo-controlled-open-select-label">Age</InputLabel>
                    <Select
                        className='select-add-category'
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        onChange={handleChangeIcon}
                    >
                        <option aria-label="None" value="" />
                        {numberIcon.map((item, index) =>
                            <MenuItem value={index + 1}><img src={`/img/${title}/${index + 1}.svg`} className='icon-select' /></MenuItem>
                        )}
                    </Select>
                </FormControl>
                <TextField
                    label="Add a new category"
                    type="text"
                    onChange={(e) => setNameCategory(e.target.value)}
                />
                <IconButton aria-label="add" onClick={() => addCategory()}>
                    <AddIcon />
                </IconButton>
            </form>
        )
    }

    const addCategory = () => {
        if ((icon && nameCategory)) {
            categories.push({ categoryId: icon, name: nameCategory });
            localStorage.setItem(title + 'Categories', JSON.stringify(categories));
            setCategories(JSON.parse(localStorage.getItem(title + 'Categories')));
        }
    };

    const handlerDelete = (index) => {
        categories.splice(index, 1);
        localStorage.setItem(title + 'Categories', JSON.stringify(categories));
        setCategories(JSON.parse(localStorage.getItem(title + 'Categories')));
    }

    const handlerEdit = (index) => {
        const newEdit = edit.slice();
        console.log(newEdit)
        newEdit.splice(index, 1, true)
        setEdit(newEdit)
        setCategories(categories)
        console.log(newEdit)
    }
    const handlerSave = (index) => {
        const newEdit = edit.slice();
        console.log(newEdit)
        newEdit.splice(index, 1, false)
        setEdit(newEdit)
        console.log(edit)
    }

    const handlerChangeName = (e, index) => {
        const changeCategory = categories[index];
        changeCategory.name = (e.target.value)
        categories.splice(index, changeCategory);
        localStorage.setItem(title + 'Categories', JSON.stringify(categories));
        setCategories(JSON.parse(localStorage.getItem(title + 'Categories')));
    }

    return (
        <div className='categories-all'>
            <TableContainer component={Paper}>
                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <TableCell>
                            <form className='form-add-category'>
                <FormControl >
                    <InputLabel id="demo-controlled-open-select-label">Age</InputLabel>
                    <Select
                        className='select-add-category'
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        onChange={handleChangeIcon}
                    >
                        <option aria-label="None" value="" />
                        {numberIcon.map((item, index) =>
                            <MenuItem value={index + 1}><img src={`/img/${title}/${index + 1}.svg`} className='icon-select' /></MenuItem>
                        )}
                    </Select>
                </FormControl>
                <TextField
                    label="Add a new category"
                    type="text"
                    onChange={(e) => setNameCategory(e.target.value)}
                />
                <IconButton aria-label="add" onClick={() => addCategory()}>
                    <AddIcon />
                </IconButton>
            </form>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>Categories</TableCell>
                        </TableRow>
                        {arrayCategories.map((category, index) =>
                            <TableRow>
                                {!edit[index] && 
                                    <TableCell>
                                        <div className='category-icon' style={{ background: `url(/img/${title}/${category.categoryId}.svg)` }} />
                                        <div>{category.name}</div>
                                        <DeleteIcon onClick={() => handlerDelete(index)} />
                                        <EditIcon onClick={() => handlerEdit(index)} />
                                    </TableCell>
                                    } 
                                    {edit[index] &&
                                        <TableCell>
                                            {/* <FormControl >
                                                <InputLabel id="demo-controlled-open-select-label">Age</InputLabel>
                                                <Select
                                                    className='select-add-category'
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    onChange={handleChangeIcon}
                                                >
                                                    <option aria-label="None" value="" />
                                                    {numberIcon.map((item, index) =>
                                                        <MenuItem value={index + 1}><img src={`/img/${title}/${index + 1}.svg`} className='icon-select' /></MenuItem>
                                                    )}
                                                </Select>
                                            </FormControl> */}
                                            <TextField
                                                margin='normal'
                                                onChange={(e) => handlerChangeName(e, index)}
                                                defaultValue={category.name}
                                            />
                                            <DoneIcon onClick={() => handlerSave(index)}/>
                                        </TableCell>
                                    }


                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}