import { useEffect, useState } from "react";
import red from "../../assets/icons/red.svg";
import blue from "../../assets/icons/blue.svg";
import green from "../../assets/icons/green.svg";
import downarrow from "../../assets/icons/downarrow.svg";
import styles from "./taskcard.module.css";
import toast from "react-hot-toast";
import { deleteTaskCard } from "../../api/task";

const TaskCard = ({ done, handleCardDelete,updateTask, updatedChecklist,setModalView,setCategoryCollapse,isCollapsed, setUpdatedChecklist, setCurrentCard, setCurrentCategory, setCurrentCardCategory, setFilteredCardDetails }) => {
  const { _id: cardId, title, category, priority, checklist, dueDate } = done;
  const [remainingSegment, setRemainingSegment] = useState([]);
  const allSegment = ["BACKLOGS", "IN PROGRESS", "DONE", "TODO"];
  const [ cardMenu, setCardMenu ] = useState(false)
  const [checklistCount, setChecklistCount] = useState(0);
  const [ showChecklist, setShowChecklist] = useState(false ||isCollapsed );
  const [updateCardId, setUpdateCardId] = useState("")
  useEffect(() => {
    setRemainingSegment(allSegment.filter((elem) => elem !== category));
    if(checklist){
      setUpdatedChecklist(checklist)
    }
if(isCollapsed) {
  setShowChecklist(false)
}
return () => {
  updateTask(updateCardId, updatedChecklist);
  setCategoryCollapse((prev) => ({...prev, [category]:false}))
  setUpdatedChecklist()
  setUpdateCardId()

}
  }, [isCollapsed, updatedChecklist]);
const handleIsCheckedClick = (data,idx) => {
  setUpdatedChecklist((prev) =>
  prev.map((elem, id) => (id === idx ? { ...elem, isChecked: data } : elem)))
  setUpdateCardId(cardId)
}

const handleSegmentChange = (e) => {
  const newCategory = e.target.innerText;
  setCurrentCategory(newCategory)
  setCurrentCardCategory(cardId)
}

const handleShareLink = () => {
  const textToCopy = `http://localhost:5173/${cardId}`;
  console.log(textToCopy)
  navigator.clipboard.writeText(textToCopy)
    .then(() => {
      toast.success('Copied');
    })
    .catch(err => {
      console.error('Unable to copy text to clipboard', err);
    });
}
const handleTaskDelete = async() => {
  try {
    const res = await deleteTaskCard(cardId);
    handleCardDelete(cardId)
  } catch (error) {
    console.log(error.message)
  }
}

const handlePrefilledCardModal = () => {
  setFilteredCardDetails(done)
  setModalView(prev =>!prev)
}
  return (
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
            <div className={styles.card_menu} onClick={()=> setCardMenu(!cardMenu)}>
              <span>...</span>
              {cardMenu && <div className={styles.card_menu_option}>
                <span onClick={handlePrefilledCardModal}>Edit</span>
                <span onClick={handleShareLink}>Share</span>
                <span onClick={handleTaskDelete}>Delete</span>
                </div>}
            </div>
      </div>
      <div className={styles.title}>
        <span>{title}</span>
      </div>
      <div className={styles.checklist_header}>
        <span>Checklist ({checklistCount+"/"+checklist?.length})</span>
        <span onClick={()=> {
            setShowChecklist((prev) => !prev);
        }
          }><img src={downarrow} alt="" /></span>
      </div>
      {showChecklist && checklist?.length > 0  &&
      <div className={styles.checklist}>
        {checklist.map((elem, idx) => (
          <span key={elem._id} className={styles.input_span}>
            <span className={styles.input_checkbox_container}>
              <input
                type="checkbox"
                name={`checklist[${idx}].isChecked`}
                defaultChecked={elem?.isChecked}
                onChange={(e) => handleIsCheckedClick(e.target.checked,idx)}
                />
            </span>
            <span className={styles.input_text_container}>
              <input type="text" id="title" value={elem?.title} disabled />
            </span>
          </span>
        ))}
      </div>
      }

      <div className={styles.date_and_nav_container}>
        <div className={styles.due_date}>
          {dueDate
            ? Intl.DateTimeFormat("en-US", { month: "short" }).format(
              new Date(dueDate)
              ) +
              " " +
              new Date(dueDate).getDate()
              : ""}
        </div>
        <div className={styles.change_category_container}>
          {remainingSegment.map((elem, idx) => (
            <span
            key={idx}
            className={styles.change_category}
            id="category"
            onClick={handleSegmentChange}
            >
              {elem !== category && elem}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
