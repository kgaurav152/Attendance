
export const CREATE_STUDENT = 'CREATE_STUDENT';




export const createStudent = (name, department, reg_no) => {
  return async dispatch => {
    // any async code you want!
    const response = await fetch('https://attendance-9b23e.firebaseio.com/student.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        department,
        reg_no
      })
    });

    const resData = await response.json();

    dispatch({
      type: CREATE_STUDENT,
      studentData: {
        id: resData.name,
        name,
        department,
        reg_no,
      }
    });
  };
};


