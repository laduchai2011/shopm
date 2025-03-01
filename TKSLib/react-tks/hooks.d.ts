interface FollowStateProps {
    config?: FollowState_Config_Props;
    getData?: FollowState_GetData_Props;
    setData?: FollowState_SetData_Props;
    event?: FollowState_Event_Props;
}
interface FollowState_Config_Props {
    registerState?: FollowState_Config_RegisterState_Props[];
}
interface FollowState_SetData_Props {
    addState?: (newState: string) => void;
    clearStates?: () => void;
}
interface FollowState_GetData_Props {
    getRegistedStateConst?: <T_states>() => FollowState_CONST_STATE_Props<T_states>;
    getCurrrentState?: () => string | undefined;
    getBeforeState?: (index: number) => string | undefined;
    getAllState?: () => (string | undefined)[];
}
interface FollowState_Event_Props {
    isBeforCurrent?: (beforeState: string, currentState: string) => boolean;
}
interface FollowState_Config_RegisterState_Props {
    descrition?: string;
    state?: string;
}
type FollowState_CONST_STATE_Props<T_states> = {
    [key in keyof T_states]?: string;
};

type inputProps = {
    initialValue?: string;
    config?: FollowState_Config_Props;
};
declare function useFollowState(input?: inputProps): FollowStateProps;

export { useFollowState as FollowState };
