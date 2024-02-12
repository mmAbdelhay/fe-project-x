class InputProps {
    type: string | undefined;
    label: string | undefined;
    onInputChange: any;
}

const Input = (props: InputProps): JSX.Element => {

    const changeHandler = (event: any) => {
        props.onInputChange(event.target.value);
    };

    return (
        <div className="form-group mt-3">
            <input
                type={props.type ?? ""}
                className="form-control"
                placeholder={props.label ?? ""}
                onChange={changeHandler}
            />
        </div>
    );
};

export default Input;
