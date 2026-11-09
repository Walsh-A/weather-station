import React, { createRef, CSSProperties } from 'react';

import { TextField } from '@mui/material';

interface Props {
  value: string | number | null;
  validate: Function;
  onValid: Function;
  correctError: Function;
  clearOnFocus?: boolean;
  style?: CSSProperties;
}
interface State {
  value: any;
}

export default class NumberTextField extends React.Component<Props, State> {
  inputRef = createRef<HTMLInputElement>();

  constructor(props: Props) {
    super(props);

    this.state = {
      value: props.value ?? '',
    };
  }

  override render() {
    const { clearOnFocus, style } = this.props;
    const { value } = this.state;

    return (
      <TextField
        value={value}
        onChange={(e) => {
          this.setState({ value: e.target.value });
        }}
        onBlur={() => this.handleChange()}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            this.handleChange();
          }
        }}
        inputRef={this.inputRef}
        onFocus={() => {
          if (clearOnFocus && this.inputRef.current) {
            this.inputRef.current.select();
          }
        }}
        size="small"
        style={style}
        autoComplete="off"
      />
    );
  }

  private checkForError(value: any) {
    const { validate } = this.props;
    return (
      value === null ||
      value === undefined ||
      value === '' ||
      isNaN(value) ||
      (validate && !validate(value))
    );
  }

  private handleChange() {
    const { value } = this.state;
    const { onValid, correctError } = this.props;

    if (this.checkForError(value)) {
      const correctedValue = correctError(value);
      if (correctedValue !== undefined) {
        this.setState({ value: correctedValue ?? '' });
        onValid(correctedValue);
      }
      return;
    }
    if (!isNaN(parseFloat(value))) {
      onValid(parseFloat(value));
    }
  }
}
