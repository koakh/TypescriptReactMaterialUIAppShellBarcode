import React, { useRef } from 'react'
import QrReader from 'react-qr-reader'
import { useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme, Typography, Box } from '@material-ui/core';

interface Props { }

export const QRCodeReader: React.FC<Props> = () => {
  // hooks
  const [state, setState] = useState({
    result: 'No result'
  });
  const [scanList, setScanList] = useState<string[]>([])
  // const audioPlayerRef: HTMLAudioElement = useRef<HTMLAudioElement>(null);
  // handlers
  const handleScan = (data: any) => {
    if (data) {
      setState({
        result: data
      })
    }
    // audioPlayerRef.play()
    setScanList([...scanList, data]);
  }

  const handleError = (err: any) => {
    console.error(err)
  }

  return (
    <div>
      {/* <audio ref={audioPlayerRef} /> */}
      <Box>
        <QrReader
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={{ width: '100%' }}
        />
        <Typography variant="body1" noWrap>
          {state.result}
        </Typography>
        {scanList.length ? <p>please scan some stuff</p> : scanList.map(e => <Typography key={e} variant="body2" noWrap>{e}</Typography>)}
      </Box>
    </div>
  )
}
