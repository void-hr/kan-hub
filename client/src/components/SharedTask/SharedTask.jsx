import { useResolvedPath } from "react-router-dom";
import red from "../../assets/icons/red.svg";
import blue from "../../assets/icons/blue.svg";
import green from "../../assets/icons/green.svg";
import { getTaskById } from "../../api/task"
import styles from "./sharedtask.module.css"
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const SharedTask = () => {
    const { pathname } = useResolvedPath();
    const cardId = pathname?.split("/").pop();
    const [cardData, setCardData] = useState({})
    const [ checkedCount, setCheckedCount] = useState(0)
    const { priority, checklist, dueDate, title } = cardData || { }

    useEffect(()=> {
        fetchTaskData();
    }, [])

    useEffect(()=> {
        if(cardData) {
            const numberOfChecked = checklist?.reduce((count, obj) => {
                return count + (obj.isChecked ? 1 : 0);
              }, 0);
              setCheckedCount(numberOfChecked)
        }
    }, [cardData])


    const fetchTaskData = async() => {
        try {
            const { findCard } = await getTaskById(cardId)
            if(findCard){
                setCardData(findCard)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
  return (
    <>
   { Object.keys(cardData).length > 0  ?
    <div className={styles.container}>
          <div className={styles.header}>
          <span>
            <img
              src={
                priority === "HIGH PRIORITY"
                  ? red
                  : priority === "LOW PRIORITY"
                  ? green
                  : blue
              }
              alt="priority"
            />
            {priority}
          </span>
       
        </div>
        <div className={styles.title} >
          <span>{title}</span>
        </div>
        <div className={styles.checklist_header}>
          <span className={styles.checklist_count}>Checklist <p>({ checkedCount + "/" + checklist?.length})</p></span> 
       </div>
        
        <div className={styles.checklist}>
        { checklist?.map((elem, idx) => ( 
            <span key={elem._id} className={styles.input_span}>
              <span className={styles.input_checkbox_container}>
                <input
                  type="checkbox"
                  name={`checklist[${idx}].isChecked`}
                  defaultChecked={elem?.isChecked}
                  disabled
                  readOnly
                />
              </span>
              <span className={styles.input_text_container}>
                <p>
                   {elem?.title} 
                  </p>
              </span>
            </span>
         ))}
        </div>

       {dueDate   ?
       <div className={styles.due_date_container}>
       <p>Due Date</p>
        <div className={styles.due_date_overdue }>
            {dueDate
              ? Intl.DateTimeFormat("en-US", { month: "short" }).format(
                  new Date(dueDate)
                ) +
                " " +
                new Date(dueDate).getDate()
              : ""} 
          </div> 
          </div> : ""
        }
        </div> : "No Task Found Check your shared link again"}
        </>
  )
}

export default SharedTask