import { AccountEntity } from '@/models/database/Accounts'
import { UserEntity } from '@/models/database/Users'

export interface IBalance
	extends Pick<AccountEntity, 'amount' | 'tfAccountId'>,
		Pick<UserEntity, 'email'> {
	createDate: string
}
