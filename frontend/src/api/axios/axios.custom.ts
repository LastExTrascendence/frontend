import axios from "axios";
import instance from "@/api/axios/axios.instance";
import { RegistrationDataDto } from "@/types/dto/user.dto";

const axiosCreateUserURL = "/user/create";
export const axiosCreateUser = async ({
  nickname,
  avatar,
  bio,
}: RegistrationDataDto): Promise<any> => {
  //   const formData = new FormData();
  //   formData.append("nickname", nickname);
  //   formData.append("image", image);
  //   formData.append("bio", bio);
  //   const response = await instance.post(axiosCreateUserURL, formData);
  //   return response.data;
  try {
    const response = await instance.post(axiosCreateUserURL, {
      nickname,
      avatar,
      bio,
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
