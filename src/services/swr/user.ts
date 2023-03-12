import { UserReqParams, getUsers, getGamesCategory } from "../axios/user";
import { AxiosError } from "axios";
import urls from "services/axios/urls";
import { KeyedMutator } from "swr";
import useSWR from "swr";

export type DataType = {
    users: User[];
    total: number;
};

export const reformData = (data: DataType): User[] =>
    data?.users?.map((d: User) => ({ ...d })) || [];

type User = {
    _id: string;
    email: string;
    firstname: string;
    lastname: string;
    address: string;
};

export type SwrCommonResp = {
    isGenerating: boolean;
    isError: AxiosError;
    mutate: KeyedMutator<any>;
};

export type SwrFetchReturnType = SwrCommonResp & {
    data: {
        users: User[];
        total: number;
    };
};

export type SwrFetchReturnTypeGame = SwrCommonResp & {
    data: string[];
};

export const useFetchUsers = (params?: UserReqParams): SwrFetchReturnType => {
    const fetcher = async () => {
        const response = await getUsers();
        return response?.data.data;
    };
    const { data, error, isLoading, mutate } = useSWR(urls.fetchUsersUrl, fetcher);
    return {
        data,
        isGenerating: isLoading,
        isError: error,
        mutate,
    };
};

export const useFetchCategories = (): SwrFetchReturnTypeGame => {
    const fetcher = async () => {
        const response = await getGamesCategory();
        return response?.data.data;
    };
    const { data, error, isLoading, mutate } = useSWR(urls.fetchGameCategories, fetcher);
    return {
        data,
        isGenerating: isLoading,
        isError: error,
        mutate,
    };
};
