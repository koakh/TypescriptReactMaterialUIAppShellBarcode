import React, { useEffect, Fragment, useRef } from 'react';
import { BrowserQRCodeReader } from '@zxing/library';
import qrCodeImage from '../../../../assets/images/qrcode.png'

interface Props { }

const videoStyle = {
  border: '1px',
  solid: 'gray',
}

const init = async (image: string) => {
  const codeReader = new BrowserQRCodeReader();
  codeReader
    .listVideoInputDevices()
    .then(videoInputDevices => {
      videoInputDevices.forEach(device =>
        console.log(`${device.label}, ${device.deviceId}`)
      );
    })
    .catch(err => console.error(err));

  // const img = document.getElementById('img');
  try {
    const result = await codeReader.decodeFromImage(image);
    // console.log(result);
  } catch (err) {
    console.error(err);
  };
}

export const ZXingQRCodeReader: React.FC<Props> = (props) => {
  const qrCodeImageRef = useRef(null);
  useEffect(() => {
    init(qrCodeImage);
    return () => {
      // cleanup
    };
  }, [])

  return (
    <Fragment>
      <img ref={qrCodeImageRef} alt='some code' src={qrCodeImage} />
      <div>
        <video
          id="video"
          width="300"
          height="200"
          style={videoStyle}
        ></video>
      </div>
    </Fragment>
  )
}
