import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    primary: {
      50: '#F4FDFD',
      100: '#E6F8F9',
      200: '#C2EBEE',
      300: '#9CDEE1',
      400: '#73D1D4',
      500: '#4AC4C7',
      600: '#3BAFB2',
      700: '#2C999C',
      800: '#1D8485',
      900: '#126B6C',
    },
    secondary: {
      50: '#FDF9F4',
      100: '#FAF0E6',
      200: '#F5DBBF',
      300: '#F0C796',
      400: '#EBB06E',
      500: '#E79A45',
      600: '#C8843A',
      700: '#A26E2F',
      800: '#7B5824',
      900: '#5F471E',
    },
    accent: {
      50: '#FEF9F7',
      100: '#FDF0ED',
      200: '#FBE1DB',
      300: '#F9D2C9',
      400: '#F7C3B7',
      500: '#F5B4A5',
      600: '#D49D8D',
      700: '#B38775',
      800: '#926F5D',
      900: '#785849',
    },
    neutral: {
      50: '#F7F7F7',
      100: '#F1F1F1',
      200: '#E8E8E8',
      300: '#DEDEDE',
      400: '#D4D4D4',
      500: '#C9C9C9',
      600: '#B1B1B1',
      700: '#989898',
      800: '#7F7F7F',
      900: '#676767',
    },
  },
});

export default theme;