import styles from "./addtaskmodal.module.css"
import CustomButton from "../CustomButton/CustomButton"
import red from "../../assets/icons/red.svg"
import blue from "../../assets/icons/blue.svg"
import green from "../../assets/icons/green.svg"
import { Formik, FieldArray } from 'formik';
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


const AddTaskModal = ({setModalView, setAllCard}) => {
  const [ showCalendar, setShowCalendar ] = useState(false)
  return (
    <Formik 
    initialValues={{title: "", priority: "", checklist:[], dueDate: ""}}
    onSubmit={(values) => {
        console.log(JSON.stringify(values,null,2))
    }}
    >
        { formik => (
    <div className={styles.container}>
        <div className={styles.card_container}>
            {showCalendar && <div className={styles.calendar_view}> 
            <Calendar onChange={(value) => 
            {formik.setFieldValue('dueDate', value)
            setShowCalendar(false)
          }} selectRange={false} /> </div>}
            <div className={styles.card_title}>
                <label >Title</label>
                <input type="text" name="" id="title" placeholder="Enter Task Title" onChange={formik.handleChange}/>
            </div>
            <div className={styles.card_priority}>
                <label>Select Priority</label>
                <p className={styles.priority_isActive}> <img src={red} alt="ellipse" /> HIGH PRIORITY</p>
                <p> <img src={blue} alt="ellipse"/>MODERATE PRIORITY</p>
                <p> <img src={green} alt="ellipse"/>LOW PRIORITY</p>

            </div>
            <FieldArray
        name="checklist"
        render={(arrayHelpers) => (
          <div className={styles.card_checklist}>
            <label>Checklist (0/{formik.values.checklist.length || 0})</label>
            <span className={styles.card_checklist_content}>
              {formik.values.checklist?.map((elem, mapIdx) => (
                <div className={styles.task_input}>
                <input
                  key={mapIdx}
                  type='text'
                  id={`checklist[${mapIdx}].title`}
                  placeholder='Add New Task'
                   className={""}
                  onChange={(e) => {
                    const updatedChecklist = [...formik.values.checklist];
                    updatedChecklist[mapIdx] = { title: e.target.value };
                    formik.setFieldValue('checklist', updatedChecklist);
                  }}
                  />
                

                <div className={styles.task_input_checkbox} >
                <input type="checkbox" id={`checklist[${mapIdx}].isChecked`} />
                </div>
                </div>
                
              ))}
              <span
                onClick={() => {
                  formik.setFieldValue('checklist', [...formik.values.checklist, { title: '', isChecked: false }]);
                }}
              >
                + Add New
              </span>
            </span>
          </div>
        )}
      />
 
          

            <div className={styles.button_group}>
                <span className={styles.button_left}>
                <CustomButton type="disabled" title={formik.values?.dueDate ? formik.values.dueDate.toLocaleDateString(): "Select Due Date"} radius={12} onClick={()=> setShowCalendar(true)}/>
                </span>
                <span className={styles.button_right}>
                <CustomButton type="danger" title="Cancel" radius={12} onClick={()=> setModalView(false)}/>
                <CustomButton type="primary" title="Save" radius={12}  onClick={()=> { 
                    setAllCard((prev) => [formik.values])
                    formik.handleSubmit}}/>

                </span>
            </div>
        </div>
    </div>)}

    </Formik>
  )
}

export default AddTaskModal