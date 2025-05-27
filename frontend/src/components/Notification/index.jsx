import { toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Notification.css"

const Notification = {
    success: (message) => {
        toast.success(message, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Zoom,
        });
    },
    error: (message) => {
        toast.error(message, {
            position: "top-center",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Zoom,
        });
    },
    info: (message) => {
        toast.info(message, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Zoom,
        });
    }
}

export default Notification;