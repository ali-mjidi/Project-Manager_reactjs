function Input({ children, labelText, inputID }) {
    return (
        <p className="flex flex-col gap-y-2">
            <label htmlFor={inputID} className="md:text-xl">
                {labelText}
            </label>
            {children}
        </p>
    );
}

export default Input;
