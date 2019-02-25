import { Component, OnInit, ElementRef } from '@angular/core';
import { AppService } from '../app.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  fileList:any;
  optionsList:any;
  public accordionArray = [true, false, false];
  public cardList:Array<any>;
  public draggableList:Array<any>;
  public testVar = 'false';
  folderObj:Object = {
      "name": String,
      "m_time": new Date(),
      "size": null
  }

  private _el:HTMLElement;
  

  constructor( private _appService:AppService, private el:ElementRef ) { 
    this._el = this.el.nativeElement;
  }

  ngOnInit() {
    // POSTリクエスト
    this._appService.postResponseData$.subscribe(
      res => {
            this.fileList = res.response
            this.optionsList = this.fileList[0].options
            this.cardList = _.map(this.fileList, item => {
              return true
            })
            this.draggableList = _.map(this.fileList, item => {
              return false
            })
        }
      )

    // this._appService.getResponseLists().subscribe(
    //     res => {
    //       this.fileList = res.response
    //       this.optionsList = this.fileList[0].options
    //       console.log(this.draggableList)
    //     }
    //   )
  }

  trackFile(index, item){
    // console.log(index, item)
  }

  handleClick(e:MouseEvent, i: any){
    this.optionsList = this.fileList[i].options
  }

  accordion(index){
    for(var i = 0; i < this.accordionArray.length; i++){
      if(i == index){
        if(this.accordionArray[index]){
          return false
        } else {
          this.accordionArray[index] = true
        }
      } else {
        this.accordionArray[i] = false
      }
    }
  }


  logFunc(e, i){
    // e.dataTransfer
    console.log(e)
    console.log(i)
  }

  disableCard(e, index){
    this.cardList[index] = false; 
  }

  cancelEvent(e){
    e.stopPropagation()
    e.preventDefault()
  }

}
