// PairEditor.jsx
import React, { useRef, useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import socket from "@/utils/socket";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import debounce from "lodash.debounce"


const PairEditor = ({ code, setCode,language, challengeId}) => {
    const roomId=challengeId
    
    const user=useSelector((state:RootState)=>state.auth.user)
    const userId=user._id
  const editorRef = useRef(null);
  const [remoteDecorations, setRemoteDecorations] = useState({});

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
    const model=editor.getModel()
    const sendCodeChange = debounce(() => {
        const value = model.getValue();
        socket.emit("code-change", { roomId, code: value });
      }, 300); // 300ms debounce 

      model.onDidChangeContent(()=>{
        const value=model.getValue()
        setCode(value);
       sendCodeChange()

      })
   
    editor.onDidChangeCursorPosition(() => {
      const position = editor.getPosition();
      console.log("cursor changing........................",position,"position");
      socket.emit("cursor-change", { roomId, userId, position });
    });
  };

  useEffect(() => {
    console.log(challengeId,"challengeID");

    socket.emit("join-pairProgramming",{ roomId,userName:user.name});
    console.log(roomId,"roomID");
    
    socket.on("code-change", (newCode) => {
      if (editorRef.current && newCode !== editorRef.current.getValue()) {
        const position = editorRef.current.getPosition()|| { lineNumber: 1, column: 1 };
        console.log(`code change postion ${position}`);
        
        editorRef.current.setValue(newCode);
        editorRef.current.setPosition(position); // restore cursor
      }
    });

    socket.on("cursor-change", ({userId: otherId, position }) => {
      console.log("incooming cursor",position);
      
      console.log(`userId: ${userId}, otherId: ${otherId}`,position);
      if (!editorRef.current || otherId === userId) return;
      console.log("after if case");
      
      const range = new monaco.Range(
        position.lineNumber,
        position.column,
        position.lineNumber,
        position.column
      );

      const newDecorations = editorRef.current.deltaDecorations(
        remoteDecorations[otherId] || [],
        [
          {
            range,
            options: {
              className: `remote-cursor-${userId}`,
              afterContentClassName: `remote-label-${userId}`,
              stickiness: monaco.editor.TrackedRangeStickiness.NeverGrowsWhenTypingAtEdges,
            },
          },
        ]
      );

      setRemoteDecorations((prev) => ({ ...prev, [otherId]: newDecorations }));
    });

    return () => {
      socket.off("code-change");
      socket.off("cursor-change");
    };
  }, [code]);

  return (
    <div style={{ height: "100%", width: "300%" }}>
      <Editor
        height="300px"
        language={language}
        value={code}
        onMount={handleEditorDidMount}
        theme="vs-dark"
      />
  
      <style>{`
        .remote-cursor-${userId}{
          border-left: 2px solid green;
        }
        .remote-cursor-${userId}::after {
          content: "John";
          color: green;
          font-size: 10px;
          margin-left: 4px;
        }
  
        remote-label-${userId} {
          border-left: 2px solid blue;
        }
        remote-label-${userId}:after {
          content: "Akhil";
          color: blue;
          font-size: 10px;
          margin-left: 4px;
        }
      `}</style>
    </div>
  );
  
};

export default PairEditor;


