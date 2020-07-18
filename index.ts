import {generateId} from "./util";
import {METHODS} from "./methodsMap";
import JSProxy from "./JSProxy";
import {InvokeMessage} from "./Interface";

const proxy: JSProxy = new JSProxy()

function sdkCall(params: any, invokeType: number, needCallback: boolean = false): Promise<any> {
  const callbackId = generateId(invokeType);
  // 如果需要回调函数
  if (needCallback) {
    const callbackName = 'backFunc' + callbackId;
    (window as any)[callbackName] = params.func;
    params.func = callbackName;
  }
  const message: InvokeMessage = {
    invokeType,
    invokeName: '',
    callbackId,
    params
  }

  return new Promise((resolve: any, reject: any) => {
    proxy.invoke(message, resolve, reject);
  })
}

(window as any).JsProxy = proxy;

// 测试了三类方法
export const SDK = {
  setTitle(title: string): Promise<any> {
    const invokeType = METHODS.setTitle
    return sdkCall({title}, invokeType)
  },
  getCommonData(): Promise<any> {
    const invokeType = METHODS.getCommonData
    return sdkCall({}, invokeType)
  },
  onNavBack(func: () => void, disableGoBack?: boolean): Promise<any> {
    const invokeType = METHODS.onNavBack
    return sdkCall({func, disableGoBack}, invokeType, true)
  }
}


