import http from '@/api/http'

/**
 * @description 创建红包
 * @param {number} totalMoney    红包金额
 * @param {number} totalNumber    红包个数
 * @returns {Promise<{data: string}>} 红包key
 */
export function creatRedPacket(totalMoney,totalNumber) {
    return http.get(
        `/api/v1/send/${totalMoney}/${totalNumber}`,
    )
}

/**
 * @description 抢红包接口
 * @param {string} redPackageKey   红包key
 */
export function getRedPacket(redPackageKey) {
    return http.get(
        `api/v2/rob/${redPackageKey}`,
    )
}

/**
 * @description 获得奖励接口
 * @param {string} redPackageKey  红包key
 * @returns {Promise<{data: number}>} 获得奖励金额
 */
export function getRedPacketRecord(redPackageKey) {
    return http.get(
        `/api/v2/record/${redPackageKey}`,
    )
}
