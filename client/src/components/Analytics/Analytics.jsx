import ellipse from "../../assets/icons/ellipse.svg"
import styles from "./analytics.module.css"
const Analytics = () => {
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
                    <p className={styles.analytics_content_right}>16</p>
                </span>

                <span className={styles.analytics_content_container}>
                    <p className={styles.analytics_content_left}>
                    <img src={ellipse} alt="" />
                    Todo Tasks
                    </p>
                    <p className={styles.analytics_content_right}>14</p>
                </span>
                <span className={styles.analytics_content_container}>
                    <p className={styles.analytics_content_left}>
                    <img src={ellipse} alt="" />
                    In-Progress Tasks
                    </p>
                    <p className={styles.analytics_content_right}>03</p>
                </span>
                <span className={styles.analytics_content_container}>
                    <p className={styles.analytics_content_left}>
                    <img src={ellipse} alt="" />
                    Completed Tasks
                    </p>
                    <p className={styles.analytics_content_right}>22</p>
                </span>
              
            </div>
            <div className={styles.analytics}>
            <span className={styles.analytics_content_container}>
                    <p className={styles.analytics_content_left}>
                    <img src={ellipse} alt="" />
                    Low Priority
                    </p>
                    <p className={styles.analytics_content_right}>16</p>
                </span>
                <span className={styles.analytics_content_container}>
                    <p className={styles.analytics_content_left}>
                    <img src={ellipse} alt="" />
                    Moderate Priority
                    </p>
                    <p className={styles.analytics_content_right}>14</p>
                </span>
                <span className={styles.analytics_content_container}>
                    <p className={styles.analytics_content_left}>
                    <img src={ellipse} alt="" />
                    High Priority
                    </p>
                    <p className={styles.analytics_content_right}>03</p>
                </span>
                <span className={styles.analytics_content_container}>
                    <p className={styles.analytics_content_left}>
                    <img src={ellipse} alt="" />
                    Due Date Tasks
                    </p>
                    <p className={styles.analytics_content_right}>03</p>
                </span>
            </div>
        </div>
    </div>
  )
}

export default Analytics