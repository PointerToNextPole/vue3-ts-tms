import request from '../../index'
import { IDataType } from '../../types'

export function getPageListData(url: string, queryInfo: any) {
  return request.post<IDataType>({
    url,
    data: queryInfo
  })
}

// url: /users/id
export function deletePageData(url: string) {
  return request.delete<IDataType>({
    url
  })
}

export function createPageData(url: string, newData: any) {
  return request.post<IDataType>({
    url,
    data: newData
  })
}

export function editPageData(url: string, editData: any) {
  return request.patch<IDataType>({
    url,
    data: editData
  })
}
