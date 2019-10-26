import * as React from 'react';
import { Typography, Box } from '@material-ui/core';
import { Fragment } from 'react';

interface Props { }

export const Profile: React.FC<Props> = () => {
  return (
    <Fragment>
      <Typography variant="h6" noWrap>
        Profile
      </Typography>
      <Box color="text.primary" clone>
        <Typography paragraph>
        Nulla ac ullamcorper turpis, non egestas leo. Aliquam eget augue elit. Morbi sed diam nisi. Phasellus consequat ante eget ullamcorper mattis. 
        Morbi a rhoncus est. Donec sed nulla lobortis, auctor odio quis, ultricies lectus. Mauris egestas risus sed dolor gravida gravida. 
        Praesent suscipit magna magna, eget elementum nunc sodales vel.
      </Typography>
      </Box>
    </Fragment>
  );
}