import React, { useState } from "react"
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion"
import styles from "./Welcome.module.css"
import NavBar from "../../components/NavBar/NavBar"
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const [darkMode, setDarkMode] = useState(false)
  const navigate = useNavigate()

  return (
    <>
      <div className={`${styles.main} ${darkMode ? styles.dark : ""}`}>
        <NavBar />
        <div className={styles.toggleContainer}>
          <label className={styles.switch}>
            <input type="checkbox" onChange={() => setDarkMode(!darkMode)} />
            <span className={styles.slider}></span>
          </label>
          <span>{darkMode ? "🌙 Dark Mode" : "☀️ Light Mode"}</span>
        </div>

        <motion.div
          className={styles.heroSection}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className={styles.heading}>Build Your Resume with us</h1>
        </motion.div>

        <div className={styles.sectionGlass}>
          <h2>✨ Why Choose Us?</h2>
          <div className={styles.featuresGrid}>
            <motion.div
              whileHover={{ scale: 1.1 }}
              className={styles.featureBox}
            >
              🎨 Beautiful Templates
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              className={styles.featureBox}
            >
              ⚡ Fast & Responsive
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              className={styles.featureBox}
            >
              📄 Download as PDF
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              className={styles.featureBox}
            >
              🎭 Live Customization
            </motion.div>
          </div>
        </div>

        <motion.div className={styles.floating}>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={styles.button}
            onClick={() => navigate("/input")}
          >
            Get Started 🚀
          </motion.button>
          🚀 Make Your Resume Shine!
        </motion.div>

        <footer className={styles.footer}>
          <p>
            Developed by <strong>Nithilesh</strong>
          </p>
          <p>
            📧 Email:{" "}
            <a
              href="mailto:sunnybnithilesh@gmail.com"
              style={{ color: "#06d6a0", textDecoration: "none" }}
            >
              sunnybnithilesh@gmail.com
            </a>
          </p>
          <p>
            🌐 Portfolio:{" "}
            <a
              href="https://nithilesh.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#06d6a0", textDecoration: "none" }}
            >
              nithilesh.vercel.app
            </a>
          </p>
          <p>© {new Date().getFullYear()} Resume Maker. All Rights Reserved.</p>
        </footer>
      </div>
    </>
  )
}

export default Welcome
