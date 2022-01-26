import { Cell } from "../../redux";
import CodeCell from "../code-editor/code-cell";
import TextEditor from "../text-editor/TextEditor";
import CellActionBar from "./CellActionBar";
import "./cell-list-item.css";

interface CellListItemProps {
  cell: Cell;
}
const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
  let child: JSX.Element;

  child =
    cell.type === "code" ? (
      <>
        <div className="code-cell-wrapper"></div>
        <CodeCell cell={cell} />
        <CellActionBar id={cell.id} />
      </>
    ) : (
      <>
        <TextEditor cell={cell} />
        <CellActionBar id={cell.id} />
      </>
    );

  return <div className="cell-item">{child}</div>;
};

export default CellListItem;
