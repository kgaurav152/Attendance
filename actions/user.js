


export const CREATE_USER = 'CREATE_USER';

export const createUser = (userId, email, role) => {
    return async dispatch => {
      // any async code you want!
      const response = await fetch(
        'https://attendance-9b23e.firebaseio.com//user.json',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            userId,
            email,
            role
          })
        }
      );
  
      const resData = await response.json();
      console.log(resData)
      dispatch({
        type: CREATE_USER,
        userData: {
          id: resData.name,
          userId,
          email,
          role
        }
      });
    };
  };