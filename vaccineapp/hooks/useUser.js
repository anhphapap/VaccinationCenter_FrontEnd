import { useContext } from "react";
import { MyUserContext } from "../components/contexts/Contexts";

const useUser = () => {
  return useContext(MyUserContext);
};

export default useUser;
