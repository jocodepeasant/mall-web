import request from '@/utils/request'

export function register(username, password, email, code) {
  return request({
    url: '/admin/register',
    method: 'post',
    data: {
      username,
      password,
      email,
      code,
    }
  })
}

export function emailCode(email) {
  return request({
    url: '/admin/emailCode',
    method: 'post',
    data: {
      email
    }
  })
}

