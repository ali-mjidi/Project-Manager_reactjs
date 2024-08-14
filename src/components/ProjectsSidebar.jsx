function ProjectsSidebar({ children, projectsState, onSelect }) {
    const { selectedProject, projects } = projectsState;

    return (
        <aside className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
            <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-200">
                Your Projects
            </h2>
            {children}
            <ul className="mt-8">
                {projects.map(project => (
                    <li
                        key={project.id}
                        className={`${
                            selectedProject === project.id && "bg-stone-700 hover:bg-stone-700"
                        } rounded-md hover:bg-stone-800`}>
                        <button
                            className="w-full text-left px-2 py-1 text-stone-50"
                            onClick={() => onSelect(project.id)}>
                            {project.name}
                        </button>
                    </li>
                ))}
            </ul>
        </aside>
    );
}

export default ProjectsSidebar;
