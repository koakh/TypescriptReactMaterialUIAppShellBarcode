import { Box, Button, Radio, makeStyles, Theme, createStyles, FormControl, FormLabel, RadioGroup, FormControlLabel } from '@material-ui/core';
import { BrowserMultiFormatReader, NotFoundException, VideoInputDevice } from '@zxing/library';
import React, { useEffect, Fragment, ReactComponentElement, useState, ChangeEvent } from 'react';
// import qrCodeImage from '../../../../assets/images/qrcode.png';
import { useGlobalState } from '../../../../app/state/state';

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
  // const qrCodeImageRef = useRef(null);
  let codeReader: BrowserMultiFormatReader = new BrowserMultiFormatReader();

  const videoStyle = {
    border: '1px',
    solid: 'gray',
    backgroundColor: 'black',
    width: shellWidth < props.maxWidth! ? shellWidth : props.maxWidth,
    height: 270,
  }
  
  useEffect(() => {
    init();
    return () => { };
  }, []);

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

  const handleStart = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const device: VideoInputDevice = videoInputDevices[selectedDeviceIndex];
    codeReader.decodeFromVideoDevice(device.deviceId, 'video', (result, err) => {
      if (result) {
        console.log(result)
        // document.getElementById('result').textContent = result.text
      }
      if (err && !(err instanceof NotFoundException)) {
        console.error(err)
        // document.getElementById('result').textContent = err
      }
    })
    console.log(`Started continuos decode from camera with id ${selectedDeviceIndex}`)
    setStarted(!started);
  }

  const handleReset = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    codeReader.reset();
    // document.getElementById('result').textContent = '';
    console.log('Reset.');
    setStarted(!started);
  }

  const handleSelectDevice = (event: ChangeEvent<HTMLInputElement>) => {
    console.log((event.target as HTMLInputElement).value);
    setSelectedDeviceIndex(Number((event.target as HTMLInputElement).value));
  };

  // <img ref={qrCodeImageRef} alt='some code' src={qrCodeImage} />
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
    </Fragment>
  )
}

ZXingQRCodeReader.defaultProps = {
  maxWidth: 360,
}
