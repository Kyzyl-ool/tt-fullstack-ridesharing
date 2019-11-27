import React, { PureComponent } from 'react';
import { TextField } from '@material-ui/core';
import './EditableField.scss';

interface IEditableFieldProps {
  value?: string;
  id: string;
  label: string;
  placeholder?: string;
  onReady?: (name: string, value: string) => void;
  fullWidth?: boolean;
  textClassName?: string;
}

interface IEditableFieldState {
  isActivated: boolean;
  value: string;
}

export default class EditableField extends PureComponent<IEditableFieldProps, {}> {
  public state = {
    isActivated: false,
    value: ''
  };

  public componentDidMount() {
    if (this.props.value) {
      this.setState({ value: this.props.value });
    }
  }

  public componentDidUpdate = (prevProps: IEditableFieldProps) => {
    if (this.props.value !== prevProps.value) {
      this.setState({ value: this.props.value });
    }
  };

  public onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    this.setState({ value: e.currentTarget.value });
  };

  public onActivate = () => {
    this.setState({ isActivated: true });
  };

  public onAccept = () => {
    this.props.onReady(this.props.id, this.state.value);
    this.setState({ isActivated: false });
  };

  public render() {
    const { isActivated, value } = this.state;
    const { id, placeholder = '', label, fullWidth = false, textClassName = '' } = this.props;
    return (
      <div>
        {isActivated ? (
          <div className="editable-field__field-wrapper">
            <TextField
              id={id}
              label={label}
              value={value}
              placeholder={placeholder}
              margin="normal"
              onChange={this.onChange}
              variant="outlined"
              fullWidth={fullWidth}
            />
            <button className="editable-field__ok-button" onClick={this.onAccept} type="button" />
          </div>
        ) : (
          <div className="editable-field__field-wrapper">
            <p className={textClassName}>{value}</p>
            <button className="editable-field__edit-button" onClick={this.onActivate} type="button" />
          </div>
        )}
      </div>
    );
  }
}
