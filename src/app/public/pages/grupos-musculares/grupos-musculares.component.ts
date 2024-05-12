import { Component, OnInit } from '@angular/core';
import { GruposMuscularesService } from 'src/services/grupos-musculares/grupos-musculares.service';

@Component({
  selector: 'app-grupos-musculares',
  templateUrl: './grupos-musculares.component.html',
  styleUrls: ['./grupos-musculares.component.css']
})
export class GruposMuscularesComponent implements OnInit {

  loading: boolean = false;
  rutinas: any[]  = [];

  constructor(private rutinasService: GruposMuscularesService) { }

  ngOnInit(): void {
    this.obtenerRutinas();
  }

  obtenerRutinas(): void {
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
