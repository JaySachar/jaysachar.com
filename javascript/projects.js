const filterButtons = document.querySelectorAll('.filter_button button');
const projects = document.querySelectorAll('.project')

let activeFilters = [];

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.dataset.filter;

        button.classList.toggle('active');

        if (activeFilters.includes(filter)){
            activeFilters = activeFilters.filter(activeFilter => activeFilter !== filter);
        } else{
            activeFilters.push(filter);
        }

        projects.forEach(project => {
            const projectCategory = project.dataset.category.split('/');
            if (activeFilters.length === 0 || activeFilters.some(activeFilter => projectCategory.includes(activeFilter))) {
                project.style.display = 'block';
            } else {
                project.style.display = 'none';
            }
        });
    });
});