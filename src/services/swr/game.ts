import { GameReqParams, getGames } from "services/axios/game";
import { AxiosError } from "axios";
import urls from "services/axios/urls";
import { KeyedMutator } from "swr";
import useSWR from "swr";

export type DataType = {
    games: Game[];
    total: number;
};

export const reformData = (data: DataType): Game[] =>
    data?.games?.map((d: Game) => ({ ...d })) || [];

type Game = {
    _id: string;
    name: string;
    category: string;
    createdAt: Date;
};

export type SwrFetchReturnType = {
    data: {
        games: Game[];
        total: number;
    };
    isGenerating: boolean;
    isError: AxiosError;
    mutate: KeyedMutator<any>;
};

export const useFetchGames = (params?: GameReqParams): SwrFetchReturnType => {
    const fetcher = async () => {
        const response = await getGames(params);
        return response?.data.data;
    };
    const { data, error, isLoading, mutate } = useSWR(urls.fetchGamesUrl, fetcher);
    return {
        data,
        isGenerating: isLoading,
        isError: error,
        mutate,
    };
};
