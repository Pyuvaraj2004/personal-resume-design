
document.addEventListener('DOMContentLoaded', function() {
  // Get DOM elements
  const buildTab = document.getElementById('buildTab');
  const previewTab = document.getElementById('previewTab');
  const buildTabContent = document.getElementById('buildTabContent');
  const previewTabContent = document.getElementById('previewTabContent');
  const viewFullPreview = document.getElementById('viewFullPreview');
  const downloadPDF = document.getElementById('downloadPDF');
  const printResume = document.getElementById('printResume');
  const addExperience = document.getElementById('addExperience');
  const addEducation = document.getElementById('addEducation');
  const addSkill = document.getElementById('addSkill');
  const experienceContainer = document.getElementById('experienceContainer');
  const educationContainer = document.getElementById('educationContainer');
  const skillsContainer = document.getElementById('skillsContainer');
  const resumePreview = document.getElementById('resumePreview');
  const miniPreview = document.getElementById('miniPreview');
  const templateRadios = document.querySelectorAll('input[name="template"]');
  
  // UUID helper function
  function generateId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
  
  // Format date helper function
  function formatDate(dateString) {
    if (!dateString) return '';
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    } catch (error) {
      return dateString;
    }
  }
  
  // Initialize resume data
  let resumeData = {
    contact: {
      fullName: '',
      email: '',
      phone: '',
      address: '',
      linkedin: '',
      website: ''
    },
    summary: '',
    experience: [],
    education: [],
    skills: [],
    template: 'modern'
  };
  
  // Tab switching
  buildTab.addEventListener('click', function() {
    buildTab.classList.add('active');
    previewTab.classList.remove('active');
    buildTabContent.classList.add('active');
    previewTabContent.classList.remove('active');
  });
  
  previewTab.addEventListener('click', function() {
    previewTab.classList.add('active');
    buildTab.classList.remove('active');
    previewTabContent.classList.add('active');
    buildTabContent.classList.remove('active');
    updateResumePreview();
  });
  
  viewFullPreview.addEventListener('click', function() {
    previewTab.click();
  });
  
  // Template selection
  templateRadios.forEach(radio => {
    radio.addEventListener('change', function() {
      resumeData.template = this.value;
      updateResumePreview();
      updateMiniPreview();
    });
  });
  
  // Contact form inputs
  document.getElementById('fullName').addEventListener('input', function() {
    resumeData.contact.fullName = this.value;
    updateResumePreview();
    updateMiniPreview();
  });
  
  document.getElementById('email').addEventListener('input', function() {
    resumeData.contact.email = this.value;
    updateResumePreview();
    updateMiniPreview();
  });
  
  document.getElementById('phone').addEventListener('input', function() {
    resumeData.contact.phone = this.value;
    updateResumePreview();
    updateMiniPreview();
  });
  
  document.getElementById('address').addEventListener('input', function() {
    resumeData.contact.address = this.value;
    updateResumePreview();
    updateMiniPreview();
  });
  
  document.getElementById('linkedin').addEventListener('input', function() {
    resumeData.contact.linkedin = this.value;
    updateResumePreview();
    updateMiniPreview();
  });
  
  document.getElementById('website').addEventListener('input', function() {
    resumeData.contact.website = this.value;
    updateResumePreview();
    updateMiniPreview();
  });
  
  document.getElementById('summary').addEventListener('input', function() {
    resumeData.summary = this.value;
    updateResumePreview();
    updateMiniPreview();
  });
  
  // Add experience item
  addExperience.addEventListener('click', function() {
    const experienceTemplate = document.getElementById('experienceTemplate');
    const clone = document.importNode(experienceTemplate.content, true);
    const experienceId = generateId();
    
    const experienceItem = clone.querySelector('.experience-item');
    experienceItem.dataset.id = experienceId;
    
    const removeButton = clone.querySelector('.btn-remove');
    removeButton.addEventListener('click', function() {
      removeExperience(experienceId);
    });
    
    // Add event listeners to form fields
    const titleInput = clone.querySelector('.exp-title');
    titleInput.addEventListener('input', function() {
      updateExperienceData(experienceId, 'title', this.value);
    });
    
    const companyInput = clone.querySelector('.exp-company');
    companyInput.addEventListener('input', function() {
      updateExperienceData(experienceId, 'company', this.value);
    });
    
    const locationInput = clone.querySelector('.exp-location');
    locationInput.addEventListener('input', function() {
      updateExperienceData(experienceId, 'location', this.value);
    });
    
    const startDateInput = clone.querySelector('.exp-start-date');
    startDateInput.addEventListener('input', function() {
      updateExperienceData(experienceId, 'startDate', this.value);
    });
    
    const endDateInput = clone.querySelector('.exp-end-date');
    endDateInput.addEventListener('input', function() {
      if (!currentCheckbox.checked) {
        updateExperienceData(experienceId, 'endDate', this.value);
      }
    });
    
    const currentCheckbox = clone.querySelector('.exp-current');
    currentCheckbox.addEventListener('change', function() {
      if (this.checked) {
        endDateInput.disabled = true;
        updateExperienceData(experienceId, 'endDate', 'Present');
      } else {
        endDateInput.disabled = false;
        updateExperienceData(experienceId, 'endDate', endDateInput.value);
      }
    });
    
    const descriptionInput = clone.querySelector('.exp-description');
    descriptionInput.addEventListener('input', function() {
      updateExperienceData(experienceId, 'description', this.value);
    });
    
    experienceContainer.appendChild(clone);
    
    // Add to resume data
    resumeData.experience.push({
      id: experienceId,
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      description: ''
    });
    
    updateResumePreview();
    updateMiniPreview();
  });
  
  // Add education item
  addEducation.addEventListener('click', function() {
    const educationTemplate = document.getElementById('educationTemplate');
    const clone = document.importNode(educationTemplate.content, true);
    const educationId = generateId();
    
    const educationItem = clone.querySelector('.education-item');
    educationItem.dataset.id = educationId;
    
    const removeButton = clone.querySelector('.btn-remove');
    removeButton.addEventListener('click', function() {
      removeEducation(educationId);
    });
    
    // Add event listeners to form fields
    const degreeInput = clone.querySelector('.edu-degree');
    degreeInput.addEventListener('input', function() {
      updateEducationData(educationId, 'degree', this.value);
    });
    
    const schoolInput = clone.querySelector('.edu-school');
    schoolInput.addEventListener('input', function() {
      updateEducationData(educationId, 'school', this.value);
    });
    
    const locationInput = clone.querySelector('.edu-location');
    locationInput.addEventListener('input', function() {
      updateEducationData(educationId, 'location', this.value);
    });
    
    const startDateInput = clone.querySelector('.edu-start-date');
    startDateInput.addEventListener('input', function() {
      updateEducationData(educationId, 'startDate', this.value);
    });
    
    const endDateInput = clone.querySelector('.edu-end-date');
    endDateInput.addEventListener('input', function() {
      if (!currentCheckbox.checked) {
        updateEducationData(educationId, 'endDate', this.value);
      }
    });
    
    const currentCheckbox = clone.querySelector('.edu-current');
    currentCheckbox.addEventListener('change', function() {
      if (this.checked) {
        endDateInput.disabled = true;
        updateEducationData(educationId, 'endDate', 'Present');
      } else {
        endDateInput.disabled = false;
        updateEducationData(educationId, 'endDate', endDateInput.value);
      }
    });
    
    const gpaInput = clone.querySelector('.edu-gpa');
    gpaInput.addEventListener('input', function() {
      updateEducationData(educationId, 'gpa', this.value);
    });
    
    const descriptionInput = clone.querySelector('.edu-description');
    descriptionInput.addEventListener('input', function() {
      updateEducationData(educationId, 'description', this.value);
    });
    
    educationContainer.appendChild(clone);
    
    // Add to resume data
    resumeData.education.push({
      id: educationId,
      degree: '',
      school: '',
      location: '',
      startDate: '',
      endDate: '',
      gpa: '',
      description: ''
    });
    
    updateResumePreview();
    updateMiniPreview();
  });
  
  // Add skill item
  addSkill.addEventListener('click', function() {
    const skillTemplate = document.getElementById('skillTemplate');
    const clone = document.importNode(skillTemplate.content, true);
    const skillId = generateId();
    
    const skillItem = clone.querySelector('.skill-item');
    skillItem.dataset.id = skillId;
    
    const removeButton = clone.querySelector('.btn-remove');
    removeButton.addEventListener('click', function() {
      removeSkill(skillId);
    });
    
    // Add event listeners to form fields
    const nameInput = clone.querySelector('.skill-name');
    nameInput.addEventListener('input', function() {
      updateSkillData(skillId, 'name', this.value);
    });
    
    const levelSelect = clone.querySelector('.skill-level');
    levelSelect.addEventListener('change', function() {
      updateSkillData(skillId, 'level', this.value);
    });
    
    skillsContainer.appendChild(clone);
    
    // Add to resume data
    resumeData.skills.push({
      id: skillId,
      name: '',
      level: 'Intermediate'
    });
    
    updateResumePreview();
    updateMiniPreview();
  });
  
  // Update experience data
  function updateExperienceData(id, field, value) {
    const experience = resumeData.experience.find(exp => exp.id === id);
    if (experience) {
      experience[field] = value;
      updateResumePreview();
      updateMiniPreview();
    }
  }
  
  // Update education data
  function updateEducationData(id, field, value) {
    const education = resumeData.education.find(edu => edu.id === id);
    if (education) {
      education[field] = value;
      updateResumePreview();
      updateMiniPreview();
    }
  }
  
  // Update skill data
  function updateSkillData(id, field, value) {
    const skill = resumeData.skills.find(skill => skill.id === id);
    if (skill) {
      skill[field] = value;
      updateResumePreview();
      updateMiniPreview();
    }
  }
  
  // Remove experience
  function removeExperience(id) {
    const item = document.querySelector(`.experience-item[data-id="${id}"]`);
    if (item) {
      item.remove();
    }
    
    resumeData.experience = resumeData.experience.filter(exp => exp.id !== id);
    updateResumePreview();
    updateMiniPreview();
  }
  
  // Remove education
  function removeEducation(id) {
    const item = document.querySelector(`.education-item[data-id="${id}"]`);
    if (item) {
      item.remove();
    }
    
    resumeData.education = resumeData.education.filter(edu => edu.id !== id);
    updateResumePreview();
    updateMiniPreview();
  }
  
  // Remove skill
  function removeSkill(id) {
    const item = document.querySelector(`.skill-item[data-id="${id}"]`);
    if (item) {
      item.remove();
    }
    
    resumeData.skills = resumeData.skills.filter(skill => skill.id !== id);
    updateResumePreview();
    updateMiniPreview();
  }
  
  // Update resume preview
  function updateResumePreview() {
    // Clear previous content
    resumePreview.innerHTML = '';
    
    // Add template class
    resumePreview.className = `resume-preview template-${resumeData.template}`;
    
    // Create resume content
    const resumeContent = document.createElement('div');
    
    // Header section
    const header = document.createElement('div');
    header.className = 'resume-header';
    
    const name = document.createElement('h1');
    name.className = 'text-2xl font-bold mb-1';
    name.textContent = resumeData.contact.fullName || 'Your Name';
    
    const contactInfo = document.createElement('div');
    contactInfo.className = 'flex flex-wrap gap-2 text-sm';
    
    if (resumeData.contact.email) {
      const email = document.createElement('div');
      email.className = 'flex items-center';
      email.innerHTML = `<i class="fas fa-envelope mr-1"></i> ${resumeData.contact.email}`;
      contactInfo.appendChild(email);
    }
    
    if (resumeData.contact.phone) {
      const phone = document.createElement('div');
      phone.className = 'flex items-center';
      phone.innerHTML = `<i class="fas fa-phone mr-1"></i> ${resumeData.contact.phone}`;
      contactInfo.appendChild(phone);
    }
    
    if (resumeData.contact.address) {
      const address = document.createElement('div');
      address.className = 'flex items-center';
      address.innerHTML = `<i class="fas fa-map-marker-alt mr-1"></i> ${resumeData.contact.address}`;
      contactInfo.appendChild(address);
    }
    
    if (resumeData.contact.linkedin) {
      const linkedin = document.createElement('div');
      linkedin.className = 'flex items-center';
      linkedin.innerHTML = `<i class="fab fa-linkedin mr-1"></i> ${resumeData.contact.linkedin}`;
      contactInfo.appendChild(linkedin);
    }
    
    if (resumeData.contact.website) {
      const website = document.createElement('div');
      website.className = 'flex items-center';
      website.innerHTML = `<i class="fas fa-globe mr-1"></i> ${resumeData.contact.website}`;
      contactInfo.appendChild(website);
    }
    
    header.appendChild(name);
    header.appendChild(contactInfo);
    resumeContent.appendChild(header);
    
    // Summary section
    if (resumeData.summary) {
      const summarySection = document.createElement('div');
      summarySection.className = 'resume-section mb-4';
      
      const summaryTitle = document.createElement('h2');
      summaryTitle.className = 'resume-section-title text-lg font-semibold';
      summaryTitle.textContent = 'Summary';
      
      const summaryContent = document.createElement('p');
      summaryContent.className = 'text-sm';
      summaryContent.textContent = resumeData.summary;
      
      summarySection.appendChild(summaryTitle);
      summarySection.appendChild(summaryContent);
      
      resumeContent.appendChild(summarySection);
    }
    
    // Experience section
    if (resumeData.experience.length > 0) {
      const experienceSection = document.createElement('div');
      experienceSection.className = 'resume-section mb-4';
      
      const experienceTitle = document.createElement('h2');
      experienceTitle.className = 'resume-section-title text-lg font-semibold';
      experienceTitle.textContent = 'Experience';
      
      const experienceList = document.createElement('div');
      experienceList.className = 'space-y-3';
      
      resumeData.experience.forEach(exp => {
        if (exp.title || exp.company) {
          const experienceItem = document.createElement('div');
          experienceItem.className = 'mb-2';
          
          const header = document.createElement('div');
          header.className = 'flex justify-between items-start';
          
          const titleCompany = document.createElement('div');
          
          const title = document.createElement('h3');
          title.className = 'font-semibold text-sm';
          title.textContent = exp.title || 'Position';
          
          const company = document.createElement('div');
          company.className = 'text-xs';
          company.textContent = exp.company + (exp.location ? ` | ${exp.location}` : '');
          
          titleCompany.appendChild(title);
          titleCompany.appendChild(company);
          
          const dates = document.createElement('div');
          dates.className = 'text-xs text-gray-500';
          if (exp.startDate || exp.endDate) {
            dates.textContent = `${formatDate(exp.startDate)} - ${exp.endDate === 'Present' ? 'Present' : formatDate(exp.endDate)}`;
          }
          
          header.appendChild(titleCompany);
          header.appendChild(dates);
          
          experienceItem.appendChild(header);
          
          if (exp.description) {
            const description = document.createElement('p');
            description.className = 'text-xs mt-1';
            description.textContent = exp.description;
            experienceItem.appendChild(description);
          }
          
          experienceList.appendChild(experienceItem);
        }
      });
      
      experienceSection.appendChild(experienceTitle);
      experienceSection.appendChild(experienceList);
      
      resumeContent.appendChild(experienceSection);
    }
    
    // Education section
    if (resumeData.education.length > 0) {
      const educationSection = document.createElement('div');
      educationSection.className = 'resume-section mb-4';
      
      const educationTitle = document.createElement('h2');
      educationTitle.className = 'resume-section-title text-lg font-semibold';
      educationTitle.textContent = 'Education';
      
      const educationList = document.createElement('div');
      educationList.className = 'space-y-3';
      
      resumeData.education.forEach(edu => {
        if (edu.degree || edu.school) {
          const educationItem = document.createElement('div');
          educationItem.className = 'mb-2';
          
          const header = document.createElement('div');
          header.className = 'flex justify-between items-start';
          
          const degreeSchool = document.createElement('div');
          
          const degree = document.createElement('h3');
          degree.className = 'font-semibold text-sm';
          degree.textContent = edu.degree || 'Degree';
          
          const schoolInfo = document.createElement('div');
          schoolInfo.className = 'text-xs';
          let schoolText = edu.school;
          if (edu.location) schoolText += ` | ${edu.location}`;
          if (edu.gpa) schoolText += ` | GPA: ${edu.gpa}`;
          schoolInfo.textContent = schoolText;
          
          degreeSchool.appendChild(degree);
          degreeSchool.appendChild(schoolInfo);
          
          const dates = document.createElement('div');
          dates.className = 'text-xs text-gray-500';
          if (edu.startDate || edu.endDate) {
            dates.textContent = `${formatDate(edu.startDate)} - ${edu.endDate === 'Present' ? 'Present' : formatDate(edu.endDate)}`;
          }
          
          header.appendChild(degreeSchool);
          header.appendChild(dates);
          
          educationItem.appendChild(header);
          
          if (edu.description) {
            const description = document.createElement('p');
            description.className = 'text-xs mt-1';
            description.textContent = edu.description;
            educationItem.appendChild(description);
          }
          
          educationList.appendChild(educationItem);
        }
      });
      
      educationSection.appendChild(educationTitle);
      educationSection.appendChild(educationList);
      
      resumeContent.appendChild(educationSection);
    }
    
    // Skills section
    if (resumeData.skills.length > 0) {
      const skillsSection = document.createElement('div');
      skillsSection.className = 'resume-section';
      
      const skillsTitle = document.createElement('h2');
      skillsTitle.className = 'resume-section-title text-lg font-semibold';
      skillsTitle.textContent = 'Skills';
      
      const skillsList = document.createElement('div');
      skillsList.className = 'flex flex-wrap gap-2';
      
      resumeData.skills.forEach(skill => {
        if (skill.name) {
          const skillItem = document.createElement('span');
          skillItem.className = 'text-xs bg-gray-100 px-2 py-1 rounded';
          skillItem.textContent = skill.name;
          if (skill.level && resumeData.template !== 'minimal') {
            skillItem.textContent += ` (${skill.level})`;
          }
          skillsList.appendChild(skillItem);
        }
      });
      
      skillsSection.appendChild(skillsTitle);
      skillsSection.appendChild(skillsList);
      
      resumeContent.appendChild(skillsSection);
    }
    
    resumePreview.appendChild(resumeContent);
  }
  
  // Update mini preview
  function updateMiniPreview() {
    miniPreview.innerHTML = resumePreview.innerHTML;
    miniPreview.className = `template-${resumeData.template}`;
  }
  
  // Download PDF
  downloadPDF.addEventListener('click', function() {
    const filename = resumeData.contact.fullName.trim() ? 
                    `${resumeData.contact.fullName.replace(/\s+/g, '_')}_Resume` : 
                    'Resume';
    
    const element = resumePreview;
    const opt = {
      margin: [0.5, 0.5, 0.5, 0.5],
      filename: `${filename}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    
    html2pdf().set(opt).from(element).save();
  });
  
  // Print resume
  printResume.addEventListener('click', function() {
    window.print();
  });
  
  // Add default items on page load
  addExperience.click();
  addEducation.click();
  addSkill.click();
  
  // Initial preview update
  updateResumePreview();
  updateMiniPreview();
});
