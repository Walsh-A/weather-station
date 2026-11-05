import React, { createRef } from 'react';
import type { CSSProperties, KeyboardEventHandler } from 'react';

import type {
  InputBaseComponentProps,
  InputBaseProps,
  TextFieldProps,
} from '@mui/material';
import { Button, Stack, TextField } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { cyan } from '@mui/material/colors';
import type { SxProps, Theme } from '@mui/material/styles';

interface Props {
  value: any;
  onValid: Function;
  validate?: Function;
  onError?: Function;
  precision?: number; // Make precision optional
  className?: string;
  style?: CSSProperties;
  stackStyle?: CSSProperties;
  slotProps?: Pick<
    NonNullable<TextFieldProps['slotProps']>,
    'input' | 'htmlInput'
  >;
  htmlInputProps?: InputBaseComponentProps;
  showError?: boolean;
  label?: string;
  disabled?: boolean;
  onBlur?: InputBaseProps['onBlur'];
  onKeyDown?: KeyboardEventHandler | undefined;
  autoFocus?: boolean;
  autocomplete?: 'on' | 'off';
  clearOnFocus?: boolean;
  correctError?: Function;
  correctErrorAfterAction?: Function;
  spinnerIncrement?: number;
  wheelIncrement?: number;
  sx?: SxProps<Theme>;
}
interface State {
  value: any;
}

export default class NumberTextField extends React.Component<Props, State> {
  debounceTimer: number | null = null;
  inputRef = createRef<HTMLInputElement>();

  constructor(props: Props) {
    super(props);
    const { value, precision } = this.props;
    this.state = {
      value:
        value !== undefined && value !== ''
          ? this.formatValue(value, precision)
          : '',
    };
  }

  override componentDidUpdate(prevProps: Props) {
    const { value, precision } = this.props;

    const prevN = Number(prevProps.value);
    const currN = Number(value);

    if (isFinite(prevN) && isFinite(currN) && prevN !== currN) {
      return this.setState({ value: this.formatValue(currN, precision) });
    }

    if (prevProps.precision !== precision) {
      this.setState({ value: this.formatValue(currN, precision) });
    }
  }

  override componentWillUnmount() {
    if (this.debounceTimer) {
      window.clearTimeout(this.debounceTimer);
    }
  }

  override render() {
    const {
      style,
      stackStyle,
      className,
      validate,
      showError,
      label,
      slotProps,
      htmlInputProps,
      onError,
      disabled,
      autoFocus,
      autocomplete,
      clearOnFocus,
      spinnerIncrement,
      sx,
      onBlur,
      onKeyDown,
    } = this.props;
    const { value } = this.state;

    const isInvalid =
      isNaN(value) || (validate && !validate(value)) || showError;

    return (
      <Stack
        direction="row"
        spacing={0.5}
        style={stackStyle}
        onWheel={(e) => this.handleMouseWheelEvent(e)}
        sx={{
          alignItems: 'center',
        }}
      >
        <TextField
          label={label || null}
          value={value}
          className={className}
          disabled={disabled}
          onChange={(e) => {
            onError?.(this.checkForError(e.target.value));
            this.setState({ value: e.target.value });
          }}
          onBlur={(e) => {
            this.handleChange();
            onBlur?.(e);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              this.handleChange();
            }
            onKeyDown?.(e);
          }}
          inputRef={this.inputRef}
          onFocus={() => {
            if (clearOnFocus && this.inputRef.current) {
              this.inputRef.current.select();
            }
          }}
          size="small"
          style={style}
          error={isInvalid}
          autoFocus={autoFocus || false}
          autoComplete={autocomplete || 'off'}
          slotProps={{
            ...slotProps,
            htmlInput: {
              ...slotProps?.htmlInput,
              ...htmlInputProps,
            },
          }}
          sx={sx}
        />
        {spinnerIncrement && this.renderSpinners()}
      </Stack>
    );
  }

  private renderSpinners() {
    return (
      <Stack
        spacing={0.5}
        sx={
          {
            //   zIndex: ZIndex.Raise_1,
          }
        }
      >
        {this.renderSpinner(true)}
        {this.renderSpinner()}
      </Stack>
    );
  }

  private renderSpinner(flip?: boolean) {
    const { spinnerIncrement = 0, onValid, precision } = this.props;
    const { value } = this.state;
    const size = 20;

    return (
      <Button
        onClick={() => {
          const numValue = Number(value);
          if (!isFinite(numValue)) return;

          const delta = flip ? spinnerIncrement : -spinnerIncrement;
          const next = numValue + Number(delta || 0);
          const nextStr = this.formatValue(next, precision);

          if (!this.checkForError(nextStr) && !isNaN(parseFloat(nextStr))) {
            this.setState({ value: nextStr });
            onValid(parseFloat(nextStr));
          }
        }}
        style={{
          //   border: `1px solid ${colorMutedMostest}`,
          width: size,
          height: size,
        }}
      >
        <ExpandMore
          style={{ color: cyan[500], rotate: flip ? '180deg' : '0deg' }}
        />
      </Button>
    );
  }

  handleMouseWheelEvent(e: React.WheelEvent) {
    const { wheelIncrement, precision, onValid } = this.props;
    if (!wheelIncrement) return;

    const { value } = this.state;
    const direction = e.deltaY < 0 ? 1 : -1;
    const increment = direction * wheelIncrement;

    const numValue = Number(value);
    if (!isFinite(numValue)) return;

    const next = numValue + increment;
    const nextStr = this.formatValue(next, precision);

    if (!this.checkForError(nextStr) && !isNaN(parseFloat(nextStr))) {
      this.setState({ value: nextStr });
      onValid(parseFloat(nextStr));
    }
  }

  checkForError(value: any) {
    const { validate } = this.props;
    return isNaN(value) || (validate && !validate(value)) || value === '';
  }

  handleChange() {
    const { value } = this.state;
    const { onValid, correctError, correctErrorAfterAction } = this.props;

    if (this.checkForError(value)) {
      if (correctError) {
        const correctedValue = correctError(value);
        if (correctedValue !== undefined) {
          this.setState({ value: correctedValue });
          onValid(correctedValue);
        }
        if (correctErrorAfterAction) {
          correctErrorAfterAction();
        }
        return;
      } else {
        return;
      }
    }

    if (!isNaN(parseFloat(value))) {
      onValid(parseFloat(value));
    }
  }

  formatValue(v: any, precision?: number) {
    const n = Number(v);
    if (!isFinite(n)) return v ?? ''; // don't format invalid numbers
    return typeof precision === 'number' ? n.toFixed(precision) : String(n);
  }
}
