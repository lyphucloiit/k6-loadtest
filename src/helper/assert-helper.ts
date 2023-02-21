import { check } from 'k6';
import { RefinedResponse, ResponseType } from 'k6/http';

export default class AssertHelper {
    static CheckSuccess<RT extends ResponseType | undefined>(res: RefinedResponse<RT>): boolean {
        check(res, {
            'status is 200': () => res.status === 200,
            'request is success': () => res.json()?.toString() === "{}" ? true : res.json().data[1] === 0
        });

        console.log(res.json())

        return true;
    }
}