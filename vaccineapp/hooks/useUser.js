import { useContext } from "react";
import { MyUserContext } from "../configs/Contexts";

const useUser = () => {
  return useContext(MyUserContext);
};

export default useUser;
