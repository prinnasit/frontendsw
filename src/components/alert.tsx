import Swal from "sweetalert2";

export const sweetAlert = (
    title: string,
    message: string,
    icon: "success" | "error" | "warning" | "info" | "question" = "success"
) => {
    Swal.fire({
        title: title,
        text: message,
        icon: icon,
        confirmButtonText: '👍 OK!',
    });
};

export const footerAlert = (
    title: string,
    message: string,
    icon: "success" | "error" | "warning" | "info" | "question" = "success",
    footer: string,
) => {
    Swal.fire({
        title: title,
        text: message,
        icon: icon,
        footer: footer,
        confirmButtonText: '👍 OK!'
    })
}

export const confirmAlert = (
    title: string,
    message: string,
    icon: "success" | "error" | "warning" | "info" | "question" = "success",
    confirmFunction: () => {}
) => {
    Swal.fire({
        title: title,
        text: message,
        icon: icon,
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Confirm",
        cancelButtonText: "No, Cancel",
        preConfirm: confirmFunction
    });
}