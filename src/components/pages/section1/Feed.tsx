import * as React from 'react';
import { Typography } from '@material-ui/core';

interface Props { }

export const Feed: React.FC<Props> = () => {
  return (
    <Typography variant="h6" noWrap>
      Feed
    </Typography>
  );
}