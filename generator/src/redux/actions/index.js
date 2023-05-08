import utils from "../utils"
export * from './conditions'
export * from './examples'
export * from './mechanism'
export * from './run'
export * from './plots'

export const resetAll = content => {
    return {
        type: utils.action_types.RESET_ALL,
        payload: { }
    }
}
