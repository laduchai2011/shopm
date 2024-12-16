import { FollowStateProps, FollowState_Config_Props } from 'MyHooks/interface';
type inputProps = {
    initialValue?: string;
    config?: FollowState_Config_Props;
};
declare function useFollowState(input?: inputProps): FollowStateProps;
export default useFollowState;
