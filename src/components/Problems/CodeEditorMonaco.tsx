

import React, { SetStateAction } from "react";
import Editor from "@monaco-editor/react";
import { Dispatch } from "react"; 
const CodeEditorMonaco= ({code,language,setCode}:{code:string,language:string,setCode:Dispatch<SetStateAction<string>>}) => {

  return (
    <Editor
      height="300px"
      language={language}
      value={code}
      theme="vs-dark"
      onChange={(value) => setCode(value!)}
    />
  );
};

export default CodeEditorMonaco