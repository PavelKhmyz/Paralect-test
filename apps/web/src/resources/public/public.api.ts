import { useMutation, useQuery } from 'react-query';

import { apiService } from 'services';
import queryClient from 'query-client';
import { DataType } from './public.types';

interface GalleryType {
  count: number;
  pagesCount: number;
  results: any[];
}

export function useGallery() {
  const list = () => apiService.get('/public');

  return useQuery(['gallery'], list);
}

export function usePrivateGallery(id: string) {
  const list = () => apiService.get(`/public/private-gallery/${id}`);

  return useQuery(['gallery'], list);
}

export function useUploadAsset() {
  const uploadAsset = (data: FormData) => apiService.post('public/upload-asset', data);
  return useMutation(uploadAsset, {
    onSuccess: (data) => {
      const oldData = queryClient.getQueryData('gallery') as GalleryType;
      queryClient.setQueryData(['gallery'], { ...oldData, results: [...oldData.results, data] });
    },
  });
}

export function useUpdateAsset() {
  const updateAsset = (data: DataType) => apiService.put('/public/update-asset', data);
  return useMutation(updateAsset, {
    onSuccess: (data) => {
      const updatedData = queryClient.getQueryData('gallery') as GalleryType;
      const index = updatedData.results.findIndex((el) => el.asset === data.asset);
      updatedData.results[index] = data;
      queryClient.setQueryData(['gallery'], updatedData);
    },
  });
}
export function useRemoveAsset() {
  const removeAsset = (url: string) => apiService.delete('/public/remove-asset', url);
  return useMutation(removeAsset, {
    onSuccess: (data) => {
      queryClient.setQueryData(['gallery'], data);
    },
  });
}
