import { $http } from './index'

/**
 * 同花顺机构预期盈利接口 http://basic.10jqka.com.cn/
 * @param code 证券6位数编码
 */
export const getStockPredict = (code: string) => $http({
  method: "get",
  url: `/10jqka/${code}/worth.html`,
  responseType: "arraybuffer", // 关键步骤
  responseEncoding: "utf8",
})

