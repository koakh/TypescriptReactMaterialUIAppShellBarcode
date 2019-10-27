import { Box, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import QrReader from 'react-qr-reader';
import { subStrCode } from '../../../config/constants';
import { playBeep } from '../../../utils/util';
import { useGlobalState } from '../../../app/state';

interface Props {
  maxWidth?: number,
}

export const QRCodeReader: React.FC<Props> = (props) => {
  // hooks
  const [state, setState] = useState({ result: 'No result' });
  const [scanList, setScanList] = useState<string[]>([])
  const shellWidth = useGlobalState('shellWidth');

  const handleScan = async (data: string | null) => {
    if (data) {
      setState({
        result: data
      })
      playBeep();
      setScanList([...scanList, data]);
    }
  }

  const handleError = (err: any) => {
    console.error(err)
  }

  return (
    <Box>
      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: shellWidth < props.maxWidth! ? shellWidth : props.maxWidth }}
      />
      <Typography variant="body1">
        {subStrCode(state.result)}
      </Typography>
      {scanList.length ?
        scanList.map(e => <Typography key={e} variant="body2">{subStrCode(e)}</Typography>)
        : <p>please scan some stuff</p>
      }
    </Box>
  )
}

QRCodeReader.defaultProps = {
  maxWidth: 360,
}
