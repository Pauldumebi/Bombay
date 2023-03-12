import axios from "axios";
import urls from "./urls";

export interface GameReqParams {
    category?: string;
    createdAt?: string;
    startDate?: string;
    endDate?: string;
}

export const cleanedParams = <T>(queryParams: T) => {
    const params: any = {};
    if (queryParams) {
        const keys = Object.keys(queryParams) as Array<keyof T>;
        keys.forEach(key => {
            if (!(queryParams[key] === undefined || queryParams[key] === "")) {
                params[key] = queryParams[key];
            }
        });
    }
    return params;
};

export const getGames = (params?: GameReqParams) => {
    return axios({
        method: "get",
        url: urls.fetchGamesUrl,
        params: cleanedParams(params),
    });
};
