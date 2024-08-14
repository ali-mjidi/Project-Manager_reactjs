function Task({ children, onDelete }) {
    return (
        <li className="flex justify-between px-4 border-b-2 py-2">
            {children}
            <button className="hover:underline" onClick={onDelete}>Delete</button>
        </li>
    );
}

export default Task;
