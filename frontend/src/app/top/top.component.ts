import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { AppService } from '../app.service'
import  * as _  from 'lodash'

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.css']
})
export class TopComponent implements OnInit {
  public visible:string;

  constructor(private _routing:Router, private _appService:AppService) { }

  ngOnInit() {
  }

  showUploadWindow(e){
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    this.visible = 'visible';
  }

  sendFileByDrop(e){
    e.preventDefault();
    e.stopPropagation();
    var files = e.dataTransfer.files;
    var sendBody:Array<any> = _.map(files, item => {
      return item['name'];
    })
    this.visible = 'hidden';
    this._appService.postUploadFiles(sendBody).subscribe(
      res => {
        this._appService.sendMsgToPostResponseData(res)
      },
      error => {
        console.log(error)
      }
    )
    this._routing.navigate(['upload'])
  }

  

}
