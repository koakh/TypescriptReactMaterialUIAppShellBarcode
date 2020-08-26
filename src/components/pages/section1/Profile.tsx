import * as React from 'react';
import { Typography, Box } from '@material-ui/core';
import { Fragment } from 'react';
import { QRCodeGenerator } from '../../pwa/qrcode/QRCodeGenerator';

interface Props { }

export const Profile: React.FC<Props> = () => {
  const code: string = `MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC7vO2pe5LZUMuYOyBq5QQPbhvz
3n96LlF++6LumW8ePdW7k+k/Z7Rc3WknkGI8NXTBFfSR5ja4kRhFM+tsKTn4W+Av
/7gDfTgxjqFsWkWFc7Mi6GaJlWn8M8ZvI/LFTYAAaej4+EdgRfaS6G5zujkjZwxt
tpIkOJUnwMuw+pRnywIDAQAB`;
//   const codeFinal: string = `-----BEGIN PUBLIC KEY-----
// ${code}
// -----END PUBLIC KEY-----`;

  return (
    <Fragment>
      <Typography variant="h6" noWrap>
        Profile
      </Typography>
      <Box>
        <QRCodeGenerator code={code} />
      </Box>
    </Fragment>
  );
}