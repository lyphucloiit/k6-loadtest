import { sleep, group } from 'k6';
import { Options } from 'k6/options';
import SipherContext from '../context/sipher-context';
import GlobalCache from '../const/global-cache';
import AssertHelper from '../helper/assert-helper';
import { Mission } from '../function/mission';

export let options: Options = {
  vus: 1,
  duration: '10s'
};

export let missionId = "Login_Daily";

export function setup() {
  var jwt = SipherContext.GetJwt();
  Mission.CompleteMission(missionId);
  return jwt;
}

export default (jwt: string) => {
  GlobalCache.JWT = jwt;
  group('claim reward', function () {
    var res = Mission.ClaimRewards(missionId)
    AssertHelper.CheckSuccess(res);
  });
  
  group('get mission', function () {
    var res = Mission.GetMission()
    AssertHelper.CheckSuccess(res);
  });
  
  sleep(1);
};

