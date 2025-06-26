export const useRole = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.role || "guest";
};
