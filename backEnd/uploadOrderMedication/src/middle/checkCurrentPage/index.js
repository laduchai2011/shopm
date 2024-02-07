'use strict';

function isCurrentPage(req, res, next) {
    const caseRecord = req.caseRecordMid;
    const pageNumber = Number(req.body.pageNumber);
    const pageTotal = caseRecord.pageTotal;

    if (pageNumber === pageTotal) {
        req.currentPage = caseRecord.pageTotal;
        next();
    } else {
        return res.status(200).json({ 
            caseRecord: caseRecord,
            message: "This page is NOT a current page !",
            success: false,
            isCurrentPage: false,
            checkedType: 'currentPage'
        })
    }
}

module.exports = { isCurrentPage }