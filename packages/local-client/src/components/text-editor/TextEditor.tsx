import { useEffect, useRef, useState } from "react";
import MDEditor from "@uiw/react-md-editor";

import "./text-editor.css";
import { Cell } from "../../redux";
import useAction from "../../utils/hooks/useAction";

interface TextEditorProps {
  cell: Cell;
}
const TextEditor: React.FC<TextEditorProps> = ({ cell }) => {
  const [isEditing, setIsEditing] = useState(false);
  const previewRef = useRef<HTMLDivElement | null>(null);

  const { updateCell } = useAction();

  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (
        previewRef.current &&
        e.target &&
        previewRef.current.contains(e.target as Node)
      ) {
        return;
      }
      setIsEditing(false);
    };

    document.addEventListener("click", listener, { capture: true });

    return () =>
      document.removeEventListener("click", listener, { capture: true });
  }, []);

  const onChange = (value: string | undefined) => {
    updateCell(cell.id, value ?? "");
  };

  if (isEditing) {
    return (
      <div className="text-editor" ref={previewRef}>
        <MDEditor value={cell.content} onChange={onChange} />
      </div>
    );
  }

  return (
    <div className="text-editor card" onClick={() => setIsEditing(true)}>
      <div>
        <MDEditor.Markdown
          className="card-content"
          source={cell.content || "Click to edit"}
        />
      </div>
    </div>
  );
};

export default TextEditor;
