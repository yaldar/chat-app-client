import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import SingleMessage from './SingleMessage';
import LeaveJoinEvent from './LeaveJoinEvent';

const Messages = () => {
  const chat: any[] = useSelector((state: RootState) => state.chatReducer);
  const nickname: string = useSelector(
    (state: RootState) => state.nicknameReducer,
  );

  const bottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView();
  }, [chat]);

  return (
    <div className="messages">
      {chat.map((el) => {
        const { eventType, from, message, timeStamp } = el;
        const fromSelf = nickname === from;

        return eventType === 'new_message' ? (
          <SingleMessage
            user={from}
            message={message}
            fromSelf={fromSelf}
            time={timeStamp}
          />
        ) : (
          <LeaveJoinEvent eventType={eventType} user={from} time={timeStamp} />
        );
      })}
      <div ref={bottomRef} />
    </div>
  );
};

export default Messages;
