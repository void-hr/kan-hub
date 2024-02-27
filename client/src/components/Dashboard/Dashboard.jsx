import { useEffect, useReducer, useState } from "react";
import add from "../../assets/icons/add.svg";
import collapseall from "../../assets/icons/collapseall.svg";
import TaskCard from "../TaskCard/TaskCard";

import styles from "./dashboard.module.css";
import AddTaskModal from "../AddTaskModal/AddTaskModal";
import {
  getAllTasks,
} from "../../api/task";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const reducer = (state, action) => {

  switch(action.type) {
    case 'UPDATE_CHECKLIST_ITEM':
    return {
      ...state,
      data: state.data.map((card) =>
        card._id === action.payload.cardId
          ? {
              ...card,
              checklist: card.checklist.map((item,index) =>
                index === action.payload.idx
                  ? { ...item, isChecked: action.payload.isChecked }
                  : item
              ),
            }
          : card
      ),
    };
      case 'CHANGE_CATEGORY':
        return {
          ...state,
          data: state.data.map(item =>
            item._id === action.payload.cardId ? { ...item, category:action.payload.newCategory } : item
          ),
        };

  case 'SET_DATA':
  return {
    ...state,
    data: action.payload,
  };

  case 'DELETE_TASK':
    return {
      ...state,
      data: state.data.filter((card) => card._id !== action.payload.cardId),
  }

  case 'ADD_TASK':
    return {
      ...state,
      data: [...state.data, action.payload.newData],
    };
default:
  return state;
}
}


const Dashboard = () => {
  const navigate = useNavigate();
  const [modalView, setModalView] = useState(false);
  const [ filteredCardDetails, setFilteredCardDetails ] = useState({});

  const section = [ "BACKLOGS", "TODO", "IN PROGRESS", "DONE" ]

  const [card_checklist, dispatch] = useReducer(reducer, {data: null });
  const [categoryCollapse, setCategoryCollapse] = useState({
    BACKLOGS: false,
    TODO: false,
    "IN PROGRESS": false,
    DONE: false,
  });
  const fetchTasks = async () => {
    try {
      const res = await getAllTasks();
      
      dispatch({
        type: 'SET_DATA',
        payload: res.data,
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);
 
  return (

<div className={styles.container}>
<div className={styles.header}>
  <h2>Welcome! {localStorage?.getItem("user")}</h2>
  <p>{new Date().getFullYear()}</p>
</div>
<div className={styles.sub_header}>
  <h1>Board</h1>
  <select name="" id="">
    <option value=""></option>
    <option value=""></option>
  </select>
</div>
<div className={styles.kanban_container}>
{section.map((elem, idx) => (
  <div key={idx} className={styles.backlog}>
    <div className={styles.kanban_title}>
      <p>{elem}</p>
      <span className={styles.kanban_title_right}>
        {elem === "TODO" ?  <img src={add} alt="add" onClick={() => setModalView(true)}  /> :"" }
        <img src={collapseall} alt="collapse" onClick={()=> setCategoryCollapse((prev)=> ({...prev, [elem]: true}))} />
      </span>
    </div>
     <div className={styles.card_content_container}>
   
   {card_checklist.data?.map((item, index)=> item.category?.toLowerCase() === elem.toLowerCase() ? 
   <TaskCard key={index} 
   card={item} 
   dispatch={dispatch} 
   setModalView={setModalView} s
   etFilteredCardDetails={setFilteredCardDetails}
   isCollapsed={categoryCollapse[elem]}
   setCategoryCollapse={setCategoryCollapse}
   /> :""
   )}
     
    </div>  
  </div>))} 
 
</div> 
{modalView ? (
  <AddTaskModal
    filteredCardDetails={filteredCardDetails}
    setFilteredCardDetails={setFilteredCardDetails}
    setModalView={setModalView}
    dispatch={dispatch} 
  />
) : (
  ""
)}
</div>
  );
};

export default Dashboard;
