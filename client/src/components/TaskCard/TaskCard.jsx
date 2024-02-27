import { useEffect, useReducer, useRef, useState } from "react";
import red from "../../assets/icons/red.svg";
import blue from "../../assets/icons/blue.svg";
import green from "../../assets/icons/green.svg";
import downarrow from "../../assets/icons/downarrow.svg";
import styles from "./taskcard.module.css";
import toast from "react-hot-toast";
import {
  deleteTaskCard,
  updateCardCategory,
  updateTaskState,
} from "../../api/task";

const TaskCard = ({ card, dispatch, setModalView, setFilteredCardDetails, isCollapsed, setCategoryCollapse }) => {
  const {
    _id: cardId,
    title,
    category,
    priority,
    checklist = [],
    dueDate,
  } = card || {};
  const [remainingSegment, setRemainingSegment] = useState([]);
  const allSegment = ["BACKLOGS", "TODO", "IN PROGRESS", "DONE"];
  const [cardMenu, setCardMenu] = useState(false);
  const [ showChecklist, setShowChecklist] = useState( false || isCollapsed );

  console.log(JSON.stringify(isCollapsed))
  useEffect(() => {
    setRemainingSegment(allSegment.filter((elem) => elem !== category));
    if(isCollapsed) {
      setShowChecklist(false)
    }

    return ()=> {
      setCategoryCollapse((prev) => ({...prev, [category]:false}))
    }
  }, [isCollapsed]);

  const handleIsCheckedClick = async (e, idx) => {
    try {
      const isChecked = e.target.checked;
      dispatch({
        type: "UPDATE_CHECKLIST_ITEM",
        payload: { cardId, isChecked, idx },
      });

      const currentchecklist = checklist.map((item, index) =>
        index === idx ? { ...item, isChecked: e.target.checked } : item
      );
      await updateTaskState(cardId, currentchecklist);
    } catch (error) {
      console.error("Error updating checklist:", error);
    }
  };

  const handleSegmentChange = async (e) => {
    try {
      const newCategory = e.target.innerText;
      dispatch({
        type: "CHANGE_CATEGORY",
        payload: { cardId, newCategory },
      });
      await updateCardCategory(cardId, newCategory);
    } catch (error) {}
  };

  const handleShareLink = () => {
    const textToCopy = `http://localhost:5173/${cardId}`;
    console.log(textToCopy);
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        toast.success("Copied");
      })
      .catch((err) => {
        console.error("Unable to copy text to clipboard", err);
      });
  };
  const handleTaskDelete = async () => {
    try {
      await dispatch({
        type: "DELETE_TASK",
        payload: { cardId },
      });
      await deleteTaskCard(cardId);
      toast.success("Task Deleted");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handlePrefilledCardModal = () => {
    setFilteredCardDetails(card)
    setModalView(prev =>!prev)
  }

  return (
    <div>
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
          <div
            className={styles.card_menu}
            onClick={() => setCardMenu(!cardMenu)}
          >
            <span>...</span>
            {cardMenu && (
              <div className={styles.card_menu_option}>
                <span onClick={handlePrefilledCardModal}>Edit</span>
                <span onClick={handleShareLink}>Share</span>
                <span onClick={handleTaskDelete}>Delete</span>
              </div>
            )}
          </div>
        </div>
        <div className={styles.title}>
          <span>{title}</span>
        </div>
        <div className={styles.checklist_header}>
          <span>Checklist ({0 + "/" + checklist?.length})</span>
          <span>
            <img src={downarrow} alt="" onClick={()=> setShowChecklist(!showChecklist)}/>
          </span>
        </div>
        {showChecklist && checklist?.length > 0 ?
        <div className={styles.checklist}>
          {checklist.map((elem, idx) => (
            <span key={elem._id} className={styles.input_span}>
              <span className={styles.input_checkbox_container}>
                <input
                  type="checkbox"
                  name={`checklist[${idx}].isChecked`}
                  defaultChecked={elem?.isChecked}
                  onClick={(e) => handleIsCheckedClick(e, idx)}
                />
              </span>
              <span className={styles.input_text_container}>
                <input
                  type="text"
                  id="title"
                  name={`checklist[${idx}].title`}
                  value={elem?.title}
                  disabled
                />
              </span>
            </span>
          ))}
        </div>
: ""}
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
    </div>
  );
};

export default TaskCard;
