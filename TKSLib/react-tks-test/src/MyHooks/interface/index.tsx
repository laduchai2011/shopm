// FollowState
export interface FollowStateProps {
    config?: FollowState_Config_Props,
    getData?: FollowState_GetData_Props,
    setData?: FollowState_SetData_Props,
    event?: FollowState_Event_Props
}
export interface FollowState_Config_Props {

}  
export interface FollowState_SetData_Props {
    addState?: (newState: string) => void 
} 
export interface FollowState_GetData_Props {
    getCurrrentState?: () =>  string | undefined,
    getBeforeState?: (index: number) => string | undefined,
    getAllState?: () => (string | undefined)[]
} 
export interface FollowState_Event_Props {
    isBeforCurrent?: (beforeState: string, currentState: string) => boolean,
}  