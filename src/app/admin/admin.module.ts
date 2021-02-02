import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TuiLinkModule, TuiRootModule, TuiNotificationModule, TuiButtonModule} from '@taiga-ui/core';
import { LoginComponent } from './pages/login/login.component';
import { TuiInputModule, TuiInputPasswordModule, TuiIslandModule, TuiAccordionModule } from '@taiga-ui/kit/components';
import { ReactiveFormsModule } from '@angular/forms';
import { TeachersComponent } from './pages/teachers/teachers.component';
import { PogramsComponent } from './pages/pograms/pograms.component';
import { PageComponent } from './pages/page/page.component';
import { IntegrationComponent } from './pages/integration/integration.component';



@NgModule({
  declarations: [DashboardComponent, LoginComponent, TeachersComponent, PogramsComponent, PageComponent, IntegrationComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,

    TuiRootModule,
    TuiLinkModule,
    TuiIslandModule,
    TuiInputModule,
    TuiButtonModule,
    TuiNotificationModule,
    TuiInputPasswordModule,
    TuiAccordionModule
  ]
})
export class AdminModule { }
