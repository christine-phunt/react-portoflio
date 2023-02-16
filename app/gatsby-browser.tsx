import React from 'react';
import { GatsbyBrowser } from 'gatsby';
import { ChakraProvider } from '@chakra-ui/react';

import theme from './src/theme';
import './src/global.css';

const wrapPageElement: GatsbyBrowser['wrapPageElement'] = ({ element }) => {
  return (
    <ChakraProvider theme={theme} resetCSS>
      {element}
    </ChakraProvider>
  );
};

export { wrapPageElement };
