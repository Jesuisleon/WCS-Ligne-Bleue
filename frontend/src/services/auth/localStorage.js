export default function checkAdmin(userInfos) {
  if (userInfos && userInfos.hasOwnProperty("isAdmin") && userInfos.isAdmin) {
    localStorage.setItem("admin", true);
  }
}

export { checkAdmin };
