import { get, post } from './request'

// 个股分时
// https://quotes.sina.cn/cn/api/openapi.php/CN_MinlineService.getMinlineData?symbol=sh600006
export function getStockMinLineData(id : string){
  return get(
    '/api/stockanalysor/xinlang/CN_MinlineService.getMinlineData',
    { symbol: id }
  )
}

// 个股数据（有校验，不好巴拉）
// https://hq.sinajs.cn/?_=0.6006661046796655&list=sh600006
// var hq_str_sh600006="东风汽车,6.420,6.410,6.420,6.560,6.400,6.420,6.430,26703072,173075020.000,94600,6.420,557600,6.410,413700,6.400,848300,6.390,306300,6.380,128600,6.430,324599,6.440,166500,6.450,79800,6.460,9200,6.470,2022-09-08,15:00:03,00,";

// 个股数据
// http://qt.gtimg.cn/q=sh600006
export function getStockInfo(id : string){
  return get(
    `/api/stockanalysor/xinlang/stockinfo/q=${id}`
  )
}

