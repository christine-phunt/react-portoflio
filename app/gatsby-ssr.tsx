import React from 'react';
import { GatsbySSR } from 'gatsby';
import { ChakraProvider } from '@chakra-ui/react';

import theme from './src/theme';
import './src/global.css';

const wrapPageElement: GatsbySSR['wrapPageElement'] = ({ element }) => {
  return (
    <ChakraProvider theme={theme} resetCSS>
      {element}
    </ChakraProvider>
  );
};

export { wrapPageElement };
