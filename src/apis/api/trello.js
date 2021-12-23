import request from '../request'

/* 전체 트랠로 리스트 조회*/
export const getTrelloList = (params) => {
  return request({
    url: `/lists?_embed=tasks`,
    method: 'get',
    params,
  })
}

export const postTrelloList = (data) => {
  return request({
    url: `/lists`,
    method: 'post',
    data,
  })
}

export const putTrelloList = (id, data) => {
  return request({
    url: `/lists/${id}`,
    method: 'put',
    data,
  })
}

export const deleteTrelloList = (id) => {
  return request({
    url: `/lists/${id}`,
    method: 'delete',
  })
}

/* 트랠로 테스크 디테일 리스트 조회*/
export const getTrelloTask = (id) => {
  return request({
    url: `/tasks/${id}?_embed=comments`,
    method: 'get',
  })
}

/* 트랠로 테스크 생성 */
export const postTrelloTask = (data) => {
  return request({
    url: `/tasks`,
    method: 'post',
    data,
  })
}
