import { useEffect, useState } from "react";
import add from "../../assets/icons/add.svg";
import collapseall from "../../assets/icons/collapseall.svg";
import TaskCard from "../TaskCard/TaskCard";

import styles from "./dashboard.module.css";
import AddTaskModal from "../AddTaskModal/AddTaskModal";
import {
  getAllTasks,
  updateCardCategory,
  updateTaskState,
} from "../../api/task";
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

  const [updatedChecklist, setUpdatedChecklist] = useState([]);
  const [currentCard, setCurrentCard] = useState();
  const [currentCardCategory, setCurrentCardCategory] = useState();
  const [currentCategory, setCurrentCategory] = useState("");
  const [ filteredCardDetails, setFilteredCardDetails] = useState();
  const [categoryCollapse, setCategoryCollapse] = useState({
    BACKLOGS: false,
    TODO: false,
    "IN PROGRESS": false,
    DONE: false,
  });
  const fetchTasks = async () => {
    try {
      const res = await getAllTasks();
      setAllCard(res.data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchTasks();
  

    const changeCategory = async () => {
      try {
        const res = await updateCardCategory(
          currentCardCategory,
          currentCategory
        );
        toast.loading("Switching task...");
        fetchTasks();
        toast.remove();
      } catch (error) {}
    };
  

    if (currentCardCategory && currentCategory) {
      changeCategory();
    }
  }, [updatedChecklist, currentCategory, currentCardCategory, currentCard, modalView, filteredCardDetails]);

  useEffect(() => {
    const doneData = allCard?.filter((elem) => elem.category === "DONE");
    const todoData = allCard?.filter((elem) => elem.category === "TODO");
    const progressData = allCard?.filter(
      (elem) => elem.category === "IN PROGRESS"
    );
    const backlogData = allCard?.filter((elem) => elem.category === "BACKLOGS");
    setDone(doneData);
    setTodo(todoData);
    setInProgress(progressData);
    setBacklogs(backlogData);
  }, [
    allCard,
    updatedChecklist,
    currentCategory,
    currentCardCategory,
    currentCard,
  ]);
  const toggleCategoryCollapse = (category) => {
    setCategoryCollapse((prev) => ({
      ...prev,
      [category]: true,
    }));

  };
  
    const handleCardDelete = (deletedCardId) => {
    const updatedCards = allCard.filter((card) => card._id !== deletedCardId);
    setAllCard(updatedCards);
  };

  const updateTask = async (cardid, updatedChecklist) => {
    try {
      console.log(cardid)
      if(cardid){
        const res = await updateTaskState(cardid, updatedChecklist);
      }
      fetchTasks();
    } catch (error) {}
  };
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
              <img src={collapseall} alt="collapse"  onClick={() => toggleCategoryCollapse("BACKLOGS")} />
            </span>
          </div>
          <div className={styles.card_content_container}>
            {backlogs?.map((elem, idx) => (
              <TaskCard
                done={elem}
                key={idx}
                setUpdatedChecklist={setUpdatedChecklist}
                setCurrentCard={setCurrentCard}
                setCurrentCategory={setCurrentCategory}
                setCurrentCardCategory={setCurrentCardCategory}
                setModalView={setModalView}
                setFilteredCardDetails={setFilteredCardDetails}
                isCollapsed={categoryCollapse["BACKLOGS"]}
                setCategoryCollapse={setCategoryCollapse}
                handleCardDelete={handleCardDelete}
                updateTask={updateTask}
                updatedChecklist={updatedChecklist}
              />
            ))}
          </div>
        </div>
        <div className={styles.todo}>
          <div className={styles.kanban_title}>
            <p>To Do</p>
            <span className={styles.kanban_title_right}>
              <img src={add} alt="add" onClick={() => setModalView(true)} />
              <img src={collapseall} alt="collpase" onClick={() => toggleCategoryCollapse("TODO")} />
            </span>
          </div>
          <div className={styles.card_content_container}>
            {todo?.map((elem, idx) => (
              <TaskCard
                done={elem}
                key={idx}
                setUpdatedChecklist={setUpdatedChecklist}
                setCurrentCard={setCurrentCard}
                setCurrentCategory={setCurrentCategory}
                setCurrentCardCategory={setCurrentCardCategory}
                setFilteredCardDetails={setFilteredCardDetails}
                isCollapsed={categoryCollapse["TODO"]}
                setCategoryCollapse={setCategoryCollapse}
                setModalView={setModalView}
                handleCardDelete={handleCardDelete}
                updateTask={updateTask}
updatedChecklist={updatedChecklist}

              />
            ))}
          </div>
        </div>
        <div className={styles.inprogress}>
          <div className={styles.kanban_title}>
            <p>In Progress</p>
            <span className={styles.kanban_title_right}>
              <img src={collapseall} alt="collapse" onClick={() => toggleCategoryCollapse("IN PROGRESS")} />
            </span>
          </div>
          <div className={styles.card_content_container}>
            {inProgress?.map((elem, idx) => (
              <TaskCard
                done={elem}
                key={idx}
                setUpdatedChecklist={setUpdatedChecklist}
                setCurrentCard={setCurrentCard}
                setCurrentCategory={setCurrentCategory}
                setCurrentCardCategory={setCurrentCardCategory}
                setFilteredCardDetails={setFilteredCardDetails}
                isCollapsed={categoryCollapse["IN PROGRESS"]}
                setCategoryCollapse={setCategoryCollapse}
                setModalView={setModalView}
                handleCardDelete={handleCardDelete}
                updateTask={updateTask}
updatedChecklist={updatedChecklist}

              />
            ))}
          </div>
        </div>

        <div className={styles.done}>
          <div className={styles.kanban_title}>
            <p>Done</p>
            <span className={styles.kanban_title_right}>
              <img src={collapseall} alt="collapse" onClick={() => toggleCategoryCollapse("DONE")} />
            </span>
          </div>
          <div className={styles.card_content_container}>
            {done?.map((elem, idx) => (
              <TaskCard
                done={elem}
                key={idx}
                setUpdatedChecklist={setUpdatedChecklist}
                setCurrentCard={setCurrentCard}
                setCurrentCategory={setCurrentCategory}
                setCurrentCardCategory={setCurrentCardCategory}
                setFilteredCardDetails={setFilteredCardDetails}
                isCollapsed={categoryCollapse["DONE"]}
                setCategoryCollapse={setCategoryCollapse}
                setModalView={setModalView}
                handleCardDelete={handleCardDelete}
                updateTask={updateTask}
                updatedChecklist={updatedChecklist}
              />
            ))}
          </div>
        </div>
      </div>
      {modalView ? (
        <AddTaskModal
          setAllCard={setAllCard}
          setCurrentCard={setCurrentCard}
          setCurrentCategory={setCurrentCategory}
          setCurrentCardCategory={setCurrentCardCategory}
          filteredCardDetails={filteredCardDetails}
          setFilteredCardDetails={setFilteredCardDetails}
          setModalView={setModalView}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default Dashboard;
