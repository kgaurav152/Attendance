export const DELETE_STUDENT = 'DELETE_STUDENT';
export const CREATE_STUDENT = 'CREATE_STUDENT';
export const UPDATE_STUDENT = 'UPDATE_STUDENT';

export const deleteStudent = studentid => {
    return {type: DELETE_STUDENT, sid: studentid};
};

export const createStudent = (name, department, reg_no) => {
    return async dispatch => {
        const response = await fetch('https://attendance-5d980.firebaseio.com/students.json',{
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
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
            studentData:{
                id :resData.name,
                name,
                department,
                reg_no
            }
        });
    };
};

export const updateStudent =(id,name,department,reg_no) => {
    return {
        type: UPDATE_STUDENT,
        sid: id,
        productData: {
            name,
            department,
            reg_no
        }
    };
};