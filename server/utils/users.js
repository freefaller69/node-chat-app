[{
  id: '',
  name: '',
  room: ''
}]


class Users {
  constructor() {
    this.users = [];
  }
  // Add user
  addUser(id, name, room) {
    let user = {id, name, room};
    this.users.push(user);
    return user;
  }
  // Remove user
  removeUser(id) {
    let user = this.getUser(id);
    if(user) {
      this.users = this.users.filter((user) => user.id != id);
    }

    return user;
  }
  // getUser
  getUser(id) {
    return this.users.filter((user) => user.id === id)[0];
  }
  // Get user list
  getUserList(room) {
    let users = this.users.filter((user) => user.room === room);
    let namesArray = users.map((user) => user.name);

    return namesArray;
  }
}

module.exports = {Users};