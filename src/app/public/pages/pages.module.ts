import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { CreateAccountComponent } from './create-account/create-account.component';
import { GruposMuscularesComponent } from './grupos-musculares/grupos-musculares.component';
import { RutinasPublicasComponent } from './rutinas/rutinas-public/rutinas-publicas/rutinas-publicas.component';
import { RutinasUsersComponent } from './rutinas/rutinas-users/rutinas-users/rutinas-users.component';
import { RutinasPublicasDetalleComponent } from './rutinas/rutinas-public/rutinas-publicas-detalle/rutinas-publicas-detalle.component';
import { GruposMuscularesDetalleComponent } from './grupos-musculares-detalle/grupos-musculares-detalle.component';
import { VideoDetalleGMComponent } from './video-detalle-gm/video-detalle-gm.component';
import { PreguntasRutinasTestComponent } from './rutinas/preguntas-rutinas-test/preguntas-rutinas-test.component';
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
   // CreateAccountComponent,
    GruposMuscularesComponent,
   RutinasPublicasComponent,
   RutinasUsersComponent,
   RutinasPublicasDetalleComponent,
   GruposMuscularesDetalleComponent,
   VideoDetalleGMComponent,
   PreguntasRutinasTestComponent,

  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormsModule
  ]
})
export class PagesModule { }
