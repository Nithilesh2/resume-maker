import React, { useRef, useState, useEffect } from "react";
import styles from "./Inputs.module.css";

const Inputs = () => {
  const loadFromLocalStorage = (key, defaultValue) => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : defaultValue;
  };

  const [formData, setFormData] = useState(
    loadFromLocalStorage("resumeFormData", {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
    })
  );

  const [educationList, setEducationList] = useState(
    loadFromLocalStorage("resumeEducationList", [
      {
        id: 1,
        degree: "",
        college: "",
        courseDescription: "",
        startYear: "",
        endYear: "",
      },
    ])
  );

  const skillsAddRef = useRef();

  const [showWorkExperience, setShowWorkExperience] = useState(
    loadFromLocalStorage("resumeShowWorkExperience", false)
  );

  const [workExperience, setWorkExperience] = useState(
    loadFromLocalStorage("resumeWorkExperience", [])
  );

  const [projects, setProjects] = useState(
    loadFromLocalStorage("resumeProjects", [])
  );

  const [skills, setSkills] = useState(
    loadFromLocalStorage("resumeSkills", [])
  );

  const [currentSkill, setCurrentSkill] = useState("");

  const [certifications, setCertifications] = useState(
    loadFromLocalStorage("resumeCertifications", [])
  );

  const [currentCertification, setCurrentCertification] = useState({
    name: "",
    issuer: "",
    date: "",
    link: "",
  });

  useEffect(() => {
    localStorage.setItem("resumeFormData", JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    localStorage.setItem("resumeEducationList", JSON.stringify(educationList));
  }, [educationList]);

  useEffect(() => {
    localStorage.setItem("resumeShowWorkExperience", JSON.stringify(showWorkExperience));
  }, [showWorkExperience]);

  useEffect(() => {
    localStorage.setItem("resumeWorkExperience", JSON.stringify(workExperience));
  }, [workExperience]);

  useEffect(() => {
    localStorage.setItem("resumeProjects", JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem("resumeSkills", JSON.stringify(skills));
  }, [skills]);

  useEffect(() => {
    localStorage.setItem("resumeCertifications", JSON.stringify(certifications));
  }, [certifications]);

  const clearAllData = (e) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to clear all data?")) {
      localStorage.clear();
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
      });
      setEducationList([{
        id: 1,
        degree: "",
        college: "",
        courseDescription: "",
        startYear: "",
        endYear: "",
      }]);
      setShowWorkExperience(false);
      setWorkExperience([]);
      setProjects([]);
      setSkills([]);
      setCertifications([]);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEducationChange = (id, e) => {
    const { name, value } = e.target;
    setEducationList(
      educationList.map((edu) =>
        edu.id === id ? { ...edu, [name]: value } : edu
      )
    );
  };

  const handleWorkChange = (id, e) => {
    const { name, value } = e.target;
    setWorkExperience(
      workExperience.map((work) =>
        work.id === id ? { ...work, [name]: value } : work
      )
    );
  };

  const handleProjectChange = (id, e) => {
    const { name, value } = e.target;
    setProjects(
      projects.map((project) =>
        project.id === id ? { ...project, [name]: value } : project
      )
    );
  };

  const handleSkillChange = (e) => {
    setCurrentSkill(e.target.value);
  };

  const handleCertificationChange = (e) => {
    const { name, value } = e.target;
    setCurrentCertification({
      ...currentCertification,
      [name]: value,
    });
  };

  const addSkill = (e) => {
    e.preventDefault();
    if (currentSkill.trim() !== "") {
      setSkills([...skills, { id: Date.now(), name: currentSkill }]);
      setCurrentSkill("");
    }
  };

  const handleKeySkillPress = (e) => {
    if (e.key === "Enter" && skillsAddRef.current.value.trim() !== "") {
      e.preventDefault();
      addSkill(e);
      skillsAddRef.current.focus();
    }
  };

  const addCertification = (e) => {
    e.preventDefault();
    if (currentCertification.name.trim() !== "") {
      setCertifications([
        ...certifications,
        {
          id: Date.now(),
          ...currentCertification,
        },
      ]);
      setCurrentCertification({
        name: "",
        issuer: "",
        date: "",
        link: "",
      });
    }
  };

  const removeSkill = (id, e) => {
    e.preventDefault();
    setSkills(skills.filter((skill) => skill.id !== id));
  };

  const removeCertification = (id, e) => {
    e.preventDefault();
    setCertifications(certifications.filter((cert) => cert.id !== id));
  };

  const addEducation = (e) => {
    e.preventDefault();
    setEducationList([
      ...educationList,
      { id: Date.now(), degree: "", college: "", startYear: "", endYear: "" },
    ]);
  };

  const removeEducation = (id, e) => {
    e.preventDefault();
    setEducationList(educationList.filter((edu) => edu.id !== id));
  };

  const addWorkExperience = (e) => {
    e.preventDefault();
    setShowWorkExperience(true);
    setWorkExperience([
      ...workExperience,
      { id: Date.now(), company: "", role: "", startYear: "", endYear: "" },
    ]);
  };

  const removeWorkExperience = (id, e) => {
    e.preventDefault();
    const updatedWork = workExperience.filter((work) => work.id !== id);
    setWorkExperience(updatedWork);
    if (updatedWork.length === 0) setShowWorkExperience(false);
  };

  const addProject = (e) => {
    e.preventDefault();
    setProjects([
      ...projects,
      {
        id: Date.now(),
        name: "",
        description: "",
        codeLink: "",
        liveLink: "",
      },
    ]);
  };

  const removeProject = (id, e) => {
    e.preventDefault();
    const updatedProjects = projects.filter((project) => project.id !== id);
    setProjects(updatedProjects);
  };

  return (
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
                        e.target.value = e.target.value.slice(0, 4);
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
                        e.target.value = e.target.value.slice(0, 4);
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
                          e.target.value = e.target.value.slice(0, 4);
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
                          e.target.value = e.target.value.slice(0, 4);
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
              <div className={styles.yearAndLinkContainer}>
                <input
                  type="text"
                  className={styles.certificationDate}
                  name="date"
                  placeholder="Date Earned (MM/YYYY)"
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
          {certifications.length > 0 && (
            <div className={styles.resumeSection}>
              <h2>Certifications</h2>
              <div className={styles.certificationsPreview}>
                {certifications.map((cert) => (
                  <div
                    key={cert.id}
                    className={styles.certificationPreviewItem}
                  >
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
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Inputs;