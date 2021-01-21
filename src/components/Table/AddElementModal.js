import React from "react";
import TablePortal from "./TablePortal";
import { Input } from "./PartForTable/Input";
import { ButtonsForTable } from "./PartForTable/ButtonsForTable";

const AddElementModal = ({ title, isModalOpen, setModalOpen }) => {
    const category = React.createRef();
    const description = React.createRef();
    const money = React.createRef();
  return (
    <>{
        isModalOpen && <TablePortal>
        <div className="modalOverlay">
          <div className="modalWindow">
            <div className="modalHeader">Add {title}</div>
            <div className="modalBody">
              <select id="categories" ref={category}>
                <option disabled>Pick category</option>
                {JSON.parse(localStorage.getItem(title + "Categories")).map(
                  (category) => (
                    <option value={category.name} key={category.categoryId}>
                      {category.name}
                    </option>
                  )
                )}
              </select>
              <Input
                  key="9iu8o78kj9hj79kh87jkh"
                  ref={description}
                  id="description"
                  type="text"
                  label="Description"
                  name="description"
              />
              <Input
                  key="21xvc5v1cv23b4ghg5"
                  ref={money}
                  id="money"
                  type="number"
                  label="Money"
                  name="money"
              />
            </div>
            <div className="modalFooter">
            <ButtonsForTable clickBtn={()=>setModalOpen(false)}>
                Cloose
            </ButtonsForTable>
            </div>
          </div>
        </div>
      </TablePortal>
    }
    </>
  );
};

export default AddElementModal;
