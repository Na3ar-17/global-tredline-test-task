export interface ILoginDto {
	password: string
	email: string
}
export interface ILoginResponse {
	email: string
	accessToken: string
}
