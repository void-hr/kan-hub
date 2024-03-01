import { useEffect, useReducer, useState } from "react";
import add from "../../assets/icons/add.svg";
import collapseall from "../../assets/icons/collapseall.svg";
import TaskCard from "../TaskCard/TaskCard";

import styles from "./dashboard.module.css";
import AddTaskModal from "../AddTaskModal/AddTaskModal";
import { getAllTasks } from "../../api/task";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getDayWithPostfix } from "../../Utils/DatePostfix";

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_CHECKLIST_ITEM":
      return {
        ...state,
        data: state.data.map((card) =>
          card._id === action.payload.cardId
            ? {
                ...card,
                checklist: card.checklist.map((item, index) =>
                  index === action.payload.idx
                    ? { ...item, isChecked: action.payload.isChecked }
                    : item
                ),
              }
            : card
        ),
      };
    case "CHANGE_CATEGORY":
      return {
        ...state,
        data: state.data.map((item) =>
          item._id === action.payload.cardId
            ? { ...item, category: action.payload.newCategory }
            : item
        ),
      };

    case "SET_DATA":
      return {
        ...state,
        data: action.payload,
      };

    case "DELETE_TASK":
      return {
        ...state,
        data: state.data.filter((card) => card._id !== action.payload.cardId),
      };

    case "ADD_TASK":
      return {
        ...state,
        data: [...state.data, action.payload.newData],
      };
    case "UPDATE_TASK":
      return {
        ...state,
        data: state.data.map((task) => {
          if (task._id === action.payload?.updateData._id) {
            return { ...task, ...action.payload?.updateData };
          }
          return task;
        }),
      };
    default:
      return state;
  }
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [modalView, setModalView] = useState(false);
  const [filteredCardDetails, setFilteredCardDetails] = useState({});
  const [currentDate, setCurrentDate] = useState();
  const section = ["BACKLOGS", "TODO", "IN PROGRESS", "DONE"];
  const [ filterCardByDuration, setFilterCardByDuration] = useState("");
  const [filterMenu, setFilterMenu] = useState(false)
  const [card_checklist, dispatch] = useReducer(reducer, { data: null });
  const [categoryCollapse, setCategoryCollapse] = useState({
    BACKLOGS: false,
    TODO: false,
    "IN PROGRESS": false,
    DONE: false,
  });
  const fetchTasks = async () => {
    try {
      const res = await getAllTasks(filterCardByDuration);

      dispatch({
        type: "SET_DATA",
        payload: res.data,
      });
    } catch (error) {
      if(localstorage.getItem('user') {
      toast.error(error.message);
      }
    }
  };

  useEffect(() => {
    fetchTasks(filterCardByDuration);
    function formatDate(date) {
      const options = { day: "numeric", month: "short", year: "numeric" };
      const formattedDate = new Intl.DateTimeFormat("en-GB", options).format(
        date
      );

      const day = date.getDate();
      const postfix = getDayWithPostfix(day);
      return formattedDate.replace(/\b\d{1,2}\b/, day + postfix);
    }

    setCurrentDate(formatDate(new Date()));
  }, [filterCardByDuration]); 
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Welcome! {localStorage?.getItem("user")}</h2>
        <p>{currentDate}</p>
      </div>
      <div className={styles.sub_header}>
        <h1>Board</h1>
        <div className={styles.filter_menu}>
        <span className={styles.menu_select} onClick={()=> setFilterMenu(!filterMenu)}>{filterCardByDuration ? filterCardByDuration === 'month' ? "This Month" : filterCardByDuration  === "today" ?  "Today" : "This Week" : "This Week"}  <p>&#94; </p></span>
            {filterMenu && (
              <div className={styles.filter_menu_option}>
                <span onClick={(e)=> {
                  setFilterCardByDuration(e.target.dataset.value) 
                  setFilterMenu(false)} } data-value={"today"}>Today</span>
                <span onClick={(e)=> {
                  setFilterCardByDuration(e.target.dataset.value) 
                  setFilterMenu(false)} } data-value={"week"}>This Week</span>
                <span onClick={(e)=> {
                  setFilterCardByDuration(e.target.dataset.value) 
                  setFilterMenu(false)
                } } data-value={"month"}>This Month</span>
                </div>
            )}
        </div>
      </div>
      <div className={styles.kanban_container}>
        {section.map((elem, idx) => (
          <div key={idx} className={styles.backlog}>
            <div className={styles.kanban_title}>
              <p className={styles.section_title}>{elem}</p>
              <span className={styles.kanban_title_right}>
                {elem === "TODO" ? (
                  <img src={add} alt="add" onClick={() => setModalView(true)} />
                ) : (
                  ""
                )}
                <img
                  src={collapseall}
                  alt="collapse"
                  onClick={() =>
                    setCategoryCollapse((prev) => ({ ...prev, [elem]: true }))
                  }
                />
              </span>
            </div>
            <div className={styles.card_content_container}>
              {card_checklist.data?.map((item, index) =>
                item.category?.toLowerCase() === elem.toLowerCase() ? (
                  <TaskCard
                    key={index}
                    card={item}
                    dispatch={dispatch}
                    setModalView={setModalView}
                    s
                    etFilteredCardDetails={setFilteredCardDetails}
                    isCollapsed={categoryCollapse[elem]}
                    setCategoryCollapse={setCategoryCollapse}
                  />
                ) : (
                  ""
                )
              )}
            </div>
          </div>
        ))}
      </div>
      {modalView ? (
        <AddTaskModal setModalView={setModalView} dispatch={dispatch} />
      ) : (
        ""
      )}
    </div>
  );
};

export default Dashboard;
