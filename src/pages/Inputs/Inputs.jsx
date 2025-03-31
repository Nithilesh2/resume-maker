import React, { useState } from "react"
import styles from "./Inputs.module.css"

const Inputs = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
  })

  const [educationList, setEducationList] = useState([
    { id: 1, degree: "", college: "", startYear: "", endYear: "" },
  ])

  const [showWorkExperience, setShowWorkExperience] = useState(false)
  const [workExperience, setWorkExperience] = useState([])

  const [projects, setProjects] = useState([])

  // Handle personal info changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  // Handle education changes
  const handleEducationChange = (id, e) => {
    const { name, value } = e.target
    setEducationList(
      educationList.map((edu) =>
        edu.id === id ? { ...edu, [name]: value } : edu
      )
    )
  }

  // Handle work experience changes
  const handleWorkChange = (id, e) => {
    const { name, value } = e.target
    setWorkExperience(
      workExperience.map((work) =>
        work.id === id ? { ...work, [name]: value } : work
      )
    )
  }

  // Handle project changes
  const handleProjectChange = (id, e) => {
    const { name, value } = e.target
    setProjects(
      projects.map((project) =>
        project.id === id ? { ...project, [name]: value } : project
      )
    )
  }

  // Add new education field
  const addEducation = (e) => {
    e.preventDefault()
    setEducationList([
      ...educationList,
      { id: Date.now(), degree: "", college: "", startYear: "", endYear: "" },
    ])
  }

  // Remove education field
  const removeEducation = (id, e) => {
    e.preventDefault()
    setEducationList(educationList.filter((edu) => edu.id !== id))
  }

  // Add work experience
  const addWorkExperience = (e) => {
    e.preventDefault()
    setShowWorkExperience(true)
    setWorkExperience([
      ...workExperience,
      { id: Date.now(), company: "", role: "", startYear: "", endYear: "" },
    ])
  }

  // Remove work experience
  const removeWorkExperience = (id, e) => {
    e.preventDefault()
    const updatedWork = workExperience.filter((work) => work.id !== id)
    setWorkExperience(updatedWork)
    if (updatedWork.length === 0) setShowWorkExperience(false)
  }

  // Add project
  const addProject = (e) => {
    e.preventDefault()
    setProjects([
      ...projects,
      {
        id: Date.now(),
        name: "",
        description: "",
        codeLink: "",
        liveLink: "",
      },
    ])
  }

  // Remove project
  const removeProject = (id, e) => {
    e.preventDefault()
    const updatedProjects = projects.filter((project) => project.id !== id)
    setProjects(updatedProjects)
  }

  return (
    <div className={styles.main}>
      <form className={styles.formContainer}>
        <div className={styles.title}>Fill your resume details here</div>
        <div className={styles.inputsBox}>
          <div className={styles.personalInfoContainer}>
            <div className={styles.titles}>Personal</div>
            <div className={styles.namesContainer}>
              <input
                type="text"
                name="firstName"
                className={styles.fname}
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="lastName"
                className={styles.lname}
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className={styles.emailAndMobileContainer}>
              <input
                type="email"
                name="email"
                className={styles.email}
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <input
                type="tel"
                name="phone"
                className={styles.phone}
                placeholder="Mobile Number"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className={styles.addressContainer}>
              <textarea
                className={styles.address}
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleInputChange}
                required
                rows={3}
              />
            </div>
          </div>
          <div className={styles.educationInfoContainer}>
            <div className={styles.titles}>Education</div>
            {educationList.map((education, index) => (
              <div key={education.id} className={styles.educationContainer}>
                <div className={styles.degreeAndCollegeContainer}>
                  <select
                    className={styles.degree}
                    name="degree"
                    value={education.degree}
                    onChange={(e) => handleEducationChange(education.id, e)}
                    required
                  >
                    <option value="">Select Degree</option>
                    <option value="SSC">SSC</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="B.Tech">B.Tech</option>
                    <option value="M.Tech">M.Tech</option>
                    <option value="Diploma">Diploma</option>
                    <option value="PhD">PhD</option>
                    <option value="Other">Other</option>
                  </select>
                  <input
                    type="text"
                    className={styles.collegeName}
                    name="college"
                    placeholder="College Name"
                    value={education.college}
                    onChange={(e) => handleEducationChange(education.id, e)}
                    required
                  />
                </div>
                <div className={styles.yearContainer}>
                  <input
                    type="number"
                    className={styles.startYear}
                    name="startYear"
                    placeholder="Starting Year"
                    value={education.startYear}
                    onChange={(e) => handleEducationChange(education.id, e)}
                    required
                    maxLength={4}
                    onInput={(e) => {
                      if (e.target.value.length > 4) {
                        e.target.value = e.target.value.slice(0, 4)
                      }
                    }}
                  />
                  <input
                    type="number"
                    className={styles.endYear}
                    name="endYear"
                    placeholder="Ending Year"
                    value={education.endYear}
                    onChange={(e) => handleEducationChange(education.id, e)}
                    required
                    maxLength={4}
                    onInput={(e) => {
                      if (e.target.value.length > 4) {
                        e.target.value = e.target.value.slice(0, 4)
                      }
                    }}
                  />
                </div>
                {index === educationList.length - 1 &&
                  educationList.length > 1 && (
                    <button
                      className={styles.deleteBtn}
                      onClick={(e) => removeEducation(education.id, e)}
                    >
                      ×
                    </button>
                  )}
              </div>
            ))}
            <button className={styles.addBtn} onClick={addEducation}>
              +
            </button>
          </div>
          <div className={styles.previousWorkExperience}>
            <div className={styles.titles}>Work Experience</div>
            {showWorkExperience &&
              workExperience.map((work, index) => (
                <div key={work.id} className={styles.workContainer}>
                  <div className={styles.companyNameAndRoleContainer}>
                    <input
                      type="text"
                      className={styles.company}
                      name="company"
                      placeholder="Company Name"
                      value={work.company}
                      onChange={(e) => handleWorkChange(work.id, e)}
                      required
                    />
                    <input
                      type="text"
                      className={styles.role}
                      name="role"
                      placeholder="Role/Position"
                      value={work.role}
                      onChange={(e) => handleWorkChange(work.id, e)}
                      required
                    />
                  </div>
                  <div className={styles.yearContainer}>
                    <input
                      type="number"
                      className={styles.startYear}
                      name="startYear"
                      placeholder="Starting Year"
                      value={work.startYear}
                      onChange={(e) => handleWorkChange(work.id, e)}
                      maxLength={4}
                      onInput={(e) => {
                        if (e.target.value.length > 4) {
                          e.target.value = e.target.value.slice(0, 4)
                        }
                      }}
                    />
                    <input
                      type="number"
                      className={styles.endYear}
                      name="endYear"
                      placeholder="Ending Year"
                      value={work.endYear}
                      onChange={(e) => handleWorkChange(work.id, e)}
                      maxLength={4}
                      onInput={(e) => {
                        if (e.target.value.length > 4) {
                          e.target.value = e.target.value.slice(0, 4)
                        }
                      }}
                    />
                  </div>
                  {index === workExperience.length - 1 && (
                    <button
                      className={styles.deleteBtn}
                      onClick={(e) => removeWorkExperience(work.id, e)}
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
            <button
              className={styles.addBtn}
              style={{ marginTop: "0.7rem" }}
              onClick={addWorkExperience}
            >
              +
            </button>
          </div>

          <div className={styles.projectsContainer}>
            <div className={styles.titles}>Projects</div>
            {projects.map((project, index) => (
              <div key={project.id} className={styles.projectItem}>
                <div className={styles.projectNameAndDescContainer}>
                  <input
                    type="text"
                    className={styles.projectName}
                    name="name"
                    placeholder="Project Name"
                    value={project.name}
                    onChange={(e) => handleProjectChange(project.id, e)}
                    required
                  />
                </div>
                <textarea
                  className={styles.projectDesc}
                  name="description"
                  placeholder="Project Description"
                  value={project.description}
                  onChange={(e) => handleProjectChange(project.id, e)}
                  required
                  rows={3}
                />
                <div className={styles.projectLinksContainer}>
                  <input
                    type="url"
                    className={styles.codeLink}
                    name="codeLink"
                    placeholder="Code Link (GitHub, etc.)"
                    value={project.codeLink}
                    onChange={(e) => handleProjectChange(project.id, e)}
                    required
                  />
                  <input
                    type="url"
                    className={styles.liveLink}
                    name="liveLink"
                    placeholder="Live Link (if available)"
                    value={project.liveLink}
                    onChange={(e) => handleProjectChange(project.id, e)}
                  />
                </div>
                {index === projects.length - 1 && (
                  <button
                    className={styles.deleteBtn}
                    onClick={(e) => removeProject(project.id, e)}
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
            <button className={styles.addBtn} onClick={addProject}>
              +
            </button>
          </div>
        </div>
      </form>

      <div className={styles.resumePage}>
        <div className={styles.preview}>Preview</div>
        <div className={styles.resumeContainer}>
          <div className={styles.resumeHeader}>
            <h1>
              {formData.firstName} {formData.lastName}
            </h1>
            <div className={styles.contactInfo}>
              <div className={styles.emailAndMobile}>
                {formData.email && <p>{formData.email}</p>}
                {formData.email && formData.phone && (
                  <span style={{ padding: "0 0.24rem" }}> ||</span>
                )}
                {formData.phone && <p>{formData.phone}</p>}
              </div>
              {formData.address && <p>{formData.address}</p>}
            </div>
          </div>
          {educationList.length > 0 && educationList[0].degree && (
            <div className={styles.resumeSection}>
              <h2>Education</h2>
              {educationList.map((edu) => (
                <div key={edu.id} className={styles.educationItem}>
                  <h3>{edu.degree}</h3>
                  <div className={styles.collegeAndYear}>
                    <p>{edu.college}</p>
                    <p>
                      {edu.startYear} {edu.startYear && "-"}{" "}
                      {edu.endYear || "Present"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
          {workExperience.length > 0 && (
            <div className={styles.resumeSection}>
              <h2>Work Experience</h2>
              {workExperience.map((work) => (
                <div key={work.id} className={styles.workItem}>
                  <h3>{work.role}</h3>
                  <p>{work.company}</p>
                  <p>
                    {work.startYear} - {work.endYear || "Present"}
                  </p>
                </div>
              ))}
            </div>
          )}
          {projects.length > 0 && (
            <div className={styles.resumeSection}>
              <h2>Projects</h2>
              {projects.map((project) => (
                <div key={project.id} className={styles.projectItem}>
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                  {project.codeLink && (
                    <p>
                      Code:{" "}
                      <a
                        href={project.codeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {project.codeLink}
                      </a>
                    </p>
                  )}
                  {project.liveLink && (
                    <p>
                      Live:{" "}
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {project.liveLink}
                      </a>
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Inputs
