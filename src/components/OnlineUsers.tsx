import React from 'react';
import { Menu, Dropdown, Button } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const OnlineUsers = () => {
  const users: string[] = useSelector((state: RootState) => state.usersReducer);
  const nickname: string = useSelector(
    (state: RootState) => state.nicknameReducer,
  );
  const otherUsers = users.filter((u) => u !== nickname);
  const menu = (
    <Menu>
      {otherUsers.map((user, index) => (
        <Menu.Item>
          <div key={user} className="user">
            🟢
            {user}
          </div>
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Dropdown
      className="active-users"
      overlay={menu}
      placement="topCenter"
      trigger={['click']}
    >
      <Button className="active-users-header">Online users:</Button>
    </Dropdown>
  );
};

export default OnlineUsers;
