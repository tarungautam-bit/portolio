import { useQuery } from "@tanstack/react-query";
import { getHomeDataApi } from "../api/HomeApi";
import { getProjectDataApi } from "../../missions/api/ProjectApi";

export const useHomeApi = () => {
    const homeQuery = useQuery({
            queryKey: ["homedata"],
            queryFn: getHomeDataApi,
    });

    

    const projectQuery = useQuery({
        queryKey: ["projectdata"],
        queryFn: getProjectDataApi,
    });     

  return {
        homeData: homeQuery.data,
        projectData: projectQuery.data,

        isPending: homeQuery.isPending || projectQuery.isPending,

        error: homeQuery.error || projectQuery.error,

        isError: homeQuery.isError || projectQuery.isError,
    };
};