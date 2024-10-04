import Entity from "./Entity";

export type UserEntity = {
    userName: string,
    password: string
}

class Users extends Entity<UserEntity> {
    public getByUserName(userName: string) {
        this.data.find( row => row.userName === userName);
    }
}

export default Users;