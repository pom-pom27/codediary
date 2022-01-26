import useAction from "../../utils/hooks/useAction";
import ActionButton from "./ActionButton";
import "./cell-action-bar.css";
interface CellActionBarProps {
  id: string;
}

const CellActionBar: React.FC<CellActionBarProps> = ({ id }) => {
  const { deleteCell, moveCell } = useAction();

  const moveUp = () => {
    moveCell(id, "up");
  };
  const moveDown = () => {
    moveCell(id, "down");
  };
  const deleteC = () => {
    deleteCell(id);
  };

  return (
    <div className="button-wrapper">
      <ActionButton icon="fa-arrow-up" onClick={moveUp} />
      <ActionButton icon="fa-arrow-down" onClick={moveDown} />
      <ActionButton icon="fa-times" onClick={deleteC} />
    </div>
  );
};

export default CellActionBar;
