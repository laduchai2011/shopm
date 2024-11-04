import React, { FC, useEffect, useRef } from 'react';
import './styles.css';

import { SkeletonLoadProps } from 'define';

import { $ } from 'tricks';

const Skeleton: FC<{ skeletonLoad: SkeletonLoadProps }> = ({ skeletonLoad }) => {

    const myElementRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        // const q_skeletonCircle = $('.TKS-Load-Skeleton') as HTMLElement;

        // q_skeletonCircle.style.setProperty('--width', `${skeletonLoad.width}px`);
        // q_skeletonCircle.style.setProperty('--height', `${skeletonLoad.height}px`);

        // if (skeletonLoad.maxminWidth===undefined) {
        //     q_skeletonCircle.style.setProperty('--width', `${skeletonLoad.width}px`);
        // } else {
        //     if (skeletonLoad.maxminWidth==='max') {
        //         q_skeletonCircle.style.setProperty('--width', '100%');
        //     } else if (skeletonLoad.maxminWidth==='min') {
        //         q_skeletonCircle.style.setProperty('--width', 'min-content');
        //     } else {
        //         console.warn('The maxminWidth value of skeletonLoad is invalid. It only recive values: [max, min]');
        //     }
        // }

        // if (skeletonLoad.maxminHeight===undefined) {
        //     q_skeletonCircle.style.setProperty('--height', `${skeletonLoad.height}px`);
        // } else {
        //     if (skeletonLoad.maxminHeight==='max') {
        //         q_skeletonCircle.style.setProperty('--height', '100%');
        //     } else if (skeletonLoad.maxminHeight==='min') {
        //         q_skeletonCircle.style.setProperty('--height', 'min-content');
        //     } else {
        //         console.warn('The maxminHeight value of skeletonLoad is invalid. It only recive values: [max, min]');
        //     }
        // }


        if (myElementRef.current) {

            if (skeletonLoad.maxminWidth===undefined) {
                myElementRef.current.style.setProperty('--width', `${skeletonLoad.width}px`);
            } else {
                if (skeletonLoad.maxminWidth==='max') {
                    myElementRef.current.style.setProperty('--width', '100%');
                } else if (skeletonLoad.maxminWidth==='min') {
                    myElementRef.current.style.setProperty('--width', 'min-content');
                } else {
                    console.warn('The maxminWidth value of skeletonLoad is invalid. It only recive values: [max, min]');
                }
            }
    
            if (skeletonLoad.maxminHeight===undefined) {
                myElementRef.current.style.setProperty('--height', `${skeletonLoad.height}px`);
            } else {
                if (skeletonLoad.maxminHeight==='max') {
                    myElementRef.current.style.setProperty('--height', '100%');
                } else if (skeletonLoad.maxminHeight==='min') {
                    myElementRef.current.style.setProperty('--height', 'min-content');
                } else {
                    console.warn('The maxminHeight value of skeletonLoad is invalid. It only recive values: [max, min]');
                }
            }
        }    
    }, [skeletonLoad])

    return <div className="TKS-Load-Skeleton TKS-Load-Skeleton--Loading" ref={myElementRef} id="myElement">
    </div>
};

export default Skeleton;