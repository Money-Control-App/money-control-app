import React from 'react';

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
    Select
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import './show-categories.sass';
const arrayCategories = JSON.parse(localStorage.getItem('charge' + 'Categories'));
const numberIcon = (new Array(11).fill(1));
const lastId = arrayCategories.pop().categoryId;
export const ShowCategories = () => {
    const addCategory = () => {

    };
    return (
        <div>
            <TableContainer component={Paper}>
                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <form >
                                    <InputLabel id="demo-simple-select-label">Age</InputLabel>
                                    <Select
                                        className='select-add-category'
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        // value={age}
                                        // onChange={handleChange}
                                    >
                                        {numberIcon.map((item, index) => 
                                                <MenuItem value={10}><img src = {`/img/charge/${index+1}.svg`} className='icon-select' /></MenuItem>
                                        )}
                                    </Select>
                                    <TextField
                                        label="Add a new category"
                                        type="text"
                                    />
                                    <IconButton aria-label="add" onClick={addCategory}>
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
                        {arrayCategories.map(category => {
                            return (
                                <TableRow>
                                    <TableCell>
                                        <div className='category-icon' style={{ background: `url(/img/${'income'}/${category.categoryId}.svg)` }} />
                                        <div>{category.name}</div>
                                    </TableCell>
                                </TableRow>
                            )
                        })

                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}