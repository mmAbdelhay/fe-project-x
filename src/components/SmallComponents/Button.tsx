class ButtonProps {
    bg: string | undefined;
    text: string | undefined;
}

const Button = (props: ButtonProps): JSX.Element => {

    return (
        <button className={`btn btn-sm btn-outline-${props.bg} float-end mt-3`}>
            {props.text}
        </button>
    );
};

export default Button;
