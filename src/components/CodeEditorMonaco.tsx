

import React from "react";
import Editor from "@monaco-editor/react";

const CodeEditorMonaco= () => {
  return (
    <Editor
      height="300px"
      defaultLanguage="javascript"
      defaultValue="// Start coding here"
      theme="vs-dark"
      onChange={(value) => console.log(value)}
    />
  );
};

export default CodeEditorMonaco