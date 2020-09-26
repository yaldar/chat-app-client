const addUser = async (nickname: string) => {
  const body = JSON.stringify({ nickname });
  const obj: {
    error: Error | undefined;
    alreadyExists: boolean | undefined;
    nickname: String | undefined;
  } = {
    error: undefined,
    alreadyExists: undefined,
    nickname: undefined,
  };
  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body,
  };

  try {
    const data = await fetch(`http://localhost:8080/api/users/`, options);
    if (data.status === 201) {
      obj.nickname = await data.json();
      obj.error = undefined;
      obj.alreadyExists = false;
    } else if (data.status === 409) {
      // obj.error = new Error('username taken');
      obj.alreadyExists = true;
    }
  } catch (e) {
    obj.error = e;
    obj.alreadyExists = undefined;
  }
  return obj;
};

export default { addUser };
