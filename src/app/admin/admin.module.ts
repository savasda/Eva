import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TeachersComponent } from './pages/teachers/teachers.component';
import { PogramsComponent } from './pages/pograms/pograms.component';
import { PageComponent } from './pages/page/page.component';
import { IntegrationComponent } from './pages/integration/integration.component';
import { CreateEntityComponent } from './components/create-entity/create-entity.component';
import { StylesComponent } from './components/styles/styles.component';

import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { ru_RU } from 'ng-zorro-antd/i18n';


import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzSpinModule } from 'ng-zorro-antd/spin';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AdminServicesModule } from './services/services.module';
import { EntityTableComponent } from './components/entity-table/entity-table.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';


@NgModule({
  declarations: [
		DashboardComponent, 
		LoginComponent, 
		TeachersComponent, 
		PogramsComponent, 
		PageComponent, 
		IntegrationComponent, 
		CreateEntityComponent, 
		StylesComponent, EntityTableComponent
	],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
		HttpClientModule,
		AdminServicesModule,
		FormsModule,
		ReactiveFormsModule,
		
		NzButtonModule,
		NzInputModule,
		NzLayoutModule,
		NzBreadCrumbModule,
		NzIconModule,
		NzMenuModule,
		NzEmptyModule,
		NzModalModule,
		CKEditorModule,
		NzFormModule,
		NzDividerModule,
		NzSpinModule,
		NzTableModule,
		NzCheckboxModule
  ],
  providers: [
		{ provide: NZ_I18N, useValue: ru_RU }
	]

})
export class AdminModule { }
