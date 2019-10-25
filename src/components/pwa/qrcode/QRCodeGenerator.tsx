import * as React from 'react'
import QRCode from 'qrcode.react';
import uuidv4 from 'uuid/v4';
import { Fragment, useState } from 'react';
import Button from '@material-ui/core/Button/Button';
import { createStyles, makeStyles, Theme, Box, Typography } from '@material-ui/core';

interface Props { }

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1),
    },
    input: {
      display: 'none',
    },
    qrcode: {
      width: '100%'
    }
  }),
);

export const QRCodeGenerator: React.FC<Props> = () => {
  const [code, setCode] = useState<string>(uuidv4())
  const classes = useStyles();

  const handleClick = () => {
    setCode(uuidv4());
  }

  return (
    <Fragment>
      <Box>
        <QRCode value={code} size={400} />
      </Box>
      <Typography variant="body1" noWrap>
          {code}
      </Typography>
      <Button variant="contained" className={classes.button} onClick={handleClick}>Generate</Button>
    </Fragment>
  );
}