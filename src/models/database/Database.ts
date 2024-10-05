import { Accounts, TopUpRequests, Users } from '.'

class Database {
	public static users: Users = new Users([
		{
			id: 1,
			createDate: new Date('2023-01-01T10:00:00Z'),
			email: 'test@gmail.com',
			password: '123456',
		},
		{
			id: 2,
			createDate: new Date('2023-01-02T10:00:00Z'),
			email: 'test2@gmail.com',
			password: '123456',
		},
		{
			id: 3,
			createDate: new Date('2023-01-03T10:00:00Z'),
			email: 'test3@gmail.com',
			password: 'mypassword',
		},
	])

	public static topUpRequests: TopUpRequests = new TopUpRequests([
		{
			id: 1,
			createDate: new Date('2023-01-10T10:00:00Z'),
			amount: 50,
			accountId: 101,
			userId: 1,
		},
		{
			id: 2,
			createDate: new Date('2023-01-11T10:00:00Z'),
			amount: 100,
			accountId: 102,
			userId: 2,
		},
	])

	public static accounts: Accounts = new Accounts([
		{
			id: 1,
			createDate: new Date('2023-01-01T10:00:00Z'),
			amount: 200,
			tfAccountId: '123',
			userId: 1,
			type: 'FACEBOOK',
		},
		{
			id: 2,
			createDate: new Date('2023-01-01T10:00:00Z'),
			amount: 300,
			tfAccountId: '1234',
			userId: 2,
			type: 'TIKTOK',
		},
		{
			id: 3,
			createDate: new Date('2023-01-01T10:00:00Z'),
			amount: 150,
			tfAccountId: '12345',
			userId: 3,
			type: 'FACEBOOK',
		},
	])
}

export default Database
