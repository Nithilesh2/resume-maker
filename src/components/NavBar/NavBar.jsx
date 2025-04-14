import React from "react"
import styles from "./NavBar.module.css"
import logoImage from "../../../public/favicon.png"
import { useNavigate } from "react-router-dom"

const NavBar = () => {
  const navigate = useNavigate()
  return (
    <>
      <div className={styles.navbar}>
        <img src={logoImage} alt="logo" className={styles.logoImage} />
        <ul className={styles.right}>
          <li className={styles.navItems} onClick={() => navigate("/")}>Home</li>
          <li className={styles.navItems} onClick={() => navigate("/input")}>Sample</li>
          <li className={styles.navItems}>Templates</li>
        </ul>
      </div>
    </>
  )
}

export default NavBar
