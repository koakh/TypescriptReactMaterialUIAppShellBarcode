import { Box, createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button/Button';
import QRCode from 'qrcode.react';
import React, { Fragment, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useGlobalState } from '../../../app/state';
import { subStrCode } from '../../../config/constants';
import { playBeep } from '../../../utils/util';

export type Level = 'L' | 'M' | 'Q' | 'H';
export type RenderAs = 'canvas' | 'svg';
interface Props {
  level?: Level,
  renderAs?: RenderAs,
  maxWidth?: number,
  code?: string,
  uuidMode?: boolean,
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1),
    },
    input: {
      display: 'none',
    },
  }),
);

export const QRCodeGenerator: React.FC<Props> = (props) => {
  const classes = useStyles();
  const [code, setCode] = useState<string>(props.code ? props.code : uuidv4)
  const [canvasDom, setCanvasDom] = useState<Element | null | any>();
  const shellWidth = useGlobalState('shellWidth');

  useEffect(() => {
    // hack with css class sibling
    setCanvasDom(document.querySelector('.qrcode > canvas'));
    return () => {
      // cleanup
    };
  }, []);

  const handleGenerate = () => {
    playBeep();
    setCode(uuidv4());
  }

  const handleDownload = () => {
    // [how to download qrcode](https://github.com/zpao/qrcode.react/issues/37)
    const pngUrl = canvasDom
      .toDataURL('image/png')
      .replace('image/png', 'image/octet-stream');
    // fake anchor to simulate click download
    let downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = `${subStrCode(code)}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

  return (
    <Fragment>
      {/* we can't extend QRCode props to passing an id, and QRCode is render as a canvas element, this is the hack to get dom canvas element */}
      <Box className='qrcode'>
        <QRCode renderAs={props.renderAs} value={code} level={props.level} size={shellWidth < props.maxWidth! ? shellWidth : props.maxWidth} />
      </Box>
      <Typography variant='body1' noWrap>
        {subStrCode(code)}...
      </Typography>
      {props.uuidMode && <Button variant='contained' className={classes.button} onClick={handleGenerate}>Generate</Button>}
      <Button variant='contained' className={classes.button} onClick={handleDownload}>Download</Button>
    </Fragment>
  );
}

QRCodeGenerator.defaultProps = {
  level: 'M',
  renderAs: 'canvas',
  uuidMode: false,
  maxWidth: 360,
}
