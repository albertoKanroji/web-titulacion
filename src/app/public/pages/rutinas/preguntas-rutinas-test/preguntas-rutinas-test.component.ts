import { Component, OnInit } from '@angular/core';
import {PreguntaService} from "../../../../../services/preguntas/pregunta.service";
import { Router } from '@angular/router';
import {AuthService} from "../../../../../services/auth-service/auth-service.service";
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
    private authService: AuthService,
    ) { }

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
    this.loadingBtn=true;
    const resultados = this.preguntas.map((pregunta, index) => ({
      preguntaId: pregunta.id,
      respuestaValor: this.respuestas[index]
    }));
    console.log(resultados)

    this.preguntaService.enviarResultados(resultados, this.userId).subscribe(
      (response) => {
        this.loadingBtn=false;
        console.log('Resultados enviados exitosamente', response);
        this.router.navigate(['/pages/rutinas-users']); // Redirigir a la página de la rutina
      },
      (error) => {
        this.loadingBtn=false;
        console.error('Error al enviar los resultados', error);
      }
    );
  }

}
