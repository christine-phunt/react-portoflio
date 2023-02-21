import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import AccordionV2 from '@/components/AccordionV2';
import AccordionReducer from '@/components/AccordionReducer';

const IndexPage: React.FC = (props) => {
  return (
    <>
      <AccordionV2 />
      <AccordionReducer />
    </>
  );
};

export default IndexPage;
