import { useState, useCallback, useEffect, useMemo } from 'react';
function useFollowState(input) {
    const initialValue = input === null || input === void 0 ? void 0 : input.initialValue;
    const config = input === null || input === void 0 ? void 0 : input.config;
    const registerState = config === null || config === void 0 ? void 0 : config.registerState;
    // const registerStates_: string[] = [];
    const countOccurrences = (arr, value) => {
        return arr.reduce((count, currentValue) => {
            return currentValue === value ? count + 1 : count;
        }, 0);
    };
    const getRegisterState_ = (registerState_) => {
        const registerStates__ = [];
        for (let i = 0; i < registerState_.length; i++) {
            const state_i = registerState_[i].state;
            if (state_i) {
                registerStates__.push(state_i);
            }
        }
        return registerStates__;
    };
    const registerStates_ = useMemo(() => {
        if (registerState) {
            return getRegisterState_(registerState);
        }
        else {
            return [];
        }
    }, [registerState]);
    if (registerState) {
        for (let i = 0; i < registerStates_.length; i++) {
            const valueToCount = registerStates_[i];
            const counter = countOccurrences(registerStates_, valueToCount);
            if (counter > 1) {
                console.warn({
                    message: `Having states that is more one (${counter})`,
                    state: valueToCount,
                    all_states: registerStates_
                });
                break;
            }
        }
    }
    else {
        console.warn({
            message: 'You need to registe states that will used in this config!',
            config: config
        });
    }
    const [states, setSates] = useState(() => {
        if (initialValue && registerState) {
            const valueToCount = initialValue;
            const counter = countOccurrences(registerState, valueToCount);
            if (counter === 1) {
                return [initialValue];
            }
            else {
                console.warn({
                    message: 'This state is NOT in states that registed ',
                    config: config,
                    state: initialValue
                });
            }
            return [initialValue];
        }
        else {
            return [];
        }
    });
    const [newState, setNewState] = useState(undefined);
    const keys = [...registerStates_];
    const getRegistedStateConst = useCallback(() => {
        var _a;
        const CONST = {};
        if (registerState) {
            for (let i = 0; i < registerState.length; i++) {
                const state = (_a = registerState[i]) === null || _a === void 0 ? void 0 : _a.state;
                if (state) {
                    CONST[state] = state;
                }
            }
        }
        return CONST;
    }, [registerState]);
    const addState = useCallback((newState) => {
        setNewState(newState);
    }, []);
    useEffect(() => {
        if (registerState && newState) {
            // const registerStates_: string[] = getRegisterState_(registerState);
            const valueToCount = newState;
            const counter = countOccurrences(registerStates_, valueToCount);
            if (counter === 1) {
                setSates(pre => [...pre, newState]);
            }
            else {
                console.warn({
                    message: 'This state is NOT in states that registed ',
                    config: config,
                    method: 'addState'
                });
            }
            setNewState(undefined);
        }
    }, [newState, config, registerStates_, registerState]);
    const clearStates = useCallback(() => {
        setSates([]);
    }, []);
    const getCurrrentState = useCallback(() => {
        const len = states.length;
        return states[len - 1];
    }, [states]);
    const getBeforeState = useCallback((index) => {
        const len = states.length;
        return states[len - 1 - index];
    }, [states]);
    const getAllState = useCallback(() => {
        return states;
    }, [states]);
    const isBeforCurrent = useCallback((beforeState, currentState) => {
        const beforeState_m = getBeforeState(1);
        const currentState_m = getCurrrentState();
        if (beforeState_m === beforeState && currentState_m === currentState) {
            return true;
        }
        return false;
    }, [getBeforeState, getCurrrentState]);
    const [followState, setFollowState] = useState(() => {
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
        };
    });
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
            return Object.assign(Object.assign({}, pre), { setData: Object.assign(Object.assign({}, pre.setData), { addState: addState }) });
        });
    }, [addState]);
    useEffect(() => {
        setFollowState(pre => {
            return Object.assign(Object.assign({}, pre), { setData: Object.assign(Object.assign({}, pre.setData), { clearStates: clearStates }) });
        });
    }, [clearStates]);
    useEffect(() => {
        setFollowState(pre => {
            return Object.assign(Object.assign({}, pre), { getData: Object.assign(Object.assign({}, pre.getData), { getCurrrentState: getCurrrentState }) });
        });
    }, [getCurrrentState]);
    useEffect(() => {
        setFollowState(pre => {
            return Object.assign(Object.assign({}, pre), { getData: Object.assign(Object.assign({}, pre.getData), { getBeforeState: getBeforeState }) });
        });
    }, [getBeforeState]);
    useEffect(() => {
        setFollowState(pre => {
            return Object.assign(Object.assign({}, pre), { getData: Object.assign(Object.assign({}, pre.getData), { getAllState: getAllState }) });
        });
    }, [getAllState]);
    useEffect(() => {
        setFollowState(pre => {
            return Object.assign(Object.assign({}, pre), { event: { isBeforCurrent: isBeforCurrent } });
        });
    }, [isBeforCurrent]);
    return followState;
}
export default useFollowState;
