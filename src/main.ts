import * as https from "https";
import md5 = require("md5");
import { appSecret, appId } from "./private";
import * as querystring from "querystring";

type ErrorMap = {
  [key: string]: string;
};

const errorMap: ErrorMap = {
  52003: "未授权用户",
  54001: "签名错误",
  54004: "账户余额不足"
};

export const translate = (word: string) => {
  // console.log("word: ", word);
  const salt = Math.random();
  const sign = md5(appId + word + salt + appSecret);
  // console.log("sign: ", sign);

  let from: string, to: string;

  if (/[a-zA-Z]/.test(word[0])) {
    from = "en";
    to = "zh";
  } else {
    from = "zh";
    to = "en";
  }

  const query: string = querystring.stringify({
    q: word,
    appid: appId,
    salt,
    sign,
    from,
    to
  });
  // console.log("query: ", query);

  const options = {
    hostname: "api.fanyi.baidu.com",
    port: 443,
    path: "/api/trans/vip/translate?" + query,
    method: "GET"
  };
  // console.log("options: ", options);

  const request = https.request(options, response => {
    let chunks: Buffer[] = [];
    response.on("data", chunk => {
      chunks.push(chunk);
    });
    response.on("end", () => {
      const string = Buffer.concat(chunks).toString();

      type BaiduRequest = {
        error_code?: string;
        error_msg?: string;
        from: string;
        to: string;
        trans_result: {
          src: string;
          dst: string;
        }[];
      };

      const object: BaiduRequest = JSON.parse(string);
      // console.log("object: ", object);
      if (object.error_code) {
        console.error(errorMap[object.error_code] || object.error_msg);
        process.exit(2);
      } else {
        object.trans_result.map(obj => {
          console.log(obj.dst);
        });
        process.exit(0);
      }
    });
  });
  request.on("error", e => {
    console.error(e);
  });
  request.end();
};
