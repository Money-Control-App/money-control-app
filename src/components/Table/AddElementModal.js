import React, { useEffect, useState } from 'react';
import PostAddIcon from '@material-ui/icons/PostAdd';
import TablePortal from './TablePortal';
import { Input } from './PartForTable/Input';
import { ButtonsForTable } from './PartForTable/ButtonsForTable';
import { parseData } from '../Settings/Reminder/untils';
import './AddElementModal.sass';

const AddElementModal = ({ title, isModalOpen, setModalOpen, setElements }) => {
  const [enteredSum, setEnteredSum] = useState('');
  const category = React.createRef();
  const description = React.createRef();
  const money = React.createRef();
  let elementsArr = [];
  let limitData = parseData('limit');

  const isItChargeTable = title === 'charge' ? true : false;

  if (
    limitData === null ||
    (!limitData.limit && !limitData.remind && !limitData.limitInPercents)
  ) {
    limitData = {
      limit: '0',
      limitInPercents: '0',
      remind: false,
    };
  } else {
    if (limitData.limit === '') {
      limitData = { ...limitData, limit: null };
    }
    if (limitData.limitInPercents === '') {
      limitData = { ...limitData, limitInPercents: null };
    }
  }
  const { limit, remind, limitInPercents } = limitData;
  const balance = parseData('balance');

  useEffect(() => {
    elementsArr = JSON.parse(localStorage.getItem(title + 's'));
  });

  function addElement(e) {
    e.preventDefault();
    if (category.current.value && money.current.value > 0) {
      elementsArr.push({
        id: new Date().getDate() + category.current.value + money.current.value,
        category: category.current.value,
        description: description.current.value,
        money: money.current.value,
        date: new Date().toUTCString(),
      });
      description.current.value = '';
      money.current.value = '';
      setEnteredSum('');
    }
    console.log(elementsArr);
    localStorage.setItem(title + 's', JSON.stringify(elementsArr));
    setElements(JSON.parse(localStorage.getItem(title + 's')));
    setModalOpen(false);
  }

  function closeModal(e) {
    e.preventDefault();
    description.current.value = '';
    money.current.value = '';
    setEnteredSum('');
    setModalOpen(false);
  }

  const showReminder = () => {
    if (isItChargeTable && remind) {
      if (limit) {
        if (balance - enteredSum < limit) return true;
      }
      if (limitInPercents) {
        const limit = (balance * limitInPercents) / 100;
        if (balance - enteredSum < limit) return true;
      }
    }
    return false;
  };

  return (
    <>
      {isModalOpen && (
        <TablePortal>
          <div className='modal-overlay'>
            <div className='modal-window'>
              <div className='modal-header'>
                <PostAddIcon fontSize='small' />
                Add {title}
                <select id='categories' ref={category}>
                  <option disabled>Pick category</option>
                  {JSON.parse(localStorage.getItem(title + 'Categories')).map(
                    (category) => (
                      <option value={category.name} key={category.categoryId}>
                        {category.name}
                      </option>
                    )
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
                />
                <Input
                  key='21xvc5v1cv23b4ghg5'
                  ref={money}
                  id='money'
                  type='number'
                  label='Money'
                  name='money'
                  value={enteredSum}
                  onChange={(e) => setEnteredSum(e.target.value)}
                />
              </div>

              {showReminder() ? (
                <p>
                  if you add this cost your balance will be lower than the limit
                </p>
              ) : null}

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
                  clickBtn={addElement}
                >
                  Add
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
