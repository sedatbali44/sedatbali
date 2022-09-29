import {
  AlertTitle,
  Snackbar,
  ButtonBase,
  Switch,
  FormGroup,
  CardHeader,
  RadioGroup,
  Radio,
  FormLabel,
  FormControlLabel,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  InputAdornment,
  Stack,
  Toolbar,
  Container,
  Paper,
  Box,
  Grid,
  Divider,
  Typography,
  Button,
  Table,
  TableCell,
  TableRow,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  useTheme,
  styled,
  IconButton,
  Tooltip,
  Card,
  CardContent,
  CardActions,
  Autocomplete,
  CircularProgress,
  TextField,
  Alert,
  LinearProgress,
  Checkbox,
} from '@mui/material';

import {
  red,
  blue,
  teal,
  green,
  purple,
  orange,
  indigo,
  lime,
  lightGreen,
  amber,
  yellow,
  blueGrey,
} from '@mui/material/colors';

import TableCustomized from 'components/TableCustomized';

import RangeDateInput from 'components/RangeDateInput';

import Modal from 'components/Modal';
import { DialogAnimate } from 'components/animate';
import Iconify from 'components/Iconify';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { useState, useEffect, useContext, useRef } from 'react';

import { startOfDay, endOfDay, format } from 'date-fns';

const AlertMessage = ({ onClose = () => {}, severity = 'error', children }) => (
  <Alert severity={severity} sx={{ position: 'relative' }}>
    {children}
    <IconButton
      onClick={() => {
        onClose();
      }}
      sx={{ padding: 0, color: red[900], position: 'absolute', right: 8 }}
    >
      <Iconify icon={'ep:circle-close'}></Iconify>
    </IconButton>
  </Alert>
);

const colors = [
  red[400],
  blue[400],
  teal[400],
  green[400],
  purple[400],
  orange[400],
  indigo[400],
  lime[400],
  lightGreen[400],
  amber[400],
  yellow[400],
  blueGrey[400],
];

const stateClear = (obj) => {
  const newObj = { ...obj };
  Object.keys(newObj).map((item) => {
    newObj[item] = '';
    return item;
  });

  return newObj;
};

export {
  Switch,
  FormGroup,
  CardHeader,
  Select,
  MenuItem,
  InputLabel,
  colors,
  stateClear,
  Stack,
  LinearProgress,
  Toolbar,
  RangeDateInput,
  TableCustomized,
  AlertMessage,
  TextField,
  CircularProgress,
  Autocomplete,
  Card,
  CardContent,
  CardActions,
  DialogAnimate,
  Modal,
  IconButton,
  Tooltip,
  format,
  startOfDay,
  endOfDay,
  useTheme,
  styled,
  Paper,
  Box,
  Grid,
  Divider,
  Typography,
  Iconify,
  Button,
  useState,
  useEffect,
  useContext,
  useRef,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  Table,
  TableCell,
  TableRow,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  red,
  blue,
  teal,
  green,
  purple,
  orange,
  Container,
  InputAdornment,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Checkbox,
  FormControl,
  ButtonBase,
  Alert,
  Snackbar,
  AlertTitle,
};
