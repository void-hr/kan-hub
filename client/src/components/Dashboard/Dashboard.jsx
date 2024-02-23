import { useEffect, useState } from "react";
import add from "../../assets/icons/add.svg";
import collapseall from "../../assets/icons/collapseall.svg";
import TaskCard from "../TaskCard/TaskCard";

import styles from "./dashboard.module.css";
import AddTaskModal from "../AddTaskModal/AddTaskModal";

const Dashboard = () => {
    const [ modalView, setModalView] = useState(false);
    const [ allCard, setAllCard ] = useState([]); 

   
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Welcome! {localStorage?.getItem('user')}</h2>
      <p>{new  Date().getFullYear()   }</p>
      </div>
      <div className={styles.sub_header}>
      <h1>Board</h1>
      <select name="" id="">
        <option value=""></option>
        <option value=""></option>

      </select>

      </div>
      <div className={styles.kanban_container}>
        <div className={styles.backlog}>
          <div className={styles.kanban_title}>
            <p>Backlog</p>
            <span className={styles.kanban_title_right}>
              <img src={collapseall} alt="add" />
            </span>
          </div>
        </div>
        <div className={styles.todo}>
          <div className={styles.kanban_title}>
            <p>To Do</p>
            <span className={styles.kanban_title_right}>
              <img src={add} alt="add"  onClick={()=> setModalView(true)}/>
              <img src={collapseall} alt="add" />
            </span>
          </div>
        </div>
        <div className={styles.inprogress}>
          <div className={styles.kanban_title}>
            <p>In Progress</p>
            <span className={styles.kanban_title_right}>
              <img src={collapseall} alt="add" />
            </span>
          </div>
        </div>
        <div className={styles.done}>
          <div className={styles.kanban_title}>
            <p>Done</p>
            <span className={styles.kanban_title_right}>
              <img src={collapseall} alt="add" />
            </span>
          </div>
        </div>
      </div>
      {modalView ? <AddTaskModal setModalView={setModalView} setAllCard={setAllCard}/> : ""}
      <pre>{JSON.stringify(allCard)}</pre>
    </div>
  );
};

export default Dashboard;
