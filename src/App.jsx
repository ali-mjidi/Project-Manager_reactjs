import { useState } from "react";

import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectsSidebar from "./components/ProjectsSidebar";
import Button from "./components/Button";
import SelectedProject from "./components/SelectedProject";

// const initialProjectsState = {
//     selectedProject: undefined,
//     projects: [],
// };

const initialProjectsState = {
    projects: [
        {
            id: "751b4e03-44f5-42ab-9ea8-85112e2cea97",
            name: "Learn React",
            description: "Still testing this fucking shit.",
            date: "2024-08-08",
            tasks: [],
        },
    ],
    selectedProject: "751b4e03-44f5-42ab-9ea8-85112e2cea97",
};

function App() {
    const [projectsState, setProjectsState] = useState(initialProjectsState);
    let content;

    function handleStartAddProject() {
        setProjectsState(prevState => ({
            ...prevState,
            selectedProject: null,
        }));
    }

    function handleCancelAddProject() {
        setProjectsState(prevState => ({
            ...prevState,
            selectedProject: undefined,
        }));
    }

    function handleSaveProject(projectData) {
        setProjectsState(prevState => ({
            projects: [...prevState.projects, projectData],
            selectedProject: projectData.id,
        }));
    }

    function handleSelectProject(id) {
        setProjectsState(prevState => ({ ...prevState, selectedProject: id }));
    }

    function handleDeleteProject() {
        setProjectsState(prevState => ({
            selectedProject: undefined,
            projects: prevState.projects.filter(
                project => project.id !== prevState.selectedProject
            ),
        }));
    }

    function handleAddTask(taskTitle) {
        setProjectsState(prevState => {
            const projects = prevState.projects.map(project =>
                project.id !== prevState.selectedProject
                    ? project
                    : { ...project, tasks: [...project.tasks, taskTitle] }
            );

            return {
                ...prevState,
                projects,
            };
        });
    }

    function handleDeleteTask(index) {
        const deleteItem = array => {
            array.splice(index, 1);

            return array;
        };

        setProjectsState(prevState => {
            const projects = prevState.projects.map(project =>
                project.id !== prevState.selectedProject
                    ? project
                    : { ...project, tasks: deleteItem(project.tasks) }
            );

            return { ...prevState, projects };
        });
    }

    if (projectsState.selectedProject === undefined) {
        content = (
            <NoProjectSelected>
                <Button onClick={handleStartAddProject}>
                    Create New Project
                </Button>
            </NoProjectSelected>
        );
    } else if (projectsState.selectedProject === null) {
        content = (
            <NewProject
                onCancel={handleCancelAddProject}
                onSave={handleSaveProject}
            />
        );
    } else {
        const project = projectsState.projects.find(
            project => project.id === projectsState.selectedProject
        );

        content = (
            <SelectedProject
                project={project}
                onDelete={handleDeleteProject}
                onAddTask={handleAddTask}
                onDeleteTask={handleDeleteTask}
            />
        );
    }

    return (
        <main className="h-screen py-8 flex gap-8">
            <ProjectsSidebar
                projectsState={projectsState}
                onSelect={handleSelectProject}>
                <Button onClick={handleStartAddProject}>+ Add Project</Button>
            </ProjectsSidebar>

            {content}
        </main>
    );
}

export default App;
