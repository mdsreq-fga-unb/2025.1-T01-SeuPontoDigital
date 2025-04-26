import {toast, Flip} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Notification = {
    sucess: (message) => {
        toast.success(message, {
            position: "top-center",
            autoClose: 3500,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Flip,
        });
    },  
    error: (message) => {
        toast.error(message, {
            position: "top-center",
            autoClose: 3500,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Flip,
        });
    }
}

export default Notification;