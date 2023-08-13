import { createPortal } from 'react-dom';
import { isValidUrl } from 'utilize/CheckString';

export const handleString = (string, element, index, images, videos) => {
    let wordString = '';
    let wordStringArr = [];
    let imgCount = 0;
    let videoCount = 0;

    // cut string
    for (let i = 0; i < string.length; i++) {
        if ((string[i] !== ' ') && (string[i] !== '\n')) {
            wordString = wordString + string[i];
        } else {
            if (isValidUrl(wordString)) {
                wordStringArr.push(
                    createPortal(
                    <a style={{color: 'blue', textDecorationSkipInk: 'none'}} href={wordString}>{wordString}</a>,
                    document.querySelectorAll(`.${element}`)[index]
                ))
            } else if (wordString === 'shopmtargeturlimage') {
                wordStringArr.push(
                    createPortal(
                        <br/>,
                        document.querySelectorAll(`.${element}`)[index]
                    )
                )
                wordStringArr.push(
                    createPortal(
                        <img style={{maxWidth: '100%'}} src={images[imgCount]} alt='' />,
                        document.querySelectorAll(`.${element}`)[index]
                    )
                )
                wordStringArr.push(
                    createPortal(
                        <br/>,
                        document.querySelectorAll(`.${element}`)[index]
                    )
                )

                imgCount = imgCount + 1;
            } else if (wordString === 'shopmtargeturlvideo') {
                wordStringArr.push(
                    createPortal(
                        <br/>,
                        document.querySelectorAll(`.${element}`)[index]
                    )
                )
                wordStringArr.push(
                    createPortal(
                        <video style={{maxWidth: '100%'}} controls>
                            <source src={videos[videoCount]} type="video/mp4" />
                            {/* <source src={videos[videoCount]} type="video/ogg" /> */}
                        </video>,
                        document.querySelectorAll(`.${element}`)[index]
                    )
                )
                wordStringArr.push(
                    createPortal(
                        <br/>,
                        document.querySelectorAll(`.${element}`)[index]
                    )
                )

                videoCount = videoCount + 1;
            } else {
                wordStringArr.push(
                    createPortal(
                        <span>{wordString}</span>,
                        document.querySelectorAll(`.${element}`)[index]
                    )
                )
            }

            wordStringArr.push(string[i]);

            wordString = '';
        }
    }

    return wordStringArr.map((data, index) => {
        return (
            wordStringArr[index]
        )
    })
}