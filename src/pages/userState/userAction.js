import { getTransactions, postTransaction, deleteTransaction, loginUser } from "../../helpers/axiosHelper";
import { toast } from "react-toastify";
import { setUser } from "./userSlice";

export const loginAction = (obj) => async (dispatch) => {

    //first call axios pull data from server
    const { status, message, user } = await loginUser(obj);
    toast[status](message);


    if (status === "success") {
        window.sessionStorage.setItem("user", JSON.stringify(user));
        
        //dispatch incoming data to the slice
        dispatch(setUser(user));
    }

};

export const logoutAction = () => async (dispatch) => {
    dispatch(setUser({}));
    window.sessionStorage.removeItem("user");

}

