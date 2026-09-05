import { axiosInstance } from "../../../config/axiosInstance";

export const contactApi = async (data) => {
  const res = await axiosInstance.post(
    "contact-submit.php",
    data
  );

  return res.data;
};