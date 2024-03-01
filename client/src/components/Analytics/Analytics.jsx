import { useEffect, useState } from "react"
import ellipse from "../../assets/icons/ellipse.svg"
import styles from "./analytics.module.css"
import { getAllAnalytics } from "../../api/task";
import toast from "react-hot-toast";
const Analytics = () => {

    const [analytics, setAnalytics] = useState();

    useEffect(() => {
        fechAnalytics();
    },[])

    const fechAnalytics = async() => {
        try {
            const res  = await getAllAnalytics();
            setAnalytics(res)
        } catch (error) {
            toast.error(error.message)
        }
    }

  return (
    <div className={styles.container}>
        <h2>Analytics</h2>

        <div className={styles.inner_container}>
            <div className={styles.analytics}>
                <span className={styles.analytics_content_container}>
                    <p className={styles.analytics_content_left}>
                    <img src={ellipse} alt="" />
                    Backlog Tasks
                    </p>
                    <p className={styles.analytics_content_right}>{analytics  ? analytics?.backlogs ? analytics?.backlogs : 0 : ""}</p>
                </span>

                <span className={styles.analytics_content_container}>
                    <p className={styles.analytics_content_left}>
                    <img src={ellipse} alt="" />
                    Todo Tasks
                    </p>
                    <p className={styles.analytics_content_right}>{analytics  ? analytics?.todo ? analytics?.todo : 0 : ""} </p>
                </span>
                <span className={styles.analytics_content_container}>
                    <p className={styles.analytics_content_left}>
                    <img src={ellipse} alt="" />
                    In-Progress Tasks
                    </p>
                    <p className={styles.analytics_content_right}>{analytics  ? analytics?.progress ? analytics?.progress : 0 : ""}</p>
                </span>
                <span className={styles.analytics_content_container}>
                    <p className={styles.analytics_content_left}>
                    <img src={ellipse} alt="" />
                    Completed Tasks
                    </p>
                    <p className={styles.analytics_content_right}>{analytics  ? analytics?.done ? analytics?.done : 0 : ""}</p>
                </span>
              
            </div>
            <div className={styles.analytics}>
            <span className={styles.analytics_content_container}>
                    <p className={styles.analytics_content_left}>
                    <img src={ellipse} alt="" />
                    Low Priority
                    </p>
                    <p className={styles.analytics_content_right}>{analytics  ? analytics?.low ? analytics?.low : 0 : ""}</p>
                </span>
                <span className={styles.analytics_content_container}>
                    <p className={styles.analytics_content_left}>
                    <img src={ellipse} alt="" />
                    Moderate Priority
                    </p>
                    <p className={styles.analytics_content_right}>{analytics  ? analytics?.moderate ? analytics?.moderate : 0 : ""}</p>
                </span>
                <span className={styles.analytics_content_container}>
                    <p className={styles.analytics_content_left}>
                    <img src={ellipse} alt="" />
                    High Priority
                    </p>
                    <p className={styles.analytics_content_right}>{analytics  ? analytics?.high ? analytics?.high : 0 : ""}</p>
                </span>
                <span className={styles.analytics_content_container}>
                    <p className={styles.analytics_content_left}>
                    <img src={ellipse} alt="" />
                    Due Date Tasks
                    </p>
                    <p className={styles.analytics_content_right}>{analytics  ? analytics?.dueDateCounts ? analytics?.dueDateCounts : 0 : ""}</p>
                </span>
            </div>
        </div>
    </div>
  )
}

export default Analytics