import * as React from 'react';
import { Typography } from '@material-ui/core';

interface Props { }

export const Community: React.FC<Props> = () => {
  return (
    <Typography variant="h6" noWrap>
      Community
    </Typography>
  );
}