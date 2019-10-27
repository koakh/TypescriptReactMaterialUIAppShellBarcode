import React from 'react';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

interface Props {
  defaultValue?: string;
}

export const MaxHeightTextarea: React.FC<Props> = (props) => <TextareaAutosize rowsMax={10}/>;
