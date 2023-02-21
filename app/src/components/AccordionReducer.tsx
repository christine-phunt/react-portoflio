import { useState, useEffect, useRef, useReducer } from 'react';
import axios from 'axios';

import {
  MDBBtn,
  MDBInputGroup,
  MDBListGroup,
  MDBListGroupItem,
} from 'mdb-react-ui-kit';

import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

type AccordionAction =
  | { type: 'EXPAND_ACCORDION'; payload: number }
  | { type: 'COLLAPSE_ACCORDION'; payload: number }
  | { type: 'RESET_ACCORDION' };

interface AccordionState {
  expandedAccordions: number[];
}

const initialState: AccordionState = {
  expandedAccordions: [],
};
const accordionReducer = (state: AccordionState, action: AccordionAction) => {
  console.log(action.type);
  switch (action.type) {
    case 'EXPAND_ACCORDION':
      return {
        expandedAccordions: [...state.expandedAccordions, action.payload],
      };
    case 'COLLAPSE_ACCORDION':
      return {
        expandedAccordions: state.expandedAccordions.filter(
          (i) => i !== action.payload,
        ),
      };
    case 'RESET_ACCORDION':
      return { expandedAccordions: [] };
    default:
      return state;
  }
};

function AccordionReducer() {
  const [count, setCount] = useState<number>(0);
  const [data, setData] = useState([]);

  const [accordionState, accordionDispatch] = useReducer(
    accordionReducer,
    initialState,
  );
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  useEffect(() => {
    console.log(accordionState.expandedAccordions);
  }, [accordionState]);

  const fetchData = async () => {
    console.log(count);
    const result = await axios.get(
      `https://jsonplaceholder.typicode.com/posts?_limit=${count}`,
    );
    setData(result.data);
    accordionDispatch({
      type: 'RESET_ACCORDION',
    });
  };

  const handleAccordionClick = (index: number) => {
    const expanded = accordionState.expandedAccordions.includes(index);
    if (expanded) {
      accordionDispatch({ type: 'COLLAPSE_ACCORDION', payload: index });
    } else {
      accordionDispatch({ type: 'EXPAND_ACCORDION', payload: index });
    }
  };

  const handleResetClick = () => {
    setCount(0);
    accordionDispatch({ type: 'RESET_ACCORDION' });
    setData([]);
  };

  const List = () => {
    return (
      <div className="d-flex justify-content-center">
        <MDBListGroup style={{ maxWidth: '40rem' }} light className="mb-3">
          {data.map((item: any, index: number) => (
            <MDBListGroupItem key={item.id}>
              <div
                onClick={() => handleAccordionClick(index)}
                style={{ cursor: 'pointer' }}
                className="d-flex flex-row mb-3"
              >
                <h5 className="fw-bold p-2">{item.title}</h5>
                <div className="p-2 ms-auto">
                  {' '}
                  <MDBBtn size="sm" rounded color="link">
                    {accordionState.expandedAccordions.includes(index) ? (
                      <FaChevronUp />
                    ) : (
                      <FaChevronDown />
                    )}
                  </MDBBtn>
                </div>
              </div>
              {accordionState.expandedAccordions.includes(index) && (
                <div style={{ width: '38rem', paddingLeft: '15px' }}>
                  <p className="text-muted mb-0">{item.body}</p>
                </div>
              )}
            </MDBListGroupItem>
          ))}
        </MDBListGroup>
      </div>
    );
  };

  const onChangeInput = (value: number) => {
    setCount(value);
  };

  return (
    <>
      <div className="d-flex justify-content-center">
        <div className="d-inline-flex p-2">
          <MDBInputGroup className="mb-3" textBefore="Enter count">
            <input
              ref={inputRef}
              className="form-control"
              placeholder="Enter count"
              type="number"
              value={count}
              onChange={(e) => onChangeInput(e.target.value)}
            />
            <MDBBtn type="button" onClick={fetchData}>
              Fetch data
            </MDBBtn>
            <MDBBtn type="button" color="danger" onClick={handleResetClick}>
              Reset
            </MDBBtn>
          </MDBInputGroup>
        </div>
      </div>
      <List />
    </>
  );
}

export default AccordionReducer;
