// row hover
export const rowHoverIn = (
    index: number, 
    element_rowsOfIndex: React.MutableRefObject<(HTMLDivElement | null)[]>,
    element_rows: React.MutableRefObject<(HTMLDivElement | null)[]>,
    element_rowsOfCalculate: React.MutableRefObject<(HTMLDivElement | null)[]>,
) => {
    if (element_rows.current[index]) {
        (element_rows.current[index]!).classList.add('hover');
    }
    if (element_rowsOfCalculate.current[index]) {
        (element_rowsOfCalculate.current[index]!).classList.add('hover');
    }
    if (element_rowsOfIndex.current[index]) {
        (element_rowsOfIndex.current[index]!).classList.add('hover');
    }
}

export const rowHoverOut = (
    index: number, 
    element_rowsOfIndex: React.MutableRefObject<(HTMLDivElement | null)[]>,
    element_rows: React.MutableRefObject<(HTMLDivElement | null)[]>,
    element_rowsOfCalculate: React.MutableRefObject<(HTMLDivElement | null)[]>
) => {
    if (element_rows.current[index]) {
        (element_rows.current[index]!).classList.remove('hover');
    }
    if (element_rowsOfCalculate.current[index]) {
        (element_rowsOfCalculate.current[index]!).classList.remove('hover');
    }
    if (element_rowsOfIndex.current[index]) {
        (element_rowsOfIndex.current[index]!).classList.remove('hover');
    }
}

export const rowToggle = (
    index: number, 
    element_rowsOfIndex: React.MutableRefObject<(HTMLDivElement | null)[]>,
    element_rows: React.MutableRefObject<(HTMLDivElement | null)[]>,
    element_rowsOfCalculate: React.MutableRefObject<(HTMLDivElement | null)[]>
) => {
    if (element_rows.current[index]) {
        (element_rows.current[index]!).classList.toggle('selected');
    }
    if (element_rowsOfCalculate.current[index]) {
        (element_rowsOfCalculate.current[index]!).classList.toggle('selected');
    }
    if (element_rowsOfIndex.current[index]) {
        (element_rowsOfIndex.current[index]!).classList.toggle('selected');
    }
}