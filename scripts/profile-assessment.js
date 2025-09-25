// Skills available for selection
const skillsList = [
    'JavaScript', 'React', 'Node.js', 'Python', 'CSS', 'HTML',
    'UI/UX Design', 'Project Management', 'Data Analysis'
];

// Initialize the page
window.addEventListener('load', () => {
    initializeSkillsSelector();
    loadExistingProjects();
});

// Create skills selector
function initializeSkillsSelector() {
    const skillsContainer = document.querySelector('.skills-selector');
    
    skillsList.forEach(skill => {
        const skillButton = document.createElement('button');
        skillButton.className = 'skill-tag';
        skillButton.textContent = skill;
        skillButton.onclick = () => toggleSkill(skillButton);
        skillsContainer.appendChild(skillButton);
    });
}

// Toggle skill selection
function toggleSkill(button) {
    button.classList.toggle('selected');
}

// Get selected skills
function getSelectedSkills() {
    return Array.from(document.querySelectorAll('.skill-tag.selected'))
        .map(btn => btn.textContent);
}

// Project management functions
function saveProject() {
    const title = document.querySelector('input[type="text"]').value;
    const description = document.querySelector('textarea').value;
    
    if (!title || !description) {
        alert('Please fill in both title and description');
        return;
    }

    const projectCard = createProjectCard(title, description);
    document.querySelector('.projects-grid').appendChild(projectCard);
    clearForm();
}

function createProjectCard(title, description) {
    const selectedSkills = getSelectedSkills();
    const skillsHtml = selectedSkills.length 
        ? `<div class="project-skills">${selectedSkills.map(skill => 
            `<span class="skill-tag">${skill}</span>`).join('')}</div>` 
        : '';

    const card = document.createElement('div');
    card.className = 'project-card animate-in';
    card.innerHTML = `
        <h3 contenteditable="false" class="project-title">${title}</h3>
        <p contenteditable="false" class="project-description">${description}</p>
        ${skillsHtml}
        <div class="project-actions">
            <button onclick="editProject(this.parentElement.parentElement)" class="edit-btn">Edit</button>
            <button onclick="deleteProject(this.parentElement.parentElement)" class="delete-btn">Delete</button>
        </div>
    `;
    return card;
}

function editProject(card) {
    const title = card.querySelector('.project-title');
    const description = card.querySelector('.project-description');
    const editBtn = card.querySelector('.edit-btn');

    if (editBtn.textContent === 'Edit') {
        // Enable editing
        title.contentEditable = 'true';
        description.contentEditable = 'true';
        title.focus();
        editBtn.textContent = 'Save';
        title.classList.add('editing');
        description.classList.add('editing');
    } else {
        // Save changes
        title.contentEditable = 'false';
        description.contentEditable = 'false';
        editBtn.textContent = 'Edit';
        title.classList.remove('editing');
        description.classList.remove('editing');
    }
}

function deleteProject(card) {
    if (confirm('Are you sure you want to delete this project?')) {
        card.classList.add('delete-animation');
        setTimeout(() => card.remove(), 300);
    }
}

function clearForm() {
    document.querySelector('input[type="text"]').value = '';
    document.querySelector('textarea').value = '';
}

function startAssessment() {
    // Hide the initial button
    document.querySelector('.assessment-start').style.display = 'none';
    
    // Show the project builder and showcase
    document.querySelector('.project-builder').style.display = 'block';
    document.querySelector('.projects-showcase').style.display = 'block';
    
    // Add smooth reveal animation
    document.querySelector('.project-builder').classList.add('fade-in');
    document.querySelector('.projects-showcase').classList.add('fade-in');
}