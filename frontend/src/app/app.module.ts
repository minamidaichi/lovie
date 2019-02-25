import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpModule} from '@angular/http'

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { FileviewerComponent } from './fileviewer/fileviewer.component';
import { TopComponent } from './top/top.component';
import { UploadComponent } from './upload/upload.component';
import { TestComponent } from './test/test.component';

import { routing } from './app.routing';

import { AppService } from './app.service'

@NgModule({
  declarations: [
    AppComponent,
    SidemenuComponent,
    FileviewerComponent,
    TopComponent,
    UploadComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    routing,
    NgbModule.forRoot()
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
