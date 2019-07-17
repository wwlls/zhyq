import React, { Component } from 'react';
import { Modal } from 'antd-mobile';
import './modal.scss';

class ModalTip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  
  componentDidMount = () => {
  }



  render = () => {
    let { modal, onClose, title, text, main } = this.props;
    return ( 
      <Modal
        visible={modal}
        transparent
        maskClosable={false}
        onClose={onClose}
        // onClose={this.onClose('modal')}
        title={title}
        footer={[{ text: text, onPress: () => { console.log('ok'); onClose() } }]}
        wrapProps={{ onTouchStart: this.onWrapTouchStart }}
      >
        <div dangerouslySetInnerHTML={{ __html: main }}>
        </div>
      </Modal>
    )
  }
}

export default ModalTip;