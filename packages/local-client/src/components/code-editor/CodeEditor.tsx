import Editor, { EditorProps } from "@monaco-editor/react";
import prettier from "prettier";
import parser from "prettier/parser-babel";
import { useRef } from "react";

import "./code-editor.css";

interface CodeEditorProps {
  value: string;
  onChange(value: string | undefined): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ value, onChange }) => {
  const editorRef = useRef<any>(null);

  const handleEditorDidMount: EditorProps["onMount"] = (editor) => {
    editorRef.current = editor;
  };

  const onClickFormat = () => {
    //get the value from editor
    const unformatted = editorRef.current.getValue();

    //format the value
    const formatted = prettier
      .format(unformatted, {
        parser: "babel",
        plugins: [parser],
        useTabs: false,
        singleQuote: true,
        semi: true,
      })
      .replace(/\n$/, "");

    //send back the formated value to the editor
    editorRef.current.setValue(formatted);
  };

  return (
    <div className="editor-wrapper">
      <button
        className="button button-format is-primary is-small"
        onClick={onClickFormat}
      >
        Format
      </button>
      <Editor
        onMount={handleEditorDidMount}
        theme="vs-dark"
        value={value}
        onChange={onChange}
        options={{
          wordWrap: "on",
          tabSize: 2,
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 18,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
        defaultLanguage="javascript"
      />
    </div>
  );
};

export default CodeEditor;
