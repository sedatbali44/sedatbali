import { createApi } from '@reduxjs/toolkit/query/react';

import { axiosBaseQuery } from 'utils/@axiosBaseQuery';
import { HOST_API } from 'config';

export const departmentQuery = createApi({
  reducerPath: 'departmentQuery',
  baseQuery: axiosBaseQuery({
    baseUrl: HOST_API,
  }),
  tagTypes: ['Department'],
  endpoints: (builder) => ({
    departments: builder.query({
      query: () => ({ url: 'departments' }),
      providesTag: ['Department'],
    }),
    department: builder.query({
      query: (id) => ({ url: `posts/${id}` }),
      providesTag: ['Department'],
    }),
    createDepartment: builder.mutation({
      query: (department) => ({
        url: 'departments',
        method: 'POST',
        body: department,
      }),
      invalidatesTags: ['Department'],
    }),
    updateDepartment: builder.mutation({
      query: (id, ...rest) => ({
        url: `departments/${id}`,
        method: 'PUT',
        body: rest,
      }),
      invalidatesTags: ['Department'],
    }),
    deleteDepartment: builder.mutation({
      query: (id) => ({
        url: `department/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Department'],
    }),
  }),
});

export const {
  useDepartmentsQuery,
  useDepartmentQuery,
  useCreateDepartmentMutation,
  useDeleteDepartmentMutation,
  useUpdateDepartmentMutation,
} = departmentQuery;
