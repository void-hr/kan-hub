import styles from "./banner.module.css"
import astro from "../../assets/images/astro.png"
import circle from "../../assets/images/circle.png"
const Banner = () => {
  return (
    <div className={styles.container}>
        <div className={styles.img_group}>
        <img src={circle} alt="circle" />
        <img src={astro} alt="astro logo" />
        </div>
        <div className={styles.welcome_message}>
        <h2>Welcome aboard my friend</h2>
        <h6>just a couple of clicks and we start</h6>
        </div>
    </div>
  )
}

export default Banner