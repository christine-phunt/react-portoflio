import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import {
  MDBBtn,
  MDBInputGroup,
  MDBListGroup,
  MDBListGroupItem,
} from 'mdb-react-ui-kit';

import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

function Accordion() {
  const [count, setCount] = useState<number>(0);
  const [data, setData] = useState([]);
  const [expandedAccordions, setExpandedAccordions] = useState<Array<number>>(
    [],
  );
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const fetchData = async () => {
    console.log(count);
    const result = await axios.get(
      `https://jsonplaceholder.typicode.com/posts?_limit=${count}`,
    );
    setData(result.data);
    setExpandedAccordions([]);
  };

  const handleAccordionClick = (index: number) => {
    console.log(expandedAccordions);
    const expanded = expandedAccordions.includes(index);
    console.log(expanded);
    if (expanded) {
      setExpandedAccordions(expandedAccordions.filter((i) => i !== index));
    } else {
      setExpandedAccordions([...expandedAccordions, index]);
    }
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
                    {expandedAccordions.includes(index) ? (
                      <FaChevronUp />
                    ) : (
                      <FaChevronDown />
                    )}
                  </MDBBtn>
                </div>
              </div>
              {expandedAccordions.includes(index) && (
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
  const onClickReset = () => {
    setCount(1);
    setData([]);
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
            <MDBBtn type="button" color="danger" onClick={onClickReset}>
              Reset
            </MDBBtn>
          </MDBInputGroup>
        </div>
      </div>
      <List />
    </>
  );
}

export default Accordion;
