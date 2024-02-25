import { useEffect, useState } from "react";
import add from "../../assets/icons/add.svg";
import collapseall from "../../assets/icons/collapseall.svg";
import TaskCard from "../TaskCard/TaskCard";

import styles from "./dashboard.module.css";
import AddTaskModal from "../AddTaskModal/AddTaskModal";
import { getAllTasks, updateCardCategory, updateTaskState } from "../../api/task";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [modalView, setModalView] = useState(false);
  const [allCard, setAllCard] = useState([]);

  const [done, setDone] = useState([]);
  const [todo, setTodo] = useState([]);
  const [backlogs, setBacklogs] = useState([]);
  const [inProgress, setInProgress] = useState([]);

  const [ updatedChecklist, setUpdatedChecklist ] = useState([]);
  const [ currentCard, setCurrentCard ] = useState();
  const [ currentCardCategory, setCurrentCardCategory ] = useState();
  const [ currentCategory, setCurrentCategory] = useState("");



  const fetchTasks = async () => {
    try {
      const res = await getAllTasks();
      setAllCard(res.data);
    } catch (error) {
      toast.error(error.message)
    }
  };

  useEffect(() => {
    fetchTasks();
    const updateTask = async() => {
      try {
        const res = await updateTaskState(currentCard, updatedChecklist)
        fetchTasks();
      } catch (error) {
        
      }
    }

    const changeCategory = async() => {
    try {
      const res = await updateCardCategory(currentCardCategory, currentCategory);
      toast.loading('Switching task...')
    fetchTasks();
    toast.remove()


    } catch (error) {

      
    }
  }
    if(updatedChecklist.length > 0 && currentCard){
      updateTask();
    }

    if(currentCardCategory && currentCategory) {
      changeCategory();
    }
  }, [updatedChecklist, currentCategory, currentCardCategory, currentCard]);


  useEffect(() => {
    const doneData = allCard?.filter((elem) => elem.category === "DONE")
    const todoData = allCard?.filter((elem) => elem.category === "TODO")
    const progressData = allCard?.filter((elem) => elem.category === "IN PROGRESS")
    const backlogData = allCard?.filter((elem) => elem.category === "BACKLOGS")
    setDone(doneData)
    setTodo(todoData)
    setInProgress(progressData)
    setBacklogs(backlogData)
  },[allCard, updatedChecklist, currentCategory, currentCardCategory, currentCard])


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
        <div className={styles.backlog}>
          <div className={styles.kanban_title}>
            <p>Backlog</p>
            <span className={styles.kanban_title_right}>
              <img src={collapseall} alt="add" />
            </span>
          </div>
          <div className={styles.card_content_container}>
          {backlogs?.map((elem, idx) => (
            <TaskCard done={elem} key={idx} setUpdatedChecklist={setUpdatedChecklist} setCurrentCard={setCurrentCard} setCurrentCategory={setCurrentCategory}
            setCurrentCardCategory={setCurrentCardCategory}/>
          ))}
          </div>
        </div>
        <div className={styles.todo}>
          <div className={styles.kanban_title}>
            <p>To Do</p>
            <span className={styles.kanban_title_right}>
              <img src={add} alt="add" onClick={() => setModalView(true)} />
              <img src={collapseall} alt="add" />
            </span>
          </div>
          <div className={styles.card_content_container}>
          {todo?.map((elem, idx) => (
            <TaskCard done={elem} key={idx}  setUpdatedChecklist={setUpdatedChecklist} setCurrentCard={setCurrentCard} setCurrentCategory={setCurrentCategory}
            setCurrentCardCategory={setCurrentCardCategory}/>
          ))}
        </div>
        </div>
        <div className={styles.inprogress}>
          <div className={styles.kanban_title}>
            <p>In Progress</p>
            <span className={styles.kanban_title_right}>
              <img src={collapseall} alt="add" />
            </span>
          </div>
          <div className={styles.card_content_container}>

          {inProgress?.map((elem, idx) => (
            <TaskCard done={elem} key={idx}  setUpdatedChecklist={setUpdatedChecklist} setCurrentCard={setCurrentCard} setCurrentCategory={setCurrentCategory}
            setCurrentCardCategory={setCurrentCardCategory}/>
         ))}
        </div>
        </div>

        <div className={styles.done}>
          <div className={styles.kanban_title}>
            <p>Done</p>
            <span className={styles.kanban_title_right}>
              <img src={collapseall} alt="add" />
            </span>
          </div>
          <div className={styles.card_content_container}>
          {done?.map((elem,idx) => (
            <TaskCard done={elem} key={idx}  setUpdatedChecklist={setUpdatedChecklist} setCurrentCard={setCurrentCard} setCurrentCategory={setCurrentCategory}
            setCurrentCardCategory={setCurrentCardCategory}/>
          ))}
        </div>
        </div>
      </div>
      {modalView ? (
        <AddTaskModal setModalView={setModalView} setAllCard={setAllCard} setCurrentCard={setCurrentCard} setCurrentCategory={setCurrentCategory}
        setCurrentCardCategory={setCurrentCardCategory}/>
      ) : (
        ""
      )}
      {/* {allCard.map((elem, idx) => (
        <pre key={idx}>{JSON.stringify(elem, null, 2)}</pre>
      ))} */}
    </div>
  );
};

export default Dashboard;
