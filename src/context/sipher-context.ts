import GlobalCache from '../const/global-cache';
import HttpHelper from '../helper/http-helper';
import StringUtils from '../utils/string-utils';

export default class SipherContext {
    static GetJwt(token?: string): string {
        var request = {
            "loginType": 0,
            "loginToken": StringUtils.IsNullOrEmpty(token) ? "fake-token" : token
        }
        var result = HttpHelper.Post("/api/auth/login", JSON.stringify(request));
        let obj = result.json();
        GlobalCache.JWT = obj!.data[2].accessToken;

        console.log("JWT : " + GlobalCache.JWT);
        return GlobalCache.JWT;
    }
}