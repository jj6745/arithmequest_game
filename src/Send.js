import React, { Component } from 'react';
import { addDoc, collection } from 'firebase/firestore';

class Send extends Component {
  sendMessage = () => {
    const message = document.getElementById('message-box-input').value;
    if (message.trim() === '') {
      return;
    }

    // You can write code to send the message to Firebase Firestore
    const { db, auth } = this.props;
    addDoc(collection(db, 'messages'), {
      text: message,
      timestamp: Date.now(),
      userId: auth.currentUser.uid,
    });

    document.getElementById('message-box-input').value = '';
  };

  render() {
    return (
      <div className="message-box">
        <textarea
          id="message-box-input"
          placeholder="Write your message here..."
          rows="4"
          cols="50"
        ></textarea>
        <button className="message-box-button" onClick={this.sendMessage}>
          Send
        </button>
      </div>
    );
  }
}

export default Send;
