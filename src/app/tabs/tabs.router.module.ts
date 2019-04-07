import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { TabsPage } from './tabs.page';

const routes: Routes = [
    {
        path: '',
        component: TabsPage, 
        children: [
            { path: 'report', loadChildren: '../report/report.module#ReportPageModule' },
            { path: 'receipts', loadChildren: '../receipts/receipts.module#ReceiptsPageModule' },
            { path: 'news', loadChildren: '../news/news.module#NewsPageModule' },
            { path: 'account', loadChildren: '../account/account.module#AccountPageModule' }
        ]
    }
];

@NgModule({
    imports: [
      RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
  })
  export class TabsRoutingModule { }
  