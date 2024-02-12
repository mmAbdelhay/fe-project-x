import {toast} from "react-toastify";

export const toastService = (type: 'success' | 'error', message: string) => {
    let options = {
        closeOnClick: true,
        pauseOnHover: true,
    }

    switch (type) {
        case "success":
            toast.success(message, options);
            return;
        case "error":
            toast.error(message, options);
            return;
        default:
            console.warn('Unknown toast type:', type);
            return;
    }
}