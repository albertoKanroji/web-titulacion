import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { BlogGirdComponent } from './blog-gird/blog-gird.component';
import { TestimontalComponent } from './testimontal/testimontal.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { RutinasPublicasComponent } from './rutinas/rutinas-public/rutinas-publicas/rutinas-publicas.component';
import { RutinasUsersComponent } from './rutinas/rutinas-users/rutinas-users/rutinas-users.component';
import { MisRutinasGuard } from 'src/guards/mis-rutinas/mis-rutinas.guard';
import { RutinasPublicasDetalleComponent } from './rutinas/rutinas-public/rutinas-publicas-detalle/rutinas-publicas-detalle.component';

const routes: Routes = [
  {
    path: 'blog-gird',
    component:BlogGirdComponent
  },
  {
    path: 'blog-detail',
    component:BlogDetailComponent
  },
  {
    path: 'testimontal',
    component:TestimontalComponent
  },
  {
    path: 'create-account',
    component:CreateAccountComponent
  },
  {
    path: 'rutinas-publicas',
    component:RutinasPublicasComponent
  },
  {
    path: 'rutinas-publicas/:id',
    component: RutinasPublicasDetalleComponent
  },
  {
    path: 'rutinas-users',
    component:RutinasUsersComponent,
    canActivate: [MisRutinasGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class PagesRoutingModule { }
