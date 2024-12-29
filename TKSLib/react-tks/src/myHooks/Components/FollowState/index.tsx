import { useState, useCallback, useEffect, useMemo } from 'react';
import { 
    FollowStateProps, 
    FollowState_Config_Props,
    FollowState_CONST_STATE_Props,
    FollowState_Config_RegisterState_Props
} from 'src/myHooks/interface';

type inputProps = {
    initialValue?: string,
    config?: FollowState_Config_Props
}

function useFollowState (input?: inputProps): FollowStateProps {
    const initialValue: string | undefined = input?.initialValue;
    const config: FollowState_Config_Props | undefined = input?.config;
    const registerState: FollowState_Config_RegisterState_Props[] | undefined = config?.registerState;
    // const registerStates_: string[] = [];

    const countOccurrences = (arr: (FollowState_Config_RegisterState_Props | string)[], value: string): number => {
        return arr.reduce((count, currentValue) => {
            return currentValue === value ? count + 1 : count;
        }, 0);
    };

    const getRegisterState_ = (registerState_: FollowState_Config_RegisterState_Props[]) => {
        const registerStates__: string[] = []
        for (let i: number = 0; i < registerState_.length; i++) {
            const state_i: string | undefined = registerState_[i].state;
            if (state_i) {
                registerStates__.push(state_i)
            }
        }
        return registerStates__;
    }

    const registerStates_ = useMemo(() => {
        if (registerState) {
            return getRegisterState_(registerState)
        } else {
            return [];
        }
    }, [registerState]);

    if (registerState) {
        for (let i: number = 0; i < registerStates_.length; i++) {
            const valueToCount: string = registerStates_[i];
            const counter = countOccurrences(registerStates_, valueToCount)
            if (counter > 1) {
                console.warn({
                    message: `Having states that is more one (${counter})`,
                    state: valueToCount,
                    all_states: registerStates_
                })
                break;
            }
        }
    } else {
        console.warn({
            message: 'You need to registe states that will used in this config!',
            config: config
        })
    }

    const [states, setSates] = useState<string[]>(() => {
        if (initialValue && registerState) {
            const valueToCount: string = initialValue;
            const counter = countOccurrences(registerState, valueToCount)
            if (counter===1) {
                return [initialValue];
            } else {
                console.warn({
                    message: 'This state is NOT in states that registed ',
                    config: config,
                    state: initialValue
                })
            }
            return [initialValue];
        } else {
            return [];
        }
    })
    const [newState, setNewState] = useState<string | undefined>(undefined);
    
    const keys = [...registerStates_] as const;
    type T_states = {
        [key in typeof keys[number]]: string; 
    };
    
    const getRegistedStateConst = useCallback((): FollowState_CONST_STATE_Props<T_states> => {
        
        const CONST: FollowState_CONST_STATE_Props<T_states> = {
            
        };
        if (registerState) {    
            for (let i: number = 0; i < registerState.length; i++) {  
                const state: string | undefined = registerState[i]?.state;
                if (state) {
                    CONST[state] = state;
                }
            }
        }
        
        return CONST;
    }, [registerState])

    const addState = useCallback((newState: string) => {
        setNewState(newState)
    }, [])
    useEffect(() => {
        if (registerState && newState) {
            // const registerStates_: string[] = getRegisterState_(registerState);
            const valueToCount: string = newState;
            const counter = countOccurrences(registerStates_, valueToCount)
            if (counter===1) {
                setSates(pre => [...pre, newState])
            } else {
                console.warn({
                    message: 'This state is NOT in states that registed ',
                    config: config,
                    method: 'addState'
                })
            }
            setNewState(undefined);
        } 
    }, [newState, config, registerStates_, registerState])

    const clearStates = useCallback(() => {
        setSates([]);
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
                getRegistedStateConst: getRegistedStateConst,
                getCurrrentState: getCurrrentState,
                getBeforeState: getBeforeState,
                getAllState: getAllState
            },
            setData: { 
                addState: addState,
                clearStates: clearStates 
            },
            event: { isBeforCurrent: isBeforCurrent }
        }
    })

    // useEffect(() => {
    //     setFollowState(pre => {
    //         return {
    //             ...pre,
    //             config: config
    //         }
    //     })
    // }, [])

    useEffect(() => {
        setFollowState(pre => {
            return {
                ...pre,
                setData: {
                    ...pre.setData,
                    addState: addState
                }
            }
        })
    }, [addState]) 

    useEffect(() => {
        setFollowState(pre => {
            return {
                ...pre,
                setData: {
                    ...pre.setData,
                    clearStates: clearStates
                }
            }
        })
    }, [clearStates]) 

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
                event: { isBeforCurrent: isBeforCurrent }
            }
        })
    }, [isBeforCurrent]) 

    return followState;
}

export default useFollowState;