import { LoginInterface } from "./Login.interface"

export interface LoginHttpResInterface {
    total_count: number
    incomplete_results: boolean
    items: LoginInterface[]
}