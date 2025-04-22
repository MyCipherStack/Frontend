

import React from "react";
import Editor from "@monaco-editor/react";

const CodeEditorMonaco= ({code,language,setCode}) => {
  
  return (
    <Editor
      height="300px"
      language={language}
      value={code}
      theme="vs-dark"
      onChange={(value) => setCode(value)}
    />
  );
};

export default CodeEditorMonaco