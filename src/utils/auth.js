

const Admin = 'Admin-User'
export function getUser() {
  return window.localStorage.getItem(Admin)
}

export function setUser(user) {

  return window.localStorage.setItem(Admin, user)
}

export function removeUser() {
  return window.localStorage.removeItem(Admin)
}
