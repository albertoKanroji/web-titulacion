import { Component, OnInit } from '@angular/core';
import {PreguntaService} from "../../../../../services/preguntas/pregunta.service";
import { Router } from '@angular/router';
import {AuthService} from "../../../../../services/auth-service/auth-service.service";
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { LogService } from 'src/services/logs/log-service.service';

@Component({
  selector: 'app-preguntas-rutinas-test',
  templateUrl: './preguntas-rutinas-test.component.html',
  styleUrls: ['./preguntas-rutinas-test.component.css']
})
export class PreguntasRutinasTestComponent implements OnInit {
  preguntas: any[] = [];
  respuestas: number[] = [];
  loading: boolean = false;
  loadingBtn: boolean = false;
  userId: number | null | undefined;
  constructor(
    private preguntaService: PreguntaService,
    private router: Router,
    private authService: AuthService
    ,private toastr: ToastrService,
    private logService: LogService
    ) { }
    enviarLog(){
      const accion = 'Resultados enviados';
      const contenido = `El usuario ${this.userId} envió los resultados del test correctamente.`;

      this.logService.setLog(accion, contenido).subscribe({
        next: () => {
          console.log('Log registrado exitosamente.');
        },
        error: (logError) => {
          console.error('Error al registrar el log:', logError);
        }
      });

    }
  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    console.log(this.userId)
    this.getQuestions();
  }

  getQuestions(): void {
    this.loading = true;
    this.preguntaService.getPreguntas().subscribe({
      next: (data: any) => {
        this.preguntas = data;
        console.log(data);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al obtener las preguntas:', error);
        this.loading = false;
      }
    });

  }
  enviarResultados(): void {
    this.loadingBtn = true;
    const resultados = this.preguntas.map((pregunta, index) => ({
      preguntaId: pregunta.id,
      respuestaValor: this.respuestas[index]
    }));
    console.log(resultados);

    this.preguntaService.enviarResultados(resultados, this.userId).subscribe(
      (response) => {
        this.loadingBtn = false;
        console.log('Resultados enviados exitosamente', response);
        this.enviarLog();

        this.router.navigate(['/pages/rutinas-users']); // Redirigir a la página de la rutina
      },
      (error: HttpErrorResponse) => {
        this.loadingBtn = false;
        console.error('Error al enviar los resultados', error);
        if (error.error.message === 'Primero complete su perfil') {
          this.toastr.error('Primero complete su perfil', 'Error');
        }
      }
    );
  }


}
