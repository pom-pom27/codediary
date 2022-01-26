import { useEffect } from "react";
import { Cell } from "../../redux";
import useAction from "../../utils/hooks/useAction";

import Resizable from "../Resizable";
import CodeEditor from "./CodeEditor";
import "./code-cell.css";
import useTypedSelector from "../../utils/hooks/useTypedSelector";
import Preview from "./Preview";
import { useCumulativeCoder } from "../../utils/hooks/useCumulativeCode";

interface CodecellProps {
  cell: Cell;
}

const Codecell: React.FC<CodecellProps> = ({ cell }) => {
  const bundle = useTypedSelector((state) => state.bundles[cell.id]);

  const cumulativeCode = useCumulativeCoder(cell.id);

  const { updateCell, startBundling } = useAction();

  useEffect(() => {
    if (!bundle) {
      startBundling(cell.id, cumulativeCode);
    }
    const debounce = setTimeout(async () => {
      startBundling(cell.id, cumulativeCode);
    }, 1000);
    return () => {
      clearTimeout(debounce);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cumulativeCode, cell.id, startBundling]);

  const onChange = (value: string) => {
    updateCell(cell.id, value);
  };

  return (
    <Resizable direction="vertical">
      <div className="code-wrapper">
        <Resizable direction="horizontal">
          <CodeEditor onChange={onChange} value={cell.content} />
        </Resizable>
        <div className="progress-cover">
          {!bundle || bundle.loading ? (
            <div className="loading-wrapper">
              <progress
                className="progress is-small is-primary"
                max={100}
              ></progress>
            </div>
          ) : (
            <Preview code={bundle.code} err={bundle.error} />
          )}
        </div>
      </div>
    </Resizable>
  );
};

export default Codecell;
