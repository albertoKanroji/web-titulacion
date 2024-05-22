import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ejercicio } from 'src/interfaces/Ejercicios';
import { Rutina } from 'src/interfaces/Rutinas';
import { MisRutinasService } from 'src/services/mis-rutinas/mis-rutinas.service';

@Component({
  selector: 'app-rutinas-publicas-detalle',
  templateUrl: './rutinas-publicas-detalle.component.html',
  styleUrls: ['./rutinas-publicas-detalle.component.css']
})
export class RutinasPublicasDetalleComponent implements OnInit {
  loading: boolean = false;
  rutina!: Rutina;
  ejercicios: any[] = []; // Array para almacenar los ejercicios
  constructor(private route: ActivatedRoute, private rutinasService: MisRutinasService) { }

  ngOnInit(): void {
    this.obtenerDetalleRutina();
    this.obtenerEjerciciosDeRutina();
  }

  obtenerDetalleRutina(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.rutinasService.obtenerDetalleRutina(id).subscribe(
      (data: any) => {
        this.rutina = data.data;
        console.log(this.rutina)
      },
      (error) => {
        console.error('Error al obtener el detalle de la rutina:', error);
      }
    );
  }
  obtenerEjerciciosDeRutina(): void {
    this.loading = true;
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.rutinasService.obtenerEjerciciosDeRutina(id).subscribe(
      (data: any) => {
        this.ejercicios = data.data;
        this.loading = false;
        console.log(this.ejercicios)
      },
      (error) => {
        console.error('Error al obtener los ejercicios de la rutina:', error);
        this.loading = false;
      }
    );
  }
}
