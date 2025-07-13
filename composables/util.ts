import dayjs from "dayjs"

export const CLOSE_MODAL = 'closeModal'

/**
 * UTCをJSTに変換する
 * 
 * ex) convertToJSTDate('2023-10-01T12:00:00Z') // => '2023/10/01 21:00:00'
 * */
export const convertToJSTDate = (date: string | Date, format?: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'Asia/Tokyo',
  }

  // 日付の初期化
  const utcDate = new Date(date)
  // 実行環境とUTCとの差分（単位：時間）を取得
  const timezoneOffset = new Date().getTimezoneOffset() + (9 * 60) * 60 * 1000
  // 実行環境とUTCとの差分をUTC時間に足して日付を初期化
  const initDate = new Date(utcDate.getTime() + timezoneOffset)

  const ret = initDate.toLocaleString('ja-JP', options)
  return format ? dayjs(ret).format(format) : ret
}

/**
 * 画像ファイルのパスを取得する
 * 
 * @param fileName 画像ファイル名
 * @param extension 拡張子（デフォルトは 'png'）
 * @returns 画像ファイルのパス
 */
export function useAsset(fileName: string, extension: string = 'png'): string {
  const assets = import.meta.glob('~/assets/**/*', {
    eager: true,
    import: 'default',
  })

  // @ts-expect-error: wrong type info
  return assets[`/assets/imgs/${fileName}.${extension}`]
}