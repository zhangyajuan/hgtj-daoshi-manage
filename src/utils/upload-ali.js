//import {getAliOssConfigInfo} from "@/services/my";//获取阿里云oss上传文件配置信息
const OSS = require('ali-oss');

export  function client() {
  try {
// const res = await getAliOssConfigInfo();
// if (res.code === 0) {
//   const data = res.data.data;
//   const client = new OSS({
//     region: data.ali_end_point,
//     accessKeyId: data.ali_key_id,
//     accessKeySecret: data.ali_key_secret,
//     bucket: data.ali_bucket
//   });
//   return client
// }
const client = new OSS({
    region: 'oss-cn-beijing',
    accessKeyId: 'LTAI4Fvh8wBeE7s4o8MFDp8y',
    accessKeySecret: 'iBgBxtUs8adhOJColKEU10bSliMZaF',
    bucket: 'hgbc-daoshi'
  });
  return client
} catch (err) {
console.log(err);
  }
}