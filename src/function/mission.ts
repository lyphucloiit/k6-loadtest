import HttpHelper from "../helper/http-helper";
import { IBaseFunction } from "./base-function";
import { RefinedResponse } from "k6/http";
import StringUtils from "../utils/string-utils";
import Url from "../const/urls";

export class Mission implements IBaseFunction {

    Init(): void {

    }

    static GetMission(): RefinedResponse<'text'> {
        return HttpHelper.Get(Url.GetMission);
    }

    static ClaimRewards(missionId: string): RefinedResponse<'text'> {
        var request = {
            "missionIds": [missionId]
        };

        return HttpHelper.Post(Url.ClaimRewards, JSON.stringify(request));
    }

    static CompleteMission(missionId?: string): RefinedResponse<'text'> {
        var request = {
            "missionIds": StringUtils.IsNullOrEmpty(missionId) ? [] : [missionId]
        };

        return HttpHelper.Post(Url.CompleteMission, JSON.stringify(request));
    }

    static ReRoll(missionId: string): RefinedResponse<'text'> {
        var request = {
            "missionId": missionId
        };

        return HttpHelper.Post(Url.ReRoll, JSON.stringify(request));
    }

    TearDown(): void {

    }

}