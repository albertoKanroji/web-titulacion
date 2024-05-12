import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GruposMuscularesService } from 'src/services/grupos-musculares/grupos-musculares.service';

@Component({
  selector: 'app-grupos-musculares-detalle',
  templateUrl: './grupos-musculares-detalle.component.html',
  styleUrls: ['./grupos-musculares-detalle.component.css']
})
export class GruposMuscularesDetalleComponent implements OnInit {

  loading1 = false;
  loading2 = false;
  rutina!: any;
  ejercicios: any[] = []; // Array para almacenar los ejercicios
  constructor(private route: ActivatedRoute, private rutinasService: GruposMuscularesService) { }

  ngOnInit(): void {
    this.obtenerDetalleRutina();
   this.obtenerVideos();
  }

  obtenerDetalleRutina(): void {
    this.loading1 = true;
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.rutinasService.obtenerDetalleGruposMuscular(id).subscribe(
      (data: any) => {
        this.rutina = data.data;
        console.log(this.rutina)
        this.loading1 = false;
      },
      (error) => {
        console.error('Error al obtener el detalle de la rutina:', error);
        this.loading1 = false;
      }
    );
  }
  obtenerVideos(): void {
    this.loading2 = true; 
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.rutinasService.obtenerVideosGM(id).subscribe(
      (data: any) => {
        this.ejercicios = data.data;
        this.loading2 = false; 
        console.log(this.ejercicios)
      },
      (error) => {
        console.error('Error al obtener los ejercicios de la rutina:', error);
        this.loading2 = false; 
      }
    );
  }

}
