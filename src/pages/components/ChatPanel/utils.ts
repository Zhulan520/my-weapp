import Taro from "@tarojs/taro";

export async function getUserAvatar(): Promise<Taro.UserInfo> {
  try {
    const res = await Taro.getUserInfo({
      withCredentials: true, // 是否携带凭证
    });

    const resInfo= res.userInfo
    return resInfo;

  } catch (error) {
    console.error('获取用户信息失败', error);
    throw error;
  }
}