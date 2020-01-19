export const SIGNUP = 'SIGNUP' ;
export const LOGIN = 'LOGIN';

export let userId;
export let email;
export const signup = (email, password) => {
    return async dispatch => {
        try{
        const response = await fetch
        (
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAyLMMwl10oMX5kOLLSwR9y9etUQYRhb_g'
        ,{
           method: 'POST',
           headers: {
               'Content-type': 'application/json'
           },
           body: JSON.stringify({
               email: email,
               password: password,
               returnSecureToken: true
           })
        }
        );
        if(!response.ok){
            throw new Error(
                'Something went Wrong'
            );
        }
        const resData = await response.json();
        console.log(resData);
        userId = resData.localId;
        email = resData.email;
        dispatch({ type: SIGNUP, token: resData.idToken, userId: resData.localId,email: resData.email });
        }
        catch(e){
            console.log(e)
        }
    };
  
};
export const login = (email, password) => {
    return async dispatch => {
    try{
        const response = await fetch
        (
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAyLMMwl10oMX5kOLLSwR9y9etUQYRhb_g'
        ,{
           method: 'POST',
           headers: {
               'Content-type': 'application/json'
           },
           body: JSON.stringify({
               email: email,
               password: password,
               returnSecureToken: true
           })
        }
        );
        if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message = 'Something went wrong!';
      if (errorId === 'EMAIL_NOT_FOUND') {
        message = 'This email could not be found!';
      } else if (errorId === 'INVALID_PASSWORD') {
        message = 'This password is not valid!';
      }
      throw new Error(message);
    }

    const resData = await response.json();
    console.log(resData);
    dispatch({ type: LOGIN, token: resData.idToken, userId: resData.localId });
    
  }
  catch(e)
{
    console.log(e)
}
}

};
