import { useState, useCallback, useEffect } from 'react';
import { 
    FollowStateProps, 
    FollowState_Config_Props
} from '../../interface';


function useFollowState(initialValue?: string, config?: FollowState_Config_Props): FollowStateProps {

    const [states, setSates] = useState<string[]>(() => {
        if (initialValue) {
            return [initialValue];
        } else {
            return [];
        }
    })

    const addState = useCallback((newState: string) => {
        setSates(pre => [...pre, newState])
    }, [])

    const getCurrrentState = useCallback((): string | undefined => {
        const len = states.length;
        return states[len - 1];
    }, [states])

    const getBeforeState = useCallback((index: number): string | undefined => {
        const len = states.length;
        return states[len - 1 - index];
    }, [states])

    const getAllState = useCallback((): (string | undefined)[] => {
        return states;
    }, [states])

    const isBeforCurrent = useCallback((beforeState: string, currentState: string): boolean => {
        const beforeState_m = getBeforeState(1);
        const currentState_m = getCurrrentState();
        if (beforeState_m===beforeState && currentState_m===currentState) {
            return true;
        }
        return false;
    }, [getBeforeState, getCurrrentState])

    const [followState, setFollowState] = useState<FollowStateProps>(() => {
        return {
            config: config,
            getData: {
                getCurrrentState: getCurrrentState,
                getBeforeState: getBeforeState,
                getAllState: getAllState
            },
            setData: { addState: addState },
            event: { isBeforCurrent: isBeforCurrent }
        }
    })

    useEffect(() => {
        setFollowState(pre => {
            return {
                ...pre,
                config: config
            }
        })
    }, [config])

    useEffect(() => {
        setFollowState(pre => {
            return {
                ...pre,
                getData: {...pre.getData, getCurrrentState: getCurrrentState}
            }
        })
    }, [getCurrrentState]) 

    useEffect(() => {
        setFollowState(pre => {
            return {
                ...pre,
                getData: {...pre.getData, getBeforeState: getBeforeState}
            }
        })
    }, [getBeforeState]) 

    useEffect(() => {
        setFollowState(pre => {
            return {
                ...pre,
                getData: {...pre.getData, getAllState: getAllState}
            }
        })
    }, [getAllState]) 

    useEffect(() => {
        setFollowState(pre => {
            return {
                ...pre,
                setData: {addState: addState}
            }
        })
    }, [addState]) 

    useEffect(() => {
        setFollowState(pre => {
            return {
                ...pre,
                event: { isBeforCurrent: isBeforCurrent }
            }
        })
    }, [isBeforCurrent]) 

    return followState;
}

export default useFollowState;