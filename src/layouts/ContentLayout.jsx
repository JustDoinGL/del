import { Outlet, useNavigate } from "react-router-dom"
import createToken from "../utils/cerateToken"
import styles from './Layout.module.css'

// eslint-disable-next-line react/prop-types
const ContentLayout = () => {
  const navigate = useNavigate()

  const handleClick =() => {
    createToken('')
    navigate('/')
  }

  return (
    <>
    <header className={styles.header}>
      <button onClick={handleClick}>
        Выйти
      </button>
    </header>
    <Outlet />
    </>
  )
}

export default ContentLayout