import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GruposMuscularesService } from 'src/services/grupos-musculares/grupos-musculares.service';

@Component({
  selector: 'app-videos-all',
  templateUrl: './videos-all.component.html',
  styleUrls: ['./videos-all.component.css']
})
export class VideosAllComponent implements OnInit {
  loading1 = false;
  loading2 = false;
  loadingContenido= false;
  rutina!: any;
  ejercicios: any[] = []; // Array para almacenar los ejercicios
  rutinas: any[]  = [];
  tags: any[]  = [];
  equipo: any[]  = [];
  loader2: boolean = false;
  filteredVideos: any[] = []; // Array para almacenar los videos filtrados
  searchText: string = '';
  constructor(private route: ActivatedRoute, private rutinasService: GruposMuscularesService) { }
  filterVideos(): void {
    if (this.searchText.trim() === '') {
      this.filteredVideos = this.ejercicios;
    } else {
      this.filteredVideos = this.ejercicios.filter((rutina) =>
        rutina.nombre.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
  }
  getImageSrc(miniatura: string): string {
    if (miniatura.startsWith('https')) {
      // Si la miniatura comienza con "https", es una URL directa (Firebase)
      return miniatura;
    } else {
      // Si no comienza con "https", asumimos que es Base64
      return 'data:image/jpeg;base64,' + miniatura;
    }
  }

  ngOnInit(): void {
    this.getVideosAll()
  }
  getVideosAll(): void {
    this.loader2 = true;
    this.rutinasService.getAllVideos().subscribe(
      (data: any) => {
        this.ejercicios = data.data; // Asegúrate de que data sea un array de rutinas
        this.filteredVideos = this.ejercicios;
        this.loader2 = false;
      },
      (error) => {
        console.error('Error al obtener las rutinas:', error);
        this.loader2 = false;
      }
    );
  }
}
