import Entity from './Entity'

export type UserEntity = {
	id: string
	email: string
	password: string
}

class Users extends Entity<UserEntity> {
	public getByEmail(email: string) {
		return this.data.find(row => row.email === email)
	}
}

export default Users
