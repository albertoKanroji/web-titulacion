import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GruposMuscularesService } from 'src/services/grupos-musculares/grupos-musculares.service';

@Component({
  selector: 'app-video-detalle-gm',
  templateUrl: './video-detalle-gm.component.html',
  styleUrls: ['./video-detalle-gm.component.css']
})
export class VideoDetalleGMComponent implements OnInit {

  loadingContenido= false;
  rutina!: any;
  ejercicios: any[] = []; // Array para almacenar los ejercicios
  constructor(private route: ActivatedRoute, private rutinasService: GruposMuscularesService) { }

  ngOnInit(): void {
    this.obtenerDetalleRutina();
   // this.obtenerEjerciciosDeRutina();
  }

  obtenerDetalleRutina(): void {
    this.loadingContenido=true;
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.rutinasService.VideosGMDetalle(id).subscribe(
      (data: any) => {
        this.rutina = data.data;
        console.log(  this.rutina)
        this.loadingContenido=false;
      },
      (error) => {
        console.error('Error al obtener el detalle de la rutina:', error);
        this.loadingContenido=false;
      }
    );
  }

}
