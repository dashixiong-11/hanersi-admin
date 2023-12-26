import request from '@/utils/request'

export function getFingerprintList(query={}) {
  return request({
    url: '/gpt2api/admin/fingerprint/list',
    method: 'post',
    data: query
  })
}



export function getStatus(query={}) {
  return request({
    url: '/miniprogram/public/statuses',
    method: 'post',
    data: query
  })
}


export function getFingerprint(query={}) {
  return request({
    url: '/gpt2api/admin/fingerprint',
    method: 'post',
    data: query
  })
}
export function delFingerprint(query={}) {
  return request({
    url: '/gpt2api/admin/fingerprint/delete',
    method: 'post',
    data: query
  })
}