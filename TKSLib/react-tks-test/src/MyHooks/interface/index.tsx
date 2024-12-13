// const stateKeys = ["ACTIVE", "INACTIVE", "PENDING"] as const;
// FollowState
export interface FollowStateProps {
    config?: FollowState_Config_Props,
    getData?: FollowState_GetData_Props,
    setData?: FollowState_SetData_Props,
    event?: FollowState_Event_Props
}
export interface FollowState_Config_Props {
    registerState?: FollowState_Config_RegisterState_Props[]
}  
export interface FollowState_SetData_Props {
    addState?: (newState: string) => void 
    clearStates?: () => void
} 
export interface FollowState_GetData_Props {
    getRegistedStateConst?: <T_states> () => FollowState_CONST_STATE_Props <T_states>,
    getCurrrentState?: () => string | undefined,
    getBeforeState?: (index: number) => string | undefined,
    getAllState?: () => (string | undefined)[]
} 
export interface FollowState_Event_Props {
    isBeforCurrent?: (beforeState: string, currentState: string) => boolean,
}
export interface FollowState_Config_RegisterState_Props {
    descrition?: string,
    state?: string
}  
// export interface FollowState_CONST_STATE_Props {
//     [key: string]: string
// }
// const stateKeys = ["ACTIVE", "INACTIVE", "PENDING"] as const;
// enum Keys {
//     Name = "name",
//     Age = "age",
//     Email = "email"
// }
export type FollowState_CONST_STATE_Props <T_states> = {
    [key in keyof T_states]?: string
}