import {Button, Container} from "@mui/material";
import React from "react";
import {Simulate} from "react-dom/test-utils";



export const FileUploader = ({style,label, ...rest}: React.HTMLProps<HTMLInputElement>) => {
    const inputRef = React.useRef<HTMLInputElement>(null)
    return <>
        <input ref={inputRef} {...rest} type={"file"} style={{...style, display: "none"}}/>
        <Button
            variant={"contained"}
            onClick={() => {inputRef.current?.click()}}
            sx={style}
        > {label || "Upload"} </Button>
    </>
}