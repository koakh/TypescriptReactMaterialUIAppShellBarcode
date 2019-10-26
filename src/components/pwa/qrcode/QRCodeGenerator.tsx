import { Box, createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button/Button';
import QRCode from 'qrcode.react';
import * as React from 'react';
import { Fragment, useEffect, useState } from 'react';
import useDimensions from 'react-use-dimensions';
import uuidv4 from 'uuid/v4';

// Hardcoded width and height #12
// https://github.com/zpao/qrcode.react/issues/12

interface Props { }
type Level = 'L' | 'M' | 'Q' | 'H';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1),
    },
    input: {
      display: 'none',
    },
    qrcode: {
      display: 'block', /* svg is "inline" by default */
      height: 'auto', /* reset height */
      width: '100%', /* reset width */ 
      maxWidth: '300px'     
    }
  }),
);

export const QRCodeGenerator: React.FC<Props> = () => {
  const [code, setCode] = useState<string>(uuidv4())
  const classes = useStyles();
  const [canvasDom, setCanvasDom] = useState();
  const [ref, { x, y, width }] = useDimensions();
  // const qrCodeRef = React.useRef(null);
  // const qrCodeRef = React.useRef(<QRCode value={code} level={'H'} />);
  // const qrCode = <QRCode value={code} level={'H'} />;
  // let currentCount = qrCodeRef.current;  
  useEffect(() => {
    //(document.querySelector('.qrcode') as HTMLCanvasElement). = '100%';
    // canvasDom.style.width = '100%';
    // hack with css class sibling
    setCanvasDom(document.querySelector('.qrcode > div > canvas'));
    // require to re-get dom element again
    const canvas: HTMLElement | null = document.querySelector('.qrcode > div > canvas');
    // https://stackoverflow.com/questions/4938346/canvas-width-and-height-in-html5 
    // The canvas DOM element has .height and .width properties that correspond to the height="…" and width="…" attributes. 
    // Set them to numeric values in JavaScript code to resize your canvas.
    // if (canvas) {
    //   canvas.style.width = String(x / 2);
    // };
    console.log(width);
    return () => {
      // cleanup
    };
  }, [width]);

  // type CustomQRCodeProps = QRCodeProps & {
  //   id: string
  // }
  // class CustomQRCode<QRCode = CustomQRCodeProps> extends React.Component<QRCode> {}

  // interface CustomQRCodeProps extends QRCodeProps {
  //   id: string;
  // }
  // class QRCode<T extends QRCodeProps> extends React.Component<T, {}> { }
  // class CustomQRCode extends QRCode<CustomQRCodeProps> {
  //   render() {
  //     // this.props.onClickFunction should be available
  //   }
  // }

  const handleGenerate = () => {
    setCode(uuidv4());
  }

  const handleDownload = () => {
    // https://github.com/zpao/qrcode.react/issues/37
    const pngUrl = canvasDom
      .toDataURL('image/png')
      .replace('image/png', 'image/octet-stream');
    // fake anchor
    let downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = `${code}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

  return (
    <Fragment>
      {/* we can't extend QRCode props to passing an id, and QRCode is render as canvas, this is the hack to get dom element */}
      <Box className='qrcode' width={1}>
        {/* className={classes.qrcode} */}
        <div ref={ref} className={classes.qrcode}>
          {/* This is the element you'll measure with 'ref' */}
          <QRCode renderAs='svg' value={code} level={'H'} size={400}/>
        </div>
      </Box>
      <Typography variant='body1' noWrap>
        {code}
      </Typography>
      <Typography variant='body1' noWrap>
        x:{x}:y:{y}:width:{width}
      </Typography>
      <Button variant='contained' className={classes.button} onClick={handleGenerate}>Generate</Button>
      <Button variant='contained' className={classes.button} onClick={handleDownload}>Download</Button>
    </Fragment>
  );
}