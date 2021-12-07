import { useHistory } from "react-router-dom";
import { signout } from "../actions/auth";

// Redux-----
import { useDispatch } from "react-redux";
//-----

function Signout() {
  const history = useHistory();
  const dispatch = useDispatch();
  dispatch(signout());
  window.location.reload();
  history.push("/");
  return <></>;
}

export default Signout;
