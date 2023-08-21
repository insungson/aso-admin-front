import axios from "axios";

/**
 *  맴버 확장 시 보여지는 맴버 정보
 */
export const fetchGetMemberSetting = async (requestPrams) => {
  try {
    const { queryKey } = requestPrams;
    console.log("queryKey: ", queryKey);

    const response = await Promise.resolve({
      myApp: [
        {
          appId: "12",
          appTitle: "instagram",
          country: "US",
          provider: "google",
        },
        { appId: "13", appTitle: "facebook", country: "JP", provider: "apple" },
      ],
      MyCompetitorApp: [
        {
          appId: "12",
          appTitle: "instagram",
          country: "US",
          provider: "google",
        },
        {
          appId: "13",
          appTitle: "facebook",
          country: "US",
          provider: "google",
        },
        {
          appId: "14",
          appTitle: "instagram",
          country: "JP",
          provider: "apple",
        },
        { appId: "15", appTitle: "facebook", country: "JP", provider: "apple" },
      ],
      myKeyword: [
        "photo",
        "instar",
        "korean",
        "shot",
        "keyword",
        "idol",
        "kpop",
        "facebook",
        "sns",
        "snsapp",
        "app",
        "ip",
      ],
    });
    return response;
  } catch (error) {
    return {
      myApp: [],
      MyCompetitorApp: [],
      myKeyword: [],
    };
  }
};
