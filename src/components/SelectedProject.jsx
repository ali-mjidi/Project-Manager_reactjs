import { useRef } from "react";
import ErrorModal from "./ErrorModal";
import Task from "./Task";

function SelectedProject({ project, onDelete, onAddTask, onDeleteTask }) {
    const errorModal = useRef();
    const taskInput = useRef();
    const formattedDate = new Date(project.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
    });

    function handleSubmit(e) {
        const taskTitle = taskInput.current.value.trim();

        if (taskTitle) {
            onAddTask(taskTitle);
            taskInput.current.value = "";
        } else {
            errorModal.current.open();
        }

        e.preventDefault();
    }

    return (
        <>
            <ErrorModal ref={errorModal}>
                <h2 className="text-2xl font-bold text-stone-700 my-4">
                    Invalid Input
                </h2>
                <p className="capitalize text-stone-600 mb-4">
                    It seems like you entered or not entered valid values
                </p>
                <p className="capitalize text-stone-600 mb-4">
                    Please make sure that you provide valid values
                </p>
            </ErrorModal>
            <div className="w-[35rem] mt-16">
                <header className="pb-4 mb-2 border-b-2 border-stone-300">
                    <div className="flex items-center justify-between">
                        <h1 className="mb-2 text-3xl font-bold text-stone-700">
                            {project.name}
                        </h1>
                        <button
                            className="text-stone-600 hover:text-stone-950 hover:underline"
                            onClick={onDelete}>
                            Delete
                        </button>
                    </div>
                    <p className="mb-4 text-stone-400">{formattedDate}</p>
                    <p className="text-stone-600 whitespace-pre-wrap">
                        {project.description}
                    </p>
                </header>
                <section className="flex flex-col gap-4">
                    <h3 className="text-xl">Tasks</h3>
                    <form
                        className="flex justify-between items-center gap-4"
                        onSubmit={handleSubmit}>
                        <input
                            ref={taskInput}
                            type="text"
                            className="w-[80%] px-4 py-1 bg-stone-200 border-2 border-stone-300 rounded-md focus:outline-none focus:border-stone-500"
                        />
                        <button className="w-[20%] py-1 bg-stone-800 text-stone-50 rounded-md hover:bg-stone-950">
                            Add
                        </button>
                    </form>
                    {!project.tasks.length && (
                        <p className="text-stone-400">
                            This project does not have any tasks yet!
                        </p>
                    )}
                    {!!project.tasks.length && (
                        <ul>
                            {project.tasks.map((task, index) => (
                                <Task
                                    key={index}
                                    onDelete={() => onDeleteTask(index)}>
                                    {task}
                                </Task>
                            ))}
                        </ul>
                    )}
                </section>
            </div>
        </>
    );
}

export default SelectedProject;
