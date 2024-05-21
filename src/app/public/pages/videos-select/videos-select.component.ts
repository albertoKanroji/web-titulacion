import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GruposMuscularesService } from 'src/services/grupos-musculares/grupos-musculares.service';

@Component({
  selector: 'app-videos-select',
  templateUrl: './videos-select.component.html',
  styleUrls: ['./videos-select.component.css']
})
export class VideosSelectComponent implements OnInit {
  loading1 = false;
  loading2 = false;
  loadingContenido= false;
  rutina!: any;
  ejercicios: any[] = []; // Array para almacenar los ejercicios
  rutinas: any[]  = [];
  tags: any[]  = [];
  equipo: any[]  = [];
  loading: boolean = false;
  nombre = String(this.route.snapshot.paramMap.get('nombre'));
  constructor(private route: ActivatedRoute, private rutinasService: GruposMuscularesService) { }


  ngOnInit(): void {
    this.getVideos()
  }
  getVideos(): void {
    this.loading2=true;
    const id = String(this.route.snapshot.paramMap.get('nombre'));
    this.rutinasService.getEjerciciosVideos(id).subscribe(
      (data: any) => {
        this.ejercicios = data.data;
        console.log(  this.ejercicios)
        this.loading2=false;
      },
      (error) => {
        console.error('Error al obtener el detalle de la rutina:', error);
        this.loading2=false;
      }
    );
  }
}
