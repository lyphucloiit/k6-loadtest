export default class StringUtils {
    static IsNullOrEmpty(val?: string): boolean {
        return val == undefined || val == '' || val == null;
    }
}