import React, { Component } from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'

/**
 * Alerts are urgent interruptions, requiring acknowledgement, that inform the user about a situation.
 */
class ReqFieldErrorDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: this.props.open
    }
    this.handleOpen = this.handleOpen.bind(this)
  }

  handleOpen() {
    this.props.dialogState();
  };

  handleClose() {
     this.props.dialogState();
  };

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Discard"
        primary={true}
        onTouchTap={this.handleClose}
      />,
    ];

    return (
      <div>
        <Dialog
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          Discard draft?
        </Dialog>
      </div>
    );
  }
}
export default ReqFieldErrorDialog