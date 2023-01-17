import axios from "axios";

export const isAdmin = async () => {
  const token = await getToken();
};
