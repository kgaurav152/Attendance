import {
    DELETE_STUDENT,
    CREATE_STUDENT,
    UPDATE_STUDENT
  } from '../actions/student';
  import STUDENTS from '../../data/dummy-data'
  
  const initialState = {
    availableStudent: STUDENTS,
    userStudent: STUDENTS.filter(stud => stud === 'u1')
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case CREATE_STUDENT:
        const newStudent = new Student(
          action.studentData.id,
          'u1',
          action.studentData.name,
          action.studentData.department,
          action.studentData.reg_no
        );
        return {
          ...state,
          availableStudent: state.availableStudent.concat(newStudent),
          userStudent: state.userStudent.concat(newStudent)
        };
        
    }
    return state;
  };
  