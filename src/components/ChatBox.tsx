import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../state/store';
import SingleMessage from './SingleMessage';


const ChatBox = () => {
  const chat: any[] = useSelector((state: RootState) => state.chatReducer);
  const nickname: string = useSelector(
    (state: RootState) => state?.nicknameReducer,
  );

  const scrollToBottom = () => {
    const bottom = document.getElementById('bottom');
    return bottom?.scrollIntoView();
  };
  useEffect(() => {
    scrollToBottom();
    window.scrollTo(0, 0);
  }, [chat]);

  return (
    <div className="messages">
      {chat.map((el, index) => {
        const sender = el.from === nickname ? 'me' : 'other';
        if (el.eventType === 'user_leave') {
          return (
            <p
              // @ts-ignore
              className="leave"
              key={index}
            >
              {el.from}
              {' '}
              has left the chat
            </p>
          );
        } if (el.eventType === 'user_join') {
          return (
            <p
              // @ts-ignore
              className="join"
              key={index}
            >
              {el.from}
              {' '}
              has joined the chat
            </p>
          );
        } if (el.eventType === 'timeout') {
          return (
            <p
              // @ts-ignore
              className="join"
              key={index}
            >
              {el.from}
              {' '}
              was due to inactivity
            </p>
          );
        }
        return (

            <SingleMessage sender={sender} message={el.message}/>
        );
      })}
      <div id="bottom" />
    </div>
  );
};

export default ChatBox;
