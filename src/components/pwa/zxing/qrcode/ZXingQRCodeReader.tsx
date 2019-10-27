import { Box, Button, Radio, makeStyles, Theme, createStyles, FormControl, FormLabel, RadioGroup, FormControlLabel } from '@material-ui/core';
import { BrowserMultiFormatReader, NotFoundException, VideoInputDevice, Result, Exception } from '@zxing/library';
import React, { useEffect, Fragment, ReactComponentElement, useState, ChangeEvent } from 'react';
import { useGlobalState } from '../../../../app/state/state';
import { playBeep } from '../../../../utils/util';
import { MaxHeightTextarea } from '../../../common/MaxHeightTextarea';

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
  const [output, setOutput] = useState<string | null>(null)
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
    setStarted(!started);
    console.log(`Started continuos decode from camera with id ${selectedDeviceIndex}`)
    codeReader.decodeFromVideoDevice(device.deviceId, 'video', (result, error) => {
      if (result) {
        playBeep();
        setOutput(`${output}\n${result.getText()}:${result.getBarcodeFormat()}`);
        console.log(result);
      }
      if (error && !(error instanceof NotFoundException)) {
        setOutput(`${output}\n${error.message}`);
        console.error(error)
      }
    })
  }

  const handleReset = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    codeReader.reset();
    setOutput(null);
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
      <Box>
        <MaxHeightTextarea>
          {output}
        </MaxHeightTextarea>
      </Box>
    </Fragment>
  )
}

ZXingQRCodeReader.defaultProps = {
  maxWidth: 360,
}
