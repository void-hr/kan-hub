import styles from "./addtaskmodal.module.css"
import CustomButton from "../CustomButton/CustomButton"
import red from "../../assets/icons/red.svg"
import blue from "../../assets/icons/blue.svg"
import bin from "../../assets/icons/Delete.png"
import green from "../../assets/icons/green.svg"
import { Formik, FieldArray } from 'formik';
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { createTask, updateExistingCard } from "../../api/task"


const AddTaskModal = ({setModalView, filteredCardDetails, setFilteredCardDetails, dispatch}) => {
  const [ showCalendar, setShowCalendar ] = useState(false)
  const [ selectedPriority, setSelectedPriority] = useState("")
  // const { _id: cardId, title, category, priority, checklist, dueDate} = filteredCardDetails || {}
  const handleCreateTask = async(value) => {
    try {
        const res = await createTask(value);
      setModalView(false)
    } catch (error) {
      console.log(error.message)
    }

  }
  return (
    <Formik 
    initialValues={{title: "", priority: "", category: "TODO", checklist: [], dueDate: "",}}
    onSubmit={(values, { resetForm }) => {
        handleCreateTask(values)
        
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
                <input type="text" value={formik.values.title} id="title" placeholder="Enter Task Title" onChange={formik.handleChange}/>
            </div>
            <div className={styles.card_priority}>
                <label>Select Priority</label>
                <p className={selectedPriority === "HIGH PRIORITY" || (!selectedPriority && formik.values.priority === "HIGH PRIORITY") ? styles.priority_isActive : "" } id="priority" onClick={()=>{setSelectedPriority("HIGH PRIORITY")
                formik.setFieldValue("priority","HIGH PRIORITY")}}> <img src={red} alt="ellipse" /> HIGH PRIORITY</p>
                <p className={selectedPriority === "MODERATE PRIORITY" || (!selectedPriority && formik.values.priority === "MODERATE PRIORITY") ? styles.priority_isActive : "" } id="priority" onClick={()=>{setSelectedPriority("MODERATE PRIORITY")
                  formik.setFieldValue("priority","MODERATE PRIORITY")}}> <img src={blue} alt="ellipse"/>MODERATE PRIORITY</p>
                <p className={selectedPriority === "LOW PRIORITY" || (!selectedPriority && formik.values.priority === "LOW PRIORITY") ? styles.priority_isActive : "" } id="priority" onClick={()=>{setSelectedPriority("LOW PRIORITY")
                  formik.setFieldValue("priority","LOW PRIORITY")}}> <img src={green} alt="ellipse"/>LOW PRIORITY</p>

            </div>
            <FieldArray
        name="checklist"
        render={(arrayHelpers) => (
          <div className={styles.card_checklist}>
            <label>Checklist (0/{formik.values?.checklist.length || 0})</label>
            <span className={styles.card_checklist_content}>
            {formik.values.checklist.length > 0 ? formik.values.checklist.map((task, mapIdx) => (
                <div  key={mapIdx} className={styles.task_input}>
                <input
                  key={mapIdx}
                  type='text'
                  id={`checklist[${mapIdx}].title`}
                  placeholder='Add New Task'
                  value={task?.title}
                  onChange={(e) => {
                    const updatedChecklist = [...formik.values?.checklist];
                    updatedChecklist[mapIdx] = { title: e.target.value };
                    formik.setFieldValue('checklist', updatedChecklist);
                  }}
                  />
                <div className={styles.task_input_checkbox} >
                <input type="checkbox"
                checked={task?.isChecked} 
                id={`checklist[${mapIdx}].isChecked`} 
                  onChange={(e) => {
                    const updatedChecklist = [...formik.values?.checklist];
                    updatedChecklist[mapIdx].isChecked = e.target.checked;
                    formik.setFieldValue('checklist', updatedChecklist);
                  }}/>
                </div>
                <div className={styles.task_input_bin} ><img src={bin} alt="delete" id={`checklist[${mapIdx}]`} 
                onClick={()=>
                 {
                  const updatedChecklist = [...formik.values?.checklist];
                  updatedChecklist.splice(mapIdx, 1); 
                  formik.setFieldValue('checklist', updatedChecklist)
          }} /></div>
                </div>
                
              )) : ""}
              <span
                onClick={() => {
                  formik.setFieldValue('checklist', [...formik.values?.checklist, { title: '', isChecked: false }]);
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
                <button type="button" className={styles.button_disabled} onClick={()=> setShowCalendar(true)}>
                  {formik.values?.dueDate ?" formik.values.dueDate.toLocaleDateString()" : "Select Due Date" }  </button>
                </span>
                <span className={styles.button_right}>
                <button type="button" className={styles.button_danger} onClick={()=> {setFilteredCardDetails() 
                  setModalView(false)}}>Cancel</button>
                <button type="button" className={styles.button_primary}  onClick={
                    formik.handleSubmit}>Save</button>
                </span>
            </div>
        </div>
    </div>)}

    </Formik>
  )
}

export default AddTaskModal