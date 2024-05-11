import { Component, OnInit } from '@angular/core';
import { Rutina } from 'src/interfaces/Rutinas';
import { MisRutinasService } from 'src/services/mis-rutinas/mis-rutinas.service';

@Component({
  selector: 'app-rutinas-publicas',
  templateUrl: './rutinas-publicas.component.html',
  styleUrls: ['./rutinas-publicas.component.css']
})
export class RutinasPublicasComponent implements OnInit {
  loading: boolean = false;
  rutinas: Rutina[]  = [];

  constructor(private rutinasService: MisRutinasService) { }

  ngOnInit(): void {
    this.obtenerRutinas();
  }

  obtenerRutinas(): void {
    this.loading = true; 
    this.rutinasService.obtenerRutinas().subscribe(
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
