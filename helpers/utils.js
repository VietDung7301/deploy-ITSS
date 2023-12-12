/**
 * Convert string sang int. 
 * Nếu input là undefined hoặc null, trả về giá trị ban đầu
 * @param {string} data 
 * @returns {int|any}
 */
exports.toInt = (data) => {
    if (data) return parseInt(data)
    return data
}