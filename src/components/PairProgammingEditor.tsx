// PairEditor.jsx
import React, { useRef, useEffect, useState, Dispatch, SetStateAction } from "react";
import Editor from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import socket from "@/utils/socket";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import debounce from "lodash.debounce"


const PairEditor = ({ code, setCode, language, roomId }:{
  code: string;
  setCode:Dispatch<SetStateAction<string>>,
  language: string,
  roomId:string
}) => {



  const roomIdRef = useRef(roomId)

  useEffect(() => {
    roomIdRef.current = roomId
  }, [roomId])

  const user = useSelector((state: RootState) => state.auth.user)

  const userId = user?.name
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const pairnameRef = useRef("me")
  const [remoteDecorations, setRemoteDecorations] = useState<Record<string,string[]>>({});

  const handleEditorDidMount = (editor:monaco.editor.IStandaloneCodeEditor) => {
    editorRef.current = editor;
    const model = editor.getModel()
    const sendCodeChange = debounce(() => {
      const value = model?.getValue();
      console.log("code chanage ", roomIdRef.current);

      socket.emit("code-change", { roomId: roomIdRef.current, code: value });
    }, 500); // 500ms debounce 

    model?.onDidChangeContent(() => {
      const value = model?.getValue()
      setCode(value);
      sendCodeChange()

    })

    editor.onDidChangeCursorPosition(() => {
      const position = editor.getPosition();
      // console.log("cursor changing........................", position, "position");
      // console.log("cursor changing........................", roomIdRef.current, "roomid");
      // console.log("cursor changing........................", userId, "userId");
      if(position){

        socket.emit("cursor-change", { roomId: roomIdRef.current, userId, position });
      }
    });
  };




  roomIdRef.current = roomId


  const colorMap:Record<string,string> = {
    "akhil": "green",
    "john": "red",
  };

  const addUserStyles = (name:string) => {

    const safeName = name.replace(/[^a-zA-Z0-9_-]/g, "_"); // sanitize

    if (document.getElementById(`style-${safeName}`)) return;
    const color = colorMap[name] || "orange";
    const style = document.createElement("style");
    style.id = `style-${safeName}`;
    style.innerHTML = `
      .remote-cursor-${safeName} {
        border-left: 2px solid ${color};
      }
      .remote-label-${safeName}::after {
        content: "${safeName}";
        color: ${color};
        font-size: 10px;
        margin-left: 4px;
      }
  
    `;
    document.head.appendChild(style);
  };
  

  useEffect(() => {


    // console.log(roomId, "join roomIddd");
    // socket.emit("join-pairProgramming", { roomId,userName:user.name });

    socket.on("code-change", (newCode) => {
      if (editorRef.current && newCode !== editorRef.current.getValue()) {
        const position = editorRef.current.getPosition() || { lineNumber: 1, column: 1 };
        console.log(`code change postion ${position}`);

        editorRef.current.setValue(newCode);
        editorRef.current.setPosition(position); // restore cursor
      }
    });

    socket.on("cursor-change", ({ userId: otherId, position }) => {
      console.log("incooming cursor", otherId,userId);
      
      
      console.log(`userId: ${userId}, otherId: ${otherId}`, position);
      if (!editorRef.current || otherId === userId) return;
      pairnameRef.current = otherId
      console.log("after if case");
      
      //
      // addUserStyles(pairnameRef.current)  

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
              className: `remote-cursor-${otherId}`,
              afterContentClassName: `remote-label-${otherId}`,
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
      if (editorRef.current) {
        Object.values(remoteDecorations).forEach(decorationIds => {
          editorRef.current?.deltaDecorations(decorationIds, []);
        });
      }
    };
  }, []);

  return (
    <div style={{ height: "100%", width: "300%" }}>
      <Editor
        height="300px"
        language={language}
        value={code}
        onMount={handleEditorDidMount}
        theme="vs-dark"
      />

      {/* <style>{`
        .remote-cursor-${userId}{
          border-left: 2px solid green;
        }
        .remote-cursor-${userId}::after {
          content: "John";
          color: green;
          font-size: 10px;
          margin-left: 4px;
        }
  
        .remote-label-${userId} {
          border-left: 2px solid blue;
        }
        .remote-label-${userId}:after {
          content: "Akhil";
          color: blue;
          font-size: 10px;
          margin-left: 4px;
        }
      `}</style> */}
    </div>
  );

};

export default PairEditor;


