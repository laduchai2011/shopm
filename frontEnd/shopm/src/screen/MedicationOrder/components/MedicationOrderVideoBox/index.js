import React, { memo } from 'react';

import { $$ } from 'utilize/Tricks';

const MedicationOrderVideoBox = ({ data, index }) => {

    const handleGenerateImage = async (index) => {
        const canvas = $$(".MedicationOrder-Video-list-videoBox-canvas")[index];
        const video = $$('.MedicationOrder-Video-list-videoBox-video')[index];
        const ctx = canvas.getContext("2d");

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        video.currentTime = video.duration / 2;
        await video.play();
 
        var image = new Image();
        image.crossOrigin = '*';
  		image.onload = function() {       
            ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);   
        };
        
        image.src = canvas.toDataURL("image/png");

        video.pause();
        video.currentTime = 0;
    }

    const handleHoverVideo = (index) => {
        const q_video = $$('.MedicationOrder-Video-list-videoBox-video')[index]
        const q_canvas = $$('.MedicationOrder-Video-list-videoBox-canvas')[index];
        q_video.style.display = 'block';
        q_canvas.style.display = 'none';
        q_video.play();
    }

    const handleOutHoverVideo = (index) => {
        const q_video = $$('.MedicationOrder-Video-list-videoBox-video')[index]
        const q_canvas = $$('.MedicationOrder-Video-list-videoBox-canvas')[index];
        q_video.style.display = 'none';
        q_canvas.style.display = 'block';
        q_video.pause();
    }

    const handleLoadStartVideo = (index) => {
        handleGenerateImage(index);
    }

    return (
        <div className='MedicationOrder-Video-list-videoBox' onMouseOver={() => handleHoverVideo(index)} onMouseOut={() => handleOutHoverVideo(index)}>
            <video className='MedicationOrder-Video-list-videoBox-video' src={data} onLoadedMetadata={() => handleLoadStartVideo(index)} muted controls />
            <canvas className='MedicationOrder-Video-list-videoBox-canvas' />
        </div>
    )
}

export default memo(MedicationOrderVideoBox);