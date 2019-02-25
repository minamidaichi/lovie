import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AppService {

  constructor(private _http:Http) {

   }
  //  データ共有用のサブジェクト
   private postResponseData = new Subject<any>();

   // Observable streams オブザーバブルで保持
  public postResponseData$= this.postResponseData.asObservable();

   // Service message commands オブザーバブルに伝えるための関数
   sendMsgToPostResponseData(data) {
    this.postResponseData.next(data);
  }
  // ↑参考サイト http://christina04.hatenablog.com/entry/2017/01/19/041235

  

   getIndexFileLists(){
    return this._http.get("/list/")
    .map(res => res.json());
   }

   getResponseLists(){
    return this._http.get("http://127.0.0.1:3000/upload")
    .map(res => res.json());
   }

   postUploadFiles (body: Object) {
    let bodyString = JSON.stringify(body); // Stringify payload
    let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options       = new RequestOptions({ headers: headers }); // Create a request option

    return this._http.post('/upload/', body, options) // ...using post request
                     .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                     .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
  }  
}
