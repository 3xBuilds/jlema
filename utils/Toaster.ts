import { toast } from 'react-hot-toast'

export const showSuccess = (id?: string, message?: string, ) => {
    toast.success( message || "Success!" , {
        id: id || "success"
    });
}

export const showError = (id?: string, message?: string) => {
    toast.error( message || "Something went wrong!" , {
        id: id || "error"
    });
}