import React from 'react';
import { Typography, Box } from '@material-ui/core';
import { Fragment } from 'react';
import { QRCodeReader } from '../../pwa/qrcode/QRCodeReader';

interface Props { }

export const CodeReader: React.FC<Props> = () => {
  return (
    <Fragment>
      <Typography variant="h6" noWrap>
        CodeReader
      </Typography>
      <Box>
        <QRCodeReader />
      </Box>
    </Fragment>
  );
}