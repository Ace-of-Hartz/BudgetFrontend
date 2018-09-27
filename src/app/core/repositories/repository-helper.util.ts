export class Controllers {
    static readonly paycheckController: string = "/api/paychecks/";
    static readonly accountController: string = "/api/accounts/";
}

export class RepositoryHelper {
    static buildUrl(controller: string, action: string, queryParams: { key: string, value: string }[] = []): string {
        const controllerAction = controller
            .concat(action)
            .split('/')
            .filter(s => s)
            .join('/');
        const queryStrings: string[] = [];
        for (const queryParam of queryParams) {
            queryStrings.push(`${queryParam.key}=${queryParam.value}`);
        }
        return controllerAction.concat(queryStrings.join('&'));
    }
}