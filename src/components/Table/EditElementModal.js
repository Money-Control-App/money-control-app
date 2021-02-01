import React from 'react';
import PostAddIcon from '@material-ui/icons/PostAdd';

import TablePortal from './TablePortal';
import { Input } from './PartForTable/Input';
import { ButtonsForTable } from './PartForTable/ButtonsForTable';

import './AddElementModal.sass';

const AddElementModal = ({ title, isModalOpen, setModalOpen, setElements, selected, setSelected }) => {
  const category = React.createRef();
  const description = React.createRef();
  const money = React.createRef();
  let elementsArr = [];

  elementsArr = JSON.parse(localStorage.getItem(title + 's'));
  const element = elementsArr.find((element) => element.id === selected[0]);

  function closeModal() {
    description.current.value = '';
    money.current.value = '';
    setModalOpen(false);
  }

  function editElement() {
    if (category.current.value && money.current.value > 0) {
      const newElement = {
        id: new Date(element.date).getDate() + category.current.value + money.current.value,
        category: category.current.value,
        description: description.current.value,
        money: money.current.value,
        date: element.date,
      }
      const newArr = elementsArr.map(elem => {
        if (elem.id === selected[0]) {
          return newElement;
        }
        return elem;
      })
      localStorage.setItem(title + 's', JSON.stringify(newArr));
      setElements(newArr);
      setSelected([]);
      setModalOpen(false);
    }
  }

  return (
    <>
      {isModalOpen && (
        <TablePortal>
          <div className='modal-overlay'>
            <div className='modal-window'>
              <div className='modal-header'>
                <PostAddIcon fontSize='small' />
                Edit {title}
                <select id='categories' ref={category}>
                  <option value={element.category} >{element.category}</option>
                  {JSON.parse(localStorage.getItem(title + 'Categories')).map(
                    (category) => {
                      if (category.name != element.category) {
                        return (
                          <option value={category.name} key={category.categoryId}>
                            {category.name}
                          </option>
                        )
                      }
                    }
                  )}
                </select>
              </div>
              <div className='modal-body'>
                <Input
                  key='9iu8o78kj9hj79kh87jkh'
                  ref={description}
                  id='description'
                  type='text'
                  label='Description'
                  name='description'
                  defaultValue={element.description}
                />
                <Input
                  key='21xvc5v1cv23b4ghg5'
                  ref={money}
                  id='money'
                  type='number'
                  label='Money'
                  name='money'
                  defaultValue={element.money}
                />
              </div>

              <div className='modal-footer'>
                <ButtonsForTable
                  id='btn-add'
                  className={'btn-add'}
                  key='bn87mb87b6n765fg4'
                  clickBtn={closeModal}
                >
                  Close
                </ButtonsForTable>
                <ButtonsForTable
                  key='f87gd98f7gd8fg'
                  className={'btn-add'}
                  clickBtn={editElement}
                >
                  Edit
                </ButtonsForTable>
              </div>
            </div>
          </div>
        </TablePortal>
      )}
    </>
  );
};

export default AddElementModal;
