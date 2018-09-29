export class CommonUtils {
    static dedupArray<T> (arr: T[], property ?: string): T[] {
        const retArr = [];
        for (const item of arr) {
            const index = property ? retArr.findIndex(e => e[property] === item[property]) : retArr.indexOf(item);
            if (index === -1) {
                retArr.push(item);
            }
        }
        return retArr;
    }

    static normalizeMoney(money: number): number {    
        return Number(money.toFixed(2));
    }
}