import noProjectImage from "./../assets/no-projects.png";
import Button from "./Button";

function NoProjectSelected({ children }) {
    return (
        <div className="w-2/3 pt-24 flex flex-col justify-start items-center ">
            <img
                src={noProjectImage}
                alt="no project selected"
                className="w-16 h-16 object-contain"
            />
            <h2 className="text-2xl font-bold text-stone-500 my-4">
                No Project Selected
            </h2>
            <p className="capitalize text-stone-400 mb-4">
                Select a project or get started with a new project
            </p>
            <p className="mt-8">{children}</p>
        </div>
    );
}

export default NoProjectSelected;
