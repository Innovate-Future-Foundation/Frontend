import { createQueryKeys } from "@lukemorales/query-key-factory";
import { ApiResponse, ProfilePaginatedRequest, Profile } from "@/types";
import { convertToQueryParams } from "@/utils/formatters";
import { profileApis } from "@/services/apiServices";

export const orgTeachers = createQueryKeys("orgTeachers", {
  all: null,

  list: (params: ProfilePaginatedRequest, organisationId: string) => ({
    queryKey: [{ params }],
    queryFn: async () => {
      const response = await profileApis.getOrgTeachers(convertToQueryParams(params), organisationId);
      return response.data as ApiResponse<Profile>;
    }
  })
});
