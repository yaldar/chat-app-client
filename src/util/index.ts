type args = {
  socket: SocketIOClient.Socket | null;
  setSocket: React.Dispatch<React.SetStateAction<SocketIOClient.Socket | null>>;
  nickname: string;
};

type CallbackFunc = (
  error: null | Error,
  userArray: String | null,
) => void;

const allUsers = async (callback: CallbackFunc) => {
  try {
    const data = await fetch('http://localhost:8080/api/users');
    const users = await data.json();
    users.forEach((user: String | null) => {
      callback(null, user);
    });
    callback(null, users);
  } catch (e) {
    callback(e, null);
  }
};

const addUser = async (nickname: string) => {
  const body = JSON.stringify({ nickname });
  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body,
  };

  const obj: {
    error: Error | undefined;
    alreadyExists: boolean | undefined;
  } = {
    error: undefined,
    alreadyExists: undefined,
  };

  try {
    const data = await fetch(`http://localhost:8080/api/users/`, options);
    if (data.status === 200) {
      obj.error = undefined;
      obj.alreadyExists = false;
    } else if (data.status === 409) {
      obj.error = undefined;
      obj.alreadyExists = true;
    }
  } catch (e) {
    obj.error = e;
    obj.alreadyExists = undefined;
  }
  return obj;
};

export default { addUser };
