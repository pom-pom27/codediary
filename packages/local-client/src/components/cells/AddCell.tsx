import useAction from "../../utils/hooks/useAction";
import "./add-cell.css";

interface AddCellProps {
  previousCellId: string | null;
  forceVisible?: boolean;
}

const AddCell: React.FC<AddCellProps> = ({
  previousCellId: nextCellId,
  forceVisible,
}) => {
  const { insertCellAfter } = useAction();
  return (
    <div className={`add-cell ${forceVisible && "force-visible"}`}>
      <button
        className="button is-rounded is-primary is-small"
        onClick={() => insertCellAfter(nextCellId, "code")}
      >
        <span className="icon is-small">
          <i className=" fas fa-plus"></i>
        </span>
        <span>Code</span>
      </button>
      <button
        className="button is-rounded is-primary is-small"
        onClick={() => insertCellAfter(nextCellId, "text")}
      >
        <span className="icon is-small">
          <i className=" fas fa-plus"></i>
        </span>
        <span>Text</span>
      </button>
      <div className="divider"></div>
    </div>
  );
};

export default AddCell;
