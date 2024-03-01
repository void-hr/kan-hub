import styles from "./addtaskmodal.module.css"
import red from "../../assets/icons/red.svg"
import blue from "../../assets/icons/blue.svg"
import bin from "../../assets/icons/Delete.png"
import green from "../../assets/icons/green.svg"
import { Formik, FieldArray } from 'formik';
import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { createTask, updateExistingCard } from "../../api/task"
import toast from "react-hot-toast"
import * as Yup from "yup";

const AddTaskModal = ({setModalView, cardData, dispatch}) => {
  const [ showCalendar, setShowCalendar ] = useState(false)
  const [ selectedPriority, setSelectedPriority] = useState("")
  const { _id: cardId, title, category, priority, checklist, dueDate} = cardData || {}
  const [ checkedCount, setCheckedCount] = useState(0)


  const validationSchema = Yup.object({
    title: Yup.string().required('* Title is required'),
    priority: Yup.string().required('* Priority is required'),
    checklist: Yup.array().of(
      Yup.object().shape({
        title: Yup.string().required('Checklist title is required'),
        isChecked: Yup.boolean(),
      })
    ).min(1, 'At least one item in the checklist is required'),
  });

  useEffect(()=> {

    if(checklist?.length > 0){
      const numberOfChecked = checklist?.reduce((count, obj) => {
        return count + (obj.isChecked ? 1 : 0);
      }, 0);
      setCheckedCount(numberOfChecked)
    }
  
  },[checklist])
  const handleCreateTask = async(value) => {
    try {
      setModalView(false)
      if(!cardData) {
        const res = await createTask(value);
        dispatch({
          type: 'ADD_TASK',
          payload: {newData: res.data}
        })
        toast.success("Task Added")
      }else {
        const res = await updateExistingCard(cardId,value);
        dispatch({
          type: 'UPDATE_TASK',
          payload: {updateData: res.data}
        })
        toast.success("Task Modified")
      }
    } catch (error) {
      toast.error(error.message)
    }

  }
  return (
    <Formik 
    initialValues={{title: title || "" , priority:  priority || "", category: "TODO" || category, checklist: checklist || [], dueDate: "" || dueDate,}}
    validationSchema={validationSchema}
    onSubmit={(values) => {
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
                <input type="text" value={formik.values.title} id="title" placeholder="Enter Task Title" onChange={(e)=> formik.setFieldValue("title", e.target.value)}/>
              {formik.errors?.title && <p className={styles.validation_errors}>{formik.errors?.title}</p>}

            </div>
            <div className={styles.card_priority}>
              <span>
                <label>Select Priority</label>
                <p className={selectedPriority === "HIGH PRIORITY" || (!selectedPriority && formik.values.priority === "HIGH PRIORITY") ? styles.priority_isActive : "" } id="priority" onClick={()=>{setSelectedPriority("HIGH PRIORITY")
                formik.setFieldValue("priority","HIGH PRIORITY")}}> <img src={red} alt="ellipse" /> HIGH PRIORITY</p>
                <p className={selectedPriority === "MODERATE PRIORITY" || (!selectedPriority && formik.values.priority === "MODERATE PRIORITY") ? styles.priority_isActive : "" } id="priority" onClick={()=>{setSelectedPriority("MODERATE PRIORITY")
                  formik.setFieldValue("priority","MODERATE PRIORITY")}}> <img src={blue} alt="ellipse"/>MODERATE PRIORITY</p>
                <p className={selectedPriority === "LOW PRIORITY" || (!selectedPriority && formik.values.priority === "LOW PRIORITY") ? styles.priority_isActive : "" } id="priority" onClick={()=>{setSelectedPriority("LOW PRIORITY")
                  formik.setFieldValue("priority","LOW PRIORITY")}}> <img src={green} alt="ellipse"/>LOW PRIORITY</p>
              </span>
              {formik.errors?.priority && <p className={styles.validation_errors}>{formik.errors?.priority}</p>}
            </div>
            <FieldArray
        name="checklist"
        render={(arrayHelpers) => (
          <div className={styles.card_checklist}>
            <label>Checklist ({checkedCount}/{formik.values?.checklist.length || 0})</label>
            <span className={styles.card_checklist_content}>
            {formik.values.checklist.length > 0 ? formik.values.checklist.map((task, mapIdx) => (
                <div  key={mapIdx} className={styles.task_input}>
                <input
                  key={mapIdx}
                  type='text'
                  className={formik.errors.checklist?.[mapIdx]?.title ? styles.validation_errors_sub : ''}
                  id={`checklist[${mapIdx}].title`}
                  placeholder='Add New Task'
                  value={formik.values.checklist[mapIdx].title || ""}
                  onChange={(e) => {
                    const updatedChecklist = [...formik.values?.checklist];
                    updatedChecklist[mapIdx] = { ...updatedChecklist[mapIdx], title: e.target.value };
                    formik.setFieldValue('checklist', updatedChecklist);
                  }}
                  />
                <div className={styles.task_input_checkbox} >
                <input type="checkbox"
                checked={formik.values.checklist[mapIdx].isChecked && formik.values.checklist[mapIdx].isChecked || false } 
                id={`checklist[${mapIdx}].isChecked`} 
                  onChange={(e) => {
                    const updatedChecklist = [...formik.values?.checklist];
                    updatedChecklist[mapIdx] = { ...updatedChecklist[mapIdx], isChecked: e.target.checked };
                    e.target.checked
                      ? setCheckedCount((prev) => prev + 1)
                      : setCheckedCount((prev) => (prev > 0 ? prev - 1 : prev));
                    formik.setFieldValue('checklist', updatedChecklist);
                  }}/>
                </div>
                <div className={styles.task_input_bin} ><img src={bin} alt="delete" id={`checklist[${mapIdx}]`} 
                onClick={(e)=>
                 {
                  const updatedChecklist = [...formik.values?.checklist];
                  updatedChecklist.splice(mapIdx, 1); 
                  {setCheckedCount(updatedChecklist?.reduce((count, obj) => {
                    return count + (obj.isChecked ? 1 : 0);
                  }, 0));};
                  formik.setFieldValue('checklist', updatedChecklist)
          }} />
           </div>
           
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
            {formik.values.checklist.length <= 0 && formik.errors.checklist && (
           <p className={styles.validation_errors}>At least one item in the checklist is required</p>
            )}
          </div>
        )}
      />
            <div className={styles.button_group}>
                <span className={styles.button_left}>
                <button type="button" className={styles.button_disabled} id="dueDate" onClick={()=> setShowCalendar(true)}>
                  {formik.values?.dueDate ? new Date(formik.values.dueDate).toLocaleDateString() : "Select Due Date" }  </button>
                </span>
                <span className={styles.button_right}>
                <button type="button" className={styles.button_danger} onClick={()=> setModalView(false)}>Cancel</button>
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