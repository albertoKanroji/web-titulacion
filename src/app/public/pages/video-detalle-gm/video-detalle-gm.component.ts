import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GruposMuscularesService } from 'src/services/grupos-musculares/grupos-musculares.service';

@Component({
  selector: 'app-video-detalle-gm',
  templateUrl: './video-detalle-gm.component.html',
  styleUrls: ['./video-detalle-gm.component.css']
})
export class VideoDetalleGMComponent implements OnInit {
  loading1 = false;
  loading2 = false;
  loadingContenido= false;
  rutina!: any;
  ejercicios: any[] = []; // Array para almacenar los ejercicios
  rutinas: any[]  = [];
  tags: any[]  = [];
  equipo: any[]  = [];
  loading: boolean = false;

  constructor(private route: ActivatedRoute, private rutinasService: GruposMuscularesService) { }

  ngOnInit(): void {
    this.obtenerDetalleRutina();
   // this.obtenerEjerciciosDeRutina();
   this.obtenerGruposMusculares()
   this.getTags()
   this.getEquipo()
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
  getTags(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loading = true;
    this.rutinasService.getTagsVideo(id).subscribe(
      (data: any) => {
        this.equipo = data.data; // Asegúrate de que data sea un array de rutinas
        console.log(data)
        this.loading = false;
      },
      (error) => {
        console.error('Error al obtener las rutinas:', error);
        this.loading = false;
      }
    );
  }
  getEquipo(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loading = true;
    this.rutinasService.getEquipoVideo(id).subscribe(
      (data: any) => {
        this.tags = data.data; // Asegúrate de que data sea un array de rutinas
        console.log(data)
        this.loading = false;
      },
      (error) => {
        console.error('Error al obtener las rutinas:', error);
        this.loading = false;
      }
    );
  }
  obtenerGruposMusculares(): void {
    this.loading = true;
    this.rutinasService.obtenerGruposMusculares().subscribe(
      (data: any) => {
        this.rutinas = data.data; // Asegúrate de que data sea un array de rutinas
        console.log(data)
        this.loading = false;
      },
      (error) => {
        console.error('Error al obtener las rutinas:', error);
        this.loading = false;
      }
    );
  }

}
