import { Box, Button, createStyles, FormControl, FormControlLabel, FormLabel, makeStyles, Radio, RadioGroup, Theme, Typography } from '@material-ui/core';
import { BrowserMultiFormatReader, NotFoundException, VideoInputDevice } from '@zxing/library';
import React, { ChangeEvent, Fragment, useEffect, useState } from 'react';
import { useGlobalState } from '../../../../app/state/state';
import { subStrCode } from '../../../../config/constants';
import { playBeep } from '../../../../utils/util';

interface Props {
  maxWidth?: number,
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {},
  }),
);

export const ZXingQRCodeReader: React.FC<Props> = (props) => {
  const classes = useStyles();
  const shellWidth = useGlobalState('shellWidth');
  const [videoInputDevices, setVideoInputDevices] = useState<VideoInputDevice[]>([]);
  const [selectedDeviceIndex, setSelectedDeviceIndex] = useState<number>(0);
  const [started, setStarted] = useState(false);
  // const [output, setOutput] = useState<string | null>(null)
  const [scanList, setScanList] = useState<string[]>([])
  // const qrCodeImageRef = useRef(null);
  let codeReader: BrowserMultiFormatReader = new BrowserMultiFormatReader();

  const videoStyle = {
    border: '1px',
    solid: 'gray',
    backgroundColor: 'black',
    width: shellWidth < props.maxWidth! ? shellWidth : props.maxWidth,
    height: 270,
  }

  const init = async () => {
    try {
      console.log('ZXing code reader initialized')
      const devices: VideoInputDevice[] = await codeReader.getVideoInputDevices()
        .catch((error) => {
          throw (error);
        });
      // set state  
      setVideoInputDevices(devices);
    } catch (error) {
      console.error(error)
    }
  };

  useEffect(() => {
    init();
    // cleanUp
    return () => { };
    // don't use dependency array `}, []);` here else we have
    // React Hook useEffect has a missing dependency: 'init'. Either include it or remove the dependency array  react-hooks/exhaustive-deps
  });

  const handleStart = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const device: VideoInputDevice = videoInputDevices[selectedDeviceIndex];
    setStarted(!started);
    console.log(`Started continuos decode from camera with id ${selectedDeviceIndex}`)
    codeReader.decodeFromVideoDevice(device.deviceId, 'video', (result, error) => {
      if (result) {
        playBeep();
        setScanList([...scanList, `${result.getText()}:${result.getBarcodeFormat()}`]);
        // setOutput(`${output}\n${result.getText()}:${result.getBarcodeFormat()}`);
        console.log(result);
      }
      if (error && !(error instanceof NotFoundException)) {
        // setOutput(`${output}\n${error.message}`);
        setScanList([...scanList, `${error}`]);
        console.error(error)
      }
    })
  }

  const handleReset = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    codeReader.reset();
    setScanList([]);
    console.log('Reset.');
    setStarted(!started);
  }

  const handleSelectDevice = (event: ChangeEvent<HTMLInputElement>) => {
    console.log((event.target as HTMLInputElement).value);
    setSelectedDeviceIndex(Number((event.target as HTMLInputElement).value));
  };

  return (
    <Fragment>
      <Box component='video' id='video' style={videoStyle} />
      <Box>
        <Button variant='contained' disabled={started} onClick={handleStart}>Start</Button>
        <Button variant='contained' disabled={!started} onClick={handleReset}>Reset</Button>
      </Box>
      <FormControl component='fieldset' className={classes.formControl} margin='normal'>
        <FormLabel component='legend'>Device camera</FormLabel>
        <RadioGroup aria-label='device' name='device' value={selectedDeviceIndex} onChange={handleSelectDevice}>
          {videoInputDevices.map((e: VideoInputDevice, index: number) => (
            <FormControlLabel control={<Radio />} key={index} label={e.label} value={index} />
          ))}
        </RadioGroup>
      </FormControl>
      {scanList.length ?
        scanList.map(e => <Typography key={e} variant="body2">{subStrCode(e)}</Typography>)
        : <p>please scan some stuff</p>
      }
    </Fragment>
  )
}

ZXingQRCodeReader.defaultProps = {
  maxWidth: 360,
}
