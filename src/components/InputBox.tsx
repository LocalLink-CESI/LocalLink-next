type Props = {
    label: string;
    name: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputBox = (props: Props) => {
    return (
        <label>
            {props.label}
            <input type="text" name={props.name} onChange={props.onChange}/>
        </label>

    )
}

export default InputBox;