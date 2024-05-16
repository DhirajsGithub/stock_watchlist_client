import React, { useState } from 'react';

interface ButtonProps {
    text: string | number | boolean,
    onClick?: () => void,
    something?: boolean,
}

interface BookType {
    name: string,
    price: number,
}

const Button: React.FC<ButtonProps> = (props) => {
    const [value, setValue] = useState<BookType>({
        name: "Book 1",
        price: 20,
    });

    const [inputText, setInputText] = useState<string | undefined>('');


    const { text, onClick = () => {
        setValue({
            name: "Book 2",
            price: 30,
        })
    }, something } = props;

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputText(e.target.value);
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        alert(inputText)
    }
    return <div>
        <h3>Name {value.name} Price Rs. {value.price}</h3>

        <button onClick={onClick}>{String(text)}</button>

        <form onSubmit={handleSubmit} action="">
            <input value={inputText} onChange={handleOnChange} type="text" />
            <button type='submit'>Submit</button>
        </form>
    </div>
}

export default Button;