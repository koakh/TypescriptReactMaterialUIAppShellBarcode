import { Box, Typography } from '@material-ui/core';
import * as React from 'react';
import { Fragment } from 'react';
import { QRCodeGenerator } from '../../pwa/qrcode/QRCodeGenerator';

interface Props { }

export const CodeGenerator: React.FC<Props> = () => {
  return (
    <Fragment>
      <Typography variant="h6" noWrap>
        CodeGenerator
      </Typography>
      <Box>
        <QRCodeGenerator uuidMode={true}/>
      </Box>
    </Fragment>
  );
}