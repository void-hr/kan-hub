import { useEffect, useState } from "react";
import red from "../../assets/icons/red.svg";
import blue from "../../assets/icons/blue.svg";
import green from "../../assets/icons/green.svg";
import styles from "./taskcard.module.css";
import { updateCardCategory,  updateTaskState } from "../../api/task";

const TaskCard = ({ done, setUpdatedChecklist, setCurrentCard, setCurrentCategory, setCurrentCardCategory }) => {
  const { _id: cardId, title, category, priority, checklist, dueDate } = done;
  const [remainingSegment, setRemainingSegment] = useState([]);
  const allSegment = ["BACKLOGS", "IN PROGRESS", "DONE", "TODO"];

  useEffect(() => {
    setRemainingSegment(allSegment.filter((elem) => elem !== category));

    if(checklist){
      setUpdatedChecklist(checklist)
    }
  }, []);

const handleIsCheckedClick = (data,idx) => {
  setUpdatedChecklist((prev) =>
    prev.map((elem, id) => (id === idx ? { ...elem, "isChecked": data } : elem)))
    setCurrentCard(cardId)
}

const handleSegmentChange = (e) => {
  const newCategory = e.target.innerText;
  setCurrentCategory(newCategory)
  setCurrentCardCategory(cardId)
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
            alt=""
          />
          {priority}
        </span>
        <span>
          <select name="">
            <option value="">...</option>
            <option value="">edit</option>
            <option value="">copy</option>
          </select>
        </span>
      </div>
      <div className={styles.title}>
        <span>{title}</span>
      </div>
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
