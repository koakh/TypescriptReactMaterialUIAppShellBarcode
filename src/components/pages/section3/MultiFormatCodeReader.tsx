import * as React from 'react';
import { Typography, Box } from '@material-ui/core';
import { Fragment } from 'react';
import { ZXingQRCodeReader } from '../../pwa/zxing/qrcode/ZXingQRCodeReader';

interface Props { }

export const MultiFormatCodeReader: React.FC<Props> = () => {
  return (
    <Fragment>
      <Typography variant="h6" noWrap>
        Multi Format Code Reader
      </Typography>
      <Box color="text.primary" clone>
        <ZXingQRCodeReader />
      </Box>
    </Fragment>
  );
}