import { Params } from 'k6/http';
import http from 'k6/http';
import GlobalConfig from '../const/global-config';
import GlobalCache from '../const/global-cache';

export default class HttpHelper {
    
    static Get(path: string) {
        return http.get(GlobalConfig.BASE_URL + path, HttpHelper.BuildHeader())
    }

    static Post(path: string, request: any) {
        return http.post(GlobalConfig.BASE_URL + path, request, HttpHelper.BuildHeader())
    }

    static BuildHeader(): Params {        
        var params: Params = {
            headers: {
                'x-blueprint-id': GlobalConfig.BLUEPRINT_VERSION,
                'Authorization': "Bearer " + GlobalCache.JWT,
                'Content-Type' : 'application/json'
            }
        };
        return params;
    }
}