import { useQuery } from "@tanstack/react-query";

import { getProjectDataApi } from "../api/ProjectApi";

export const useProjectaApi = () => {


    

    const projectQuery = useQuery({
        queryKey: ["projectdata"],
        queryFn: getProjectDataApi,
    });     

  return {
     
        projectData: projectQuery.data,

        isPending: projectQuery.isPending,

        error: projectQuery.error,

        isError:  projectQuery.isError,
    };
};