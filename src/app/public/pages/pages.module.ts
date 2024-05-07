import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { CreateAccountComponent } from './create-account/create-account.component';
import { GruposMuscularesComponent } from './grupos-musculares/grupos-musculares.component';


@NgModule({
  declarations: [
    CreateAccountComponent,
    GruposMuscularesComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
