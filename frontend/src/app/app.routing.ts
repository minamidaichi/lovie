import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TopComponent } from './top/top.component';
import { UploadComponent } from './upload/upload.component';
import { TestComponent } from './test/test.component';


const appRoutes: Routes = [
    {
        path :'',
        component:TopComponent
    },
    {
        path:'upload',
        component:UploadComponent
    },
    {
        path:'test',
        component:TestComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);