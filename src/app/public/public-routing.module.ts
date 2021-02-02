import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PublicComponent } from './pages/public/public.component';

const routes: Routes = [{
  path: '',
  component: PublicComponent, children: [
    {
      path: 'teachers',
      loadChildren: () => import('./teachers/teachers.module').then(m => m.TeachersModule)
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
