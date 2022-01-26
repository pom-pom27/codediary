import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreator } from "../../redux";

const useAction = () => {
  const dispatch = useDispatch();

  return useMemo(() => bindActionCreators(actionCreator, dispatch), [dispatch]);
};

export default useAction;

//usage
// const { updateCell } = useAction();
// updateCell('id','content')
