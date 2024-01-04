import instance from "@/api/axios/axios.instance";
import { UserRegisterDataDto } from "@/types/dto/user.dto";

const axiosCreateUserURL = "/user/create";
export const axiosCreateUser = async ({
  nickname,
  avatar,
}: UserRegisterDataDto): Promise<any> => {
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
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
