import { useEffect, useReducer, useRef, useState } from "react";
import red from "../../assets/icons/red.svg";
import blue from "../../assets/icons/blue.svg";
import green from "../../assets/icons/green.svg";
import downarrow from "../../assets/icons/downarrow.svg";
import styles from "./taskcard.module.css";
import toast from "react-hot-toast";
import {
  updateCardCategory,
  updateTaskState,
} from "../../api/task";
import AddTaskModal from "../AddTaskModal/AddTaskModal"
import { getDayWithPostfix } from "../../Utils/DatePostfix";
import AddDeleteModal from "../AddDeleteModal/AddDeleteModal";
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
  const [ overdue, setOverdue] = useState(false);
  const [ showPrefilledModal, setShowPrefilledModal] = useState(false)
  const [ showDeleteModal ,setShowDeleteModal] = useState(false)
  const [ checkedCount, setCheckedCount] = useState(0)
  const [isOverflowing, setIsOverflowing] = useState(false);
  const titleRef = useRef();
  useEffect(() => {
    setRemainingSegment(allSegment.filter((elem) => elem !== category));
    const numberOfChecked = checklist?.reduce((count, obj) => {
      return count + (obj.isChecked ? 1 : 0);
    }, 0);

    setCheckedCount(numberOfChecked)
    if(isCollapsed) {
      setShowChecklist(false)
    }

    if(dueDate) {
     const endDate = new Date(dueDate).setHours(23, 59, 59, 999); 
     const currentDateTime = new Date().getTime();
     setOverdue(endDate < currentDateTime );
    }

    const checkOverflow = () => {
      const titleElement = titleRef.current;

      setIsOverflowing(titleElement.scrollHeight > titleElement.clientHeight);
    };

    checkOverflow();

    return ()=> {
      setCategoryCollapse((prev) => ({...prev, [category]:false}))
    }
  }, [isCollapsed,checklist]);

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
      console.error("Error updating checklist");
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
    } catch (error) {
      toast.error("Error Updating Checklist")
      console.log("Error updating checklist")
    }
  };

  const handleShareLink = () => {
    const textToCopy = `${import.meta.env.VITE_APP_BACKEND_URL}/${cardId}`;
    console.log(textToCopy);
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        toast.success("Link Copied");
      })
      .catch((err) => {
      toast.error("Error Copying Link")
      console.error("Unable to copy text to clipboard");
      });
  };
  


  return (
    <div>
      { showDeleteModal ? <AddDeleteModal setShowDeleteModal={setShowDeleteModal} dispatch={dispatch} cardId={cardId}/>:""}
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
                <span onClick={() => setShowPrefilledModal(!showPrefilledModal)}>Edit</span>
                <span onClick={handleShareLink}>Share</span>
                <span onClick={() => setShowDeleteModal(true)}>Delete</span>
              </div>
            )}
          </div>
        </div>
        <div className={styles.title}  ref={titleRef} title={isOverflowing ? title : ''} >
          <span>{title}</span>
        </div>
        <div className={styles.checklist_header}>
          <span className={styles.checklist_count}>Checklist <p>({checkedCount + "/" + checklist?.length})</p></span>
          <span onClick={()=> setShowChecklist(!showChecklist)}>
            <img src={downarrow} alt="downarrow" />
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
                <p>
                  {elem?.title}
                  </p>
              </span>
            </span>
          ))}
        </div>
: ""}
        <div className={styles.date_and_nav_container}>
          <div className={dueDate ? category === "DONE" ?  styles.due_date_done : overdue ? styles.due_date_overdue : styles.due_date : ""}>
            {dueDate
              ? Intl.DateTimeFormat("en-US", { month: "short" }).format(
                  new Date(dueDate)
                ) +
                " " +
                new Date(dueDate).getDate()+getDayWithPostfix(new Date(dueDate).getDate())
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
      { showPrefilledModal && <AddTaskModal  cardData={card} setModalView={setShowPrefilledModal} dispatch={dispatch}/>}
      </div>
    </div>
  );
};

export default TaskCard;


