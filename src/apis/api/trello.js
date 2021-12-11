import request from '../request'

export const getTrelloList = (params) => {
  return request({
    url: `/lists?_embed=listItems`,
    method: 'get',
    params,
  })
}

export const getTrelloListItem = (id) => {
  return request({
    url: `/listItems/${id}?_embed=comments`,
    method: 'get',
  })
}
