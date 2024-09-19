import { Category } from "../models/Category";
import { IPaginatedResponse } from "../models/IPaginatedResponse";
import { ISearchableOptions } from "../models/ISearchableOptions";
import { api } from "./api";

function getAll(options?: ISearchableOptions) {
  return api.get<IPaginatedResponse<Category>>("/tags", {
    params: {
      ...options,
    },
  });
}

export const tagService = {
  getAll,
};
