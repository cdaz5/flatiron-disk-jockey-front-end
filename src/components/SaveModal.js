import React from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'

const SaveModal = (props) => (
  <Modal open={true} trigger={props.trigger}>
    <Modal.Header>Select a Photo</Modal.Header>
    <Modal.Content image>
      <Image wrapped size='medium' src='/assets/images/avatar/large/rachel.png' />
      <Modal.Description>
        <Header>Default Profile Image</Header>
        <p>Weve found the following gravatar image associated with your e-mail address.</p>
        <p>Is it okay to use this photo?</p>
      </Modal.Description>
    </Modal.Content>
  </Modal>
)

export default SaveModal