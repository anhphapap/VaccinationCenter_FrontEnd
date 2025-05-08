import { useContext } from "react";
import { MyUserContext } from "../contexts/Contexts";

const useUser = () => {
  return useContext(MyUserContext);
};

export default useUser;
