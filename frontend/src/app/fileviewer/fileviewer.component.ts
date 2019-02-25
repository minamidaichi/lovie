import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-fileviewer',
  templateUrl: './fileviewer.component.html',
  styleUrls: ['./fileviewer.component.css']
})
export class FileviewerComponent implements OnInit {
  fileList:any;

  constructor(private _appService:AppService) { }

  ngOnInit() {
    this._appService.getIndexFileLists().subscribe(
      res => {
        this.fileList = res.data;
        console.log(res.data);
      }
    )
  }

}
