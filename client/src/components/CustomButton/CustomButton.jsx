import styles from "./custombutton.module.css"
const CustomButton = ({type, title, radius, onClick}) => {
    console.log(type)
  return (
    <button type="button" className={`${type === 'primary' ? styles.primary :
      type === 'secondary' ? styles.secondary :
      type === 'disabled' ? styles.disabled :
      type === 'danger' ? styles.danger : ''}`} style={{borderRadius: radius+`px`}}  onClick={onClick}>{title}</button>
  )
}

export default CustomButton

