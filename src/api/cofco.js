import request from "@/utils/request";
import { getToken } from "@/utils/cofco";
import { sortBy } from "lodash";
import qs from "qs";

export function login(username, password) {
  const data = {
    username,
    password
  };
  return request({
    url: "/auth/user/token",
    method: "post",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    data: qs.stringify(data)
  });
}

/**
 * 根据字典项id查找字典子项
 * @param {*} dictItemId 字典项id
 */
export function getDict(dictItemId, isUsed = "Y") {
  return getToken().then(_ => request({
    url: "/sys/dictionary/find",
    method: "post",
    data: {
      filters: {
        "itemId?EQ": dictItemId,
        "dictionarySubs.used?EQ": isUsed
      }
    }
  }).then(res => sortBy(res.data.result.dictionarySubs, "sort"))
  )
}
