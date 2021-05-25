import { transform } from '@babel/core';
import { green, grey } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';

export const radioStyles = makeStyles({
  root: {
    color: grey[100],
  },
  label: {
    fontSize: '2.1rem',
  },
});

export const useStyles = makeStyles({});
