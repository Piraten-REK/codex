export * from './hooks'

export type Replace <B extends unknown, K extends keyof B, N extends unknown> = Omit<B, K> & { [key in K]: N }
