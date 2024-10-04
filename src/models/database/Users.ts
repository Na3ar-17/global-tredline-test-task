import Entity from './Entity'

export type UserEntity = {
	email: string
	password: string
}

class Users extends Entity<UserEntity> {
	public getByUserName(email: string) {
		this.data.find(row => row.email === email)
	}
}

export default Users
