import React, { useRef, useState, useEffect } from "react"
import styles from "./Inputs.module.css"
import NavBar from "../../components/NavBar/NavBar"

const Inputs = () => {
  const loadFromLocalStorage = (key, defaultValue) => {
    const saved = localStorage.getItem(key)
    return saved ? JSON.parse(saved) : defaultValue
  }

  const initialState = {
    formData: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      linkedin: "",
      github: "",
      address: "",
    },
    educationList: [
      {
        id: 1,
        degree: "",
        college: "",
        courseDescription: "",
        startYear: "",
        endYear: "",
      },
    ],
    showWorkExperience: false,
    workExperience: [],
    projects: [],
    skills: [],
    currentSkill: "",
    certifications: [],
    currentCertification: {
      name: "",
      issuer: "",
      date: "",
      link: "",
      certificateDescription: "",
    },
    image: null,
  }

  const [state, setState] = useState(
    loadFromLocalStorage("resumeState", initialState)
  )

  const skillsAddRef = useRef()

  useEffect(() => {
    localStorage.setItem("resumeState", JSON.stringify(state))
  }, [state])

  const clearAllData = (e) => {
    e.preventDefault()
    if (window.confirm("Are you sure you want to clear all data?")) {
      localStorage.clear()
      setState(initialState)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setState((prev) => ({
      ...prev,
      formData: {
        ...prev.formData,
        [name]: value,
      },
    }))
  }

  const handleEducationChange = (id, e) => {
    const { name, value } = e.target
    setState((prev) => ({
      ...prev,
      educationList: prev.educationList.map((edu) =>
        edu.id === id ? { ...edu, [name]: value } : edu
      ),
    }))
  }

  const handleWorkChange = (id, e) => {
    const { name, value } = e.target
    setState((prev) => ({
      ...prev,
      workExperience: prev.workExperience.map((work) =>
        work.id === id ? { ...work, [name]: value } : work
      ),
    }))
  }

  const handleProjectChange = (id, e) => {
    const { name, value } = e.target
    setState((prev) => ({
      ...prev,
      projects: prev.projects.map((project) =>
        project.id === id ? { ...project, [name]: value } : project
      ),
    }))
  }

  const handleSkillChange = (e) => {
    setState((prev) => ({
      ...prev,
      currentSkill: e.target.value,
    }))
  }

  const handleCertificationChange = (e) => {
    const { name, value } = e.target
    setState((prev) => ({
      ...prev,
      currentCertification: {
        ...prev.currentCertification,
        [name]: value,
      },
    }))
  }

  const addSkill = (e) => {
    e.preventDefault()
    if (state.currentSkill.trim() !== "") {
      setState((prev) => ({
        ...prev,
        skills: [...prev.skills, { id: Date.now(), name: prev.currentSkill }],
        currentSkill: "",
      }))
    }
  }

  const handleKeySkillPress = (e) => {
    if (e.key === "Enter" && skillsAddRef.current.value.trim() !== "") {
      e.preventDefault()
      addSkill(e)
      skillsAddRef.current.focus()
    }
  }

  const addCertification = (e) => {
    e.preventDefault()
    if (state.currentCertification.name.trim() !== "") {
      setState((prev) => ({
        ...prev,
        certifications: [
          ...prev.certifications,
          {
            id: Date.now(),
            ...prev.currentCertification,
          },
        ],
        currentCertification: {
          name: "",
          issuer: "",
          date: "",
          link: "",
          certificateDescription: "",
        },
      }))
    }
  }

  const removeSkill = (id, e) => {
    e.preventDefault()
    setState((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill.id !== id),
    }))
  }

  const removeCertification = (id, e) => {
    e.preventDefault()
    setState((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((cert) => cert.id !== id),
    }))
  }

  const addEducation = (e) => {
    e.preventDefault()
    setState((prev) => ({
      ...prev,
      educationList: [
        ...prev.educationList,
        { id: Date.now(), degree: "", college: "", startYear: "", endYear: "" },
      ],
    }))
  }

  const removeEducation = (id, e) => {
    e.preventDefault()
    setState((prev) => ({
      ...prev,
      educationList: prev.educationList.filter((edu) => edu.id !== id),
    }))
  }

  const addWorkExperience = (e) => {
    e.preventDefault()
    setState((prev) => ({
      ...prev,
      showWorkExperience: true,
      workExperience: [
        ...prev.workExperience,
        { id: Date.now(), company: "", role: "", startYear: "", endYear: "" },
      ],
    }))
  }

  const removeWorkExperience = (id, e) => {
    e.preventDefault()
    const updatedWork = state.workExperience.filter((work) => work.id !== id)
    setState((prev) => ({
      ...prev,
      workExperience: updatedWork,
      showWorkExperience: updatedWork.length > 0,
    }))
  }

  const addProject = (e) => {
    e.preventDefault()
    setState((prev) => ({
      ...prev,
      projects: [
        ...prev.projects,
        {
          id: Date.now(),
          name: "",
          description: "",
          codeLink: "",
          liveLink: "",
        },
      ],
    }))
  }

  const removeProject = (id, e) => {
    e.preventDefault()
    setState((prev) => ({
      ...prev,
      projects: prev.projects.filter((project) => project.id !== id),
    }))
  }

  const handleFileChange = (eve) => {
    const fileImage = eve.target.files[0]
    if (fileImage) {
      setState((prev) => ({
        ...prev,
        image: URL.createObjectURL(fileImage),
      }))
    }
  }

  const {
    formData,
    educationList,
    showWorkExperience,
    workExperience,
    projects,
    skills,
    currentSkill,
    certifications,
    currentCertification,
    image,
  } = state

  const hasCurrentCertificationData =
    currentCertification.name ||
    currentCertification.issuer ||
    currentCertification.date ||
    currentCertification.link ||
    currentCertification.certificateDescription

  return (
    <>
      <div className={styles.show}>
        <NavBar />
        <div className={styles.main}>
          <form className={styles.formContainer}>
            <div className={styles.title}>
              Fill your resume details here
              <button className={styles.clearBtn} onClick={clearAllData}>
                Clear All
              </button>
            </div>
            <div className={styles.inputsBox}>
              <div className={styles.personalInfoContainer}>
                <div className={styles.imageContainer}>
                  <input
                    type="file"
                    accept="image/*"
                    className={styles.fileShow}
                    onChange={handleFileChange}
                  />

                  <div>
                    {image ? (
                      <img
                        className={styles.imageShow}
                        src={image}
                        alt="userIcon"
                      />
                    ) : (
                      "No image"
                    )}
                  </div>
                </div>
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
                <div className={styles.socialLinksContainer}>
                  <input
                    type="text"
                    name="linkedin"
                    className={styles.linkedin}
                    placeholder="LinkedIn URL"
                    value={formData.linkedin}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    type="text"
                    name="github"
                    className={styles.github}
                    placeholder="Github"
                    value={formData.github}
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
                        <option value="School">School</option>
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
                    <div className={styles.courseContainer}>
                      <input
                        type="text"
                        className={styles.courseDescription}
                        name="courseDescription"
                        placeholder="Course (E.g. Computer Science Engineering)"
                        value={education.courseDescription}
                        onChange={(e) => handleEducationChange(education.id, e)}
                        required
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
                    <div className={styles.addressContainer}>
                      <textarea
                        className={styles.projectDesc}
                        name="description"
                        placeholder="Project Description"
                        value={project.description}
                        onChange={(e) => handleProjectChange(project.id, e)}
                        required
                        rows={3}
                      />
                    </div>
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
              <div className={styles.skillsContainer}>
                <div className={styles.titles}>Skills</div>
                <div className={styles.skillsInputContainer}>
                  <input
                    type="text"
                    ref={skillsAddRef}
                    className={styles.skillInput}
                    placeholder="Add a skill (e.g., JavaScript, React)"
                    value={currentSkill}
                    onChange={handleSkillChange}
                    onKeyDown={handleKeySkillPress}
                  />
                  <button className={styles.addSkillBtn} onClick={addSkill}>
                    Add Skill
                  </button>
                </div>
                <div className={styles.skillsList}>
                  {skills.map((skill) => (
                    <div key={skill.id} className={styles.skillItem}>
                      <span>{skill.name}</span>
                      <button
                        className={styles.deleteSkillBtn}
                        onClick={(e) => removeSkill(skill.id, e)}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles.certificationsContainer}>
                <div className={styles.titles}>Certifications</div>
                <div className={styles.certificationInputContainer}>
                  <input
                    type="text"
                    className={styles.certificationName}
                    name="name"
                    placeholder="Certification Name"
                    value={currentCertification.name}
                    onChange={handleCertificationChange}
                  />
                  <input
                    type="text"
                    className={styles.certificationIssuer}
                    name="issuer"
                    placeholder="Issuing Organization"
                    value={currentCertification.issuer}
                    onChange={handleCertificationChange}
                  />
                  <textarea
                    className={styles.address}
                    name="certificateDescription"
                    placeholder="Certification Description"
                    value={currentCertification.certificateDescription}
                    onChange={handleCertificationChange}
                    rows={3}
                  />
                  <div className={styles.yearAndLinkContainer}>
                    <input
                      type="text"
                      className={styles.certificationDate}
                      name="date"
                      placeholder="From(MM/YYYY) - To(MM/YYYY)"
                      value={currentCertification.date}
                      onChange={handleCertificationChange}
                    />
                    <input
                      type="url"
                      className={styles.certificationLink}
                      name="link"
                      placeholder="Credential URL (optional)"
                      value={currentCertification.link}
                      onChange={handleCertificationChange}
                    />
                  </div>
                  <button
                    className={styles.addCertificationBtn}
                    onClick={addCertification}
                  >
                    Add Certification
                  </button>
                </div>
                <div className={styles.certificationsList}>
                  {certifications.map((cert) => (
                    <div key={cert.id} className={styles.certificationItem}>
                      <div className={styles.certificationDetails}>
                        <h4>{cert.name}</h4>
                        <p>
                          {cert.issuer} • {cert.date}
                        </p>
                        {cert.link && (
                          <a
                            href={cert.link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View Credential
                          </a>
                        )}
                      </div>
                      <button
                        className={styles.deleteCertificationBtn}
                        onClick={(e) => removeCertification(cert.id, e)}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </form>
          <div className={styles.resumePage}>
            <div className={styles.printButtonContainer}>
              <button
                type="button"
                className={styles.button}
                onClick={() => window.print()}
              >
                Print
              </button>
            </div>
            <div className={styles.resumeContainer}>
              <div className={styles.resumeHeader}>
                <div className={styles.resumeHeaderLeft}>
                  <h1>
                    {formData.firstName} {formData.lastName}
                  </h1>
                  <div className={styles.contactInfo}>
                    <div className={styles.emailAndMobile}>
                      {formData.email && (
                        <p>
                          <a href={`mailto:${formData.email}`}>
                            {formData.email}
                          </a>
                        </p>
                      )}

                      {formData.email && formData.phone && (
                        <span style={{ padding: "0 0.24rem" }}> ||</span>
                      )}
                      {formData.phone && <p>{formData.phone}</p>}
                    </div>
                    {formData.address && <p>{formData.address}</p>}
                    {formData.linkedin && (
                      <span>
                        <a
                          href={formData.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          LinkedIn
                        </a>
                      </span>
                    )}
                    {formData.github && (
                      <span>
                        {" || "}
                        <a
                          href={formData.github}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Github
                        </a>
                      </span>
                    )}
                  </div>
                </div>
                <div className={styles.resumeHeaderRight}>
                  {image ? (
                    <img
                      className={styles.imageShow}
                      src={image}
                      alt="userIcon"
                    />
                  ) : (
                    "No image"
                  )}
                </div>
              </div>
              {educationList.length > 0 && educationList[0].degree && (
                <div className={styles.resumeSection}>
                  <h2>Education</h2>
                  {educationList.map((edu) => (
                    <div key={edu.id} className={styles.educationItem}>
                      <div className={styles.collegeAndYear}>
                        <p className={styles.sideBySide}>
                          <h3>{edu.degree}</h3>
                          <h3>{edu.college}</h3>
                        </p>
                        <p>
                          {edu.startYear} {edu.startYear && "-"}{" "}
                          {edu.endYear || "Present"}
                        </p>
                      </div>
                      <p>{edu.courseDescription}</p>
                    </div>
                  ))}
                </div>
              )}
              {workExperience.length > 0 && (
                <div className={styles.resumeSection}>
                  <h2>Work Experience</h2>
                  {workExperience.map((work) => (
                    <div key={work.id} className={styles.workItem}>
                      <h3>{work.company}</h3>
                      <div className={styles.collegeAndYear}>
                        <p>{work.role}</p>
                        <p>
                          {work.startYear} - {work.endYear || "Present"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {projects.length > 0 && (
                <div className={styles.resumeSection}>
                  <h2>Projects</h2>
                  {projects.map((project) => (
                    <div key={project.id} className={styles.projectItem}>
                      <div className={styles.projectNameAndLiveContainer}>
                        <h3>{project.name}</h3>
                        {project.liveLink && (
                          <p>
                            &#40;
                            <a
                              href={project.liveLink}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {project.liveLink}
                            </a>
                            &#41;
                          </p>
                        )}
                      </div>
                      <ul className={styles.bulletList}>
                        {project.description
                          .split("\n")
                          .filter((line) => line.trim() !== "")
                          .map((line, index) => (
                            <li key={index}>{line}</li>
                          ))}
                      </ul>
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
                    </div>
                  ))}
                </div>
              )}
              {skills.length > 0 && (
                <div className={styles.resumeSection}>
                  <h2>Skills</h2>
                  <div className={styles.skillsPreview}>
                    {skills.map((skill) => (
                      <span key={skill.id} className={styles.skillPreviewItem}>
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {(certifications.length > 0 || hasCurrentCertificationData) && (
                <div className={styles.resumeSection}>
                  <h2>Certifications</h2>
                  <div className={styles.certificationsPreview}>
                    {certifications.map((cert) => (
                      <div
                        key={cert.id}
                        className={styles.certificationPreviewItem}
                      >
                        <h4 className={styles.certificationC}>
                          {cert.name} by {cert.issuer} <p>({cert.date})</p>
                        </h4>
                        <ul className={styles.bulletList}>
                          {cert.certificateDescription
                            .split("\n")
                            .filter((line) => line.trim() !== "")
                            .map((line, index) => (
                              <li key={index}>{line}</li>
                            ))}
                        </ul>
                        {cert.link && (
                          <a
                            href={cert.link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View Credential
                          </a>
                        )}
                      </div>
                    ))}
                    {hasCurrentCertificationData && (
                      <div className={styles.certificationPreviewItem}>
                        <h4 className={styles.certificationC}>
                          {currentCertification.name &&
                            currentCertification.name}{" "}
                          by{" "}
                          {currentCertification.issuer &&
                            `${currentCertification.issuer}`}{" "}
                          <p>
                            (
                            {currentCertification.date &&
                              currentCertification.date}
                            )
                          </p>
                        </h4>
                        <ul className={styles.bulletList}>
                          {currentCertification.certificateDescription
                            .split("\n")
                            .filter((line) => line.trim() !== "")
                            .map((line, index) => (
                              <li key={index}>{line}</li>
                            ))}
                        </ul>
                        {currentCertification.link && (
                          <a
                            href={currentCertification.link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View Credential
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Inputs
