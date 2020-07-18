import {InvokeMapItem, InvokeMessage, InvokeResult} from "./Interface";

export default class JSProxy {
  private SCHEMA: string = '这里填写和端上商量好的prompt url'
  // todo any类型
  private invokeMap: Map<string, InvokeMapItem> = new Map()

  /**
   * 通知端上设置方法
   * @param message
   * @param resolve
   * @param reject
   */
  invoke(message: InvokeMessage, resolve: () => {}, reject: () => {}): void {
    const invokeType: number = message.invokeType
    this.invokeMap.set(message.callbackId, {resolve, reject})
    const schemaUrl = this.SCHEMA + encodeURIComponent(JSON.stringify(message)) + '&uniqueId=' + message.callbackId
    if (invokeType === 8) {
      window.location.href = schemaUrl
    } else {
      window.prompt(schemaUrl);
    }
  }

  register() {
    console.log('JSProxy register')
  }

  /**
   * 收到native回复，如果调用过程报错ios不会走到这里
   * @param res JSON数据
   */
  onClientInvoke(res: string) {
    alert(res)
    const resObj: InvokeResult = JSON.parse(res)
    const callbackID = resObj.callbackId;
    const invoke = this.invokeMap.get(callbackID)
    if (invoke) {
      resObj.errorCode * 1 === 0 ? invoke.resolve(resObj.params || 'success') : invoke.reject(resObj.returnUserMessage || 'error');
      // 调用后销毁对象，减小内存占用
      this.invokeMap.delete(callbackID)
    }
  }

  onError(errorMsg: any): void {
    console.log('JSProxy onError:' + errorMsg)
  }
}

