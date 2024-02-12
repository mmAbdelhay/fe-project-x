export const checkIfLoggedIn = () => {
    return !!sessionStorage.getItem("token");
};