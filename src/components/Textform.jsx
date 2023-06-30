import React, { useState, useEffect } from "react";

export default function Textform(props) {

    const [text, setText] = useState("");
    const [textHistory, setTextHistory] = useState([]);

    useEffect(() => {
        setTextHistory((prevHistory) => [...prevHistory, text]);
    }, [text]);

    const handleUpperCase = () => {
        console.log("UpperCase Called");
        let newstr = text.toUpperCase();
        setText(newstr)

    };
    const handleLowerCase = () => {
        console.log("LowerCase Called");
        let newstr = text.toLowerCase();
        setText(newstr)
    };

    const handleSpace = () => {
        let newstr = text;
        // newstr=text.replace(/\s+/g, ' ')
        newstr = text.replace(/ {1,}/g, ' ');
        setText(newstr);
    }
    const handleClearText = () => {
        let newstr = ""
        setText(newstr)
    }
    const extractEmails = () => {
        let emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
        let emails = text.match(emailRegex);
        return emails || [];
    }

    // const handleRemoveNumber = () => {
    //     let newstr = text;
    //     newstr = text.replace(/[0-9]/g, '')
    //     setText(newstr)
    // }
    const handleRemoveNumber = () => {
        let emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
        let emails = text.match(emailRegex) || [];
        let textWithoutEmails = text.replace(emailRegex, ''); // Remove email addresses from the text

        let numberRegex = /[0-9]/g; // Regular expression pattern to match any digit
        let newText = textWithoutEmails.replace(numberRegex, ''); // Replace digits with an empty string

        const finalText = newText + emails.join(' '); // Combine the modified text without numbers and the preserved emails
        setText(finalText); // Update the state with the modified text
    };

    const handleUndo = () => {
        if (textHistory.length > 0) {
            const previousText = textHistory[textHistory.length - 1];
            setText(previousText);
            setTextHistory((prevHistory) => prevHistory.slice(0, -1));
        }
        else if (textHistory.length === 1) {
            setText(textHistory[0]);
            setTextHistory([]);
        }
        else {
            setText("");
            setTextHistory([]);
        }
    };

    const handleOnChange = (event) => {
        setText(event.target.value)
    };

    return (
        <>
            {/* <h3 className="container d-flex justify-content-cente">{props.string}</h3> */}
            <h3 className="container d-flex justify-content-cente">ENTER YOUR TEXT TO ANALYZE   </h3>
            <div className="container">
                <form>
                    <div className="form-group mb-1">
                        <textarea
                            placeholder="Enter your text here"
                            className="form-control"
                            id="exampleFormControlTextarea1"
                            rows="4"
                            value={text}
                            onChange={handleOnChange}
                        ></textarea>
                    </div>
                </form>
                <div className="all_buttons">
                    <div>
                        <button className="btn btn-danger mx-1" onClick={handleUpperCase}>Convert to UpperCase</button>
                        <button className="btn btn-success mx-1" onClick={handleLowerCase}>Convert to LowerCase</button>
                        <button className="btn btn-primary  mx-1 cleartext" onClick={handleClearText}>Clear All Text</button>
                    </div>
                    <div className="mt-1">
                        <button className="btn btn-yellow mx-1" onClick={handleRemoveNumber}>Remove All Numbers2</button>
                        <button className="btn btn-violet mx-1" onClick={handleSpace}>Remove Extra Spacing</button>
                        <button className="btn btn-blue mx-1" onClick={handleUndo}>Undo Changes</button>
                    </div>
                </div>
                <div className="container mt-3 summary ">
                    <h2><> The Summary Of Your Text :</></h2>
                    <p><u>Number of Characters</u> : {text.length}</p>
                    <p><u>Number of Words</u> : {(text.split(" ").length) - 1}</p>
                    <p><u>Number of Sentences</u>  : {(text.split(".").length) - 1}</p>

                    {/* <p>Extracted Email : {extractEmails().join(", ")} </p> */}

                    {extractEmails().length > 0 ? (
                        <>
                            <p><u>Number of Email</u> : {extractEmails().length}</p>
                            <p className="d-flex">Extracted Email:  <i className="email">{"" + extractEmails().join(" , ")}</i></p>
                        </>
                    ) : (
                        <>
                            <p><u>Number of Email</u>: 0</p>
                            <p ><u>Extracted Email</u>: <i>None</i></p>
                        </>
                    )
                    }
                </div>

                <div className="container previewtext ">
                    <h3>PREVIEW TEXT:</h3>
                    {text.length > 0 ? (<p className="previewtext">" {text} "</p>) : (<p className="previewtext">{text}</p>)}
                </div>
            </div>
        </>
    );
}

