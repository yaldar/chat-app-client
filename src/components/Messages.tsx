import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import SingleMessage from './SingleMessage';
import LeaveOrJoinEvent from './LeaveOrJoinEvent';

const scrollToBottom = () => {
  const bottom = document.querySelector('.bottom');
  if (bottom) bottom.scrollIntoView();
};

const Messages = () => {
  const chat: any[] = useSelector((state: RootState) => state.chatReducer);
  const nickname: string = useSelector(
    (state: RootState) => state.nicknameReducer,
  );

  useEffect(() => {
    scrollToBottom();
  }, [chat]);

  return (
    <div className="messages">
      {chat.map((el) => {
        const { eventType, from, message } = el;
        const fromSelf = nickname === from;

        return eventType === 'new_message' ? (
          <SingleMessage user={from} message={message} fromSelf={fromSelf} />
        ) : (
          <LeaveOrJoinEvent eventType={eventType} user={from} />
        );
      })}
      <div className="bottom" />
    </div>
  );
};

export default Messages;
