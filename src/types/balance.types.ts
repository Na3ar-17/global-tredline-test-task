import { AccountEntity } from '@/models/database/Accounts'
import { TopUpEntity } from '@/models/database/TopUpRequests'
import { UserEntity } from '@/models/database/Users'

export interface IBalance
	extends Pick<AccountEntity, 'amount' | 'tfAccountId'>,
		Pick<UserEntity, 'email'> {
	createDate: Date
	id: number
}

export interface IDeleteTopUpRequest {
	deleted: true
}
export interface ICreateTopUpRequest extends Pick<TopUpEntity, 'amount'> {}
export interface ICreateTopUpRequestResponse {
	created: boolean
}
