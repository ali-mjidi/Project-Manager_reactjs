import { useRef } from "react";

import Input from "./Input";
import ErrorModal from "./ErrorModal";

function NewProject({ onCancel, onSave }) {
    const nameInput = useRef(null);
    const descInput = useRef(null);
    const dateInput = useRef(null);
    const errorModal = useRef(null);

    const classes =
        "bg-stone-300 px-4 py-1 rounded-md border-transparent border-b-2 text-x focus:outline-none focus:border-stone-950";

    function handleSave() {
        const projectName = nameInput.current.value.trim();
        const projectDescription = descInput.current.value.trim();
        const projectDate = dateInput.current.value.trim();

        if (projectName && projectDescription && projectDate) {
            onSave({
                id: crypto.randomUUID(),
                name: projectName,
                description: projectDescription,
                date: projectDate,
                tasks: [],
            });
        } else {
            errorModal.current.open();
        }
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
                <menu className="flex gap-4 items-center justify-end my-4">
                    <li>
                        <button
                            className="text-stone-800 hover:text-stone-950 hover:underline"
                            onClick={onCancel}>
                            Cancel
                        </button>
                    </li>
                    <li>
                        <button
                            className="bg-stone-800 text-stone-50 py-2 px-6 rounded-md border-2 border-transparent hover:border-stone-950 hover:bg-stone-200 hover:text-stone-950 duration-300"
                            onClick={handleSave}>
                            Save
                        </button>
                    </li>
                </menu>
                <div className="flex flex-col gap-y-4">
                    <Input labelText="Title" inputID="title">
                        <input
                            ref={nameInput}
                            type="text"
                            id="title"
                            className={classes}
                        />
                    </Input>
                    <Input labelText="Description" inputID="description">
                        <textarea
                            ref={descInput}
                            id="description"
                            className={classes}></textarea>
                    </Input>
                    <Input labelText="Due Date" inputID="due-date">
                        <input
                            ref={dateInput}
                            type="date"
                            id="due-date"
                            className={classes}
                        />
                    </Input>
                </div>
            </div>
        </>
    );
}

export default NewProject;
