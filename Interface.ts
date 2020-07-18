/**
 * 端上响应的结果
 * errorCode：0 成功；1 失败
 * callbackId：调用时的（毫秒级时间戳+invokeType+两位随机数）拼接的唯一消息ID
 * params：返回的参数，通常是获取公参等方法返回的结果，可能有，也可能没有
 */
export interface InvokeResult {
  errorCode: 0 | 1,
  callbackId: string,
  params?: object
  returnUserMessage?: string
}

export interface InvokeMessage {
  callbackId: string,
  invokeType: number,
  invokeName: string,
  params: object
}

export interface InvokeMapItem {
  resolve: (v: any) => {},
  reject: (v: any) => {}
}
