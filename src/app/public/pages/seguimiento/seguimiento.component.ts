import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from 'src/services/customers/customer-service.service';

@Component({
  selector: 'app-seguimiento',
  templateUrl: './seguimiento.component.html',
  styleUrls: ['./seguimiento.component.css']
})
export class SeguimientoComponent implements OnInit {
  previewImages: string[] = [];  // Almacena URLs para la vista previa
  base64Images: string[] = [];   // Almacena las imágenes en Base64
  selectedFiles: File[] = [];
  constructor(private customerService: CustomerService,private toastr: ToastrService) { }
  loadedImages: any[] = [];

  ngOnInit(): void {
    // Cargar las imágenes guardadas al iniciar el componente
  this.LOAD_IMAGES();
  }
  LOAD_IMAGES(){
    this.customerService.getImagenes().subscribe(
      (response) => {
        if (response.success && response.data) {
          this.loadedImages = response.data.map((img: string) => ({
            image: 'data:image/png;base64,' + img, // Concatenamos el prefijo para la imagen base64
            created_at: new Date() // Si necesitas mostrar una fecha, pero aquí no está presente en la respuesta
          }));
          console.log('Imágenes cargadas:', this.loadedImages);
        }
      },
      (error) => {
        console.error('Error al cargar imágenes:', error);
      }
    );
  }

  onFilesSelected(event: any) {
    const files = event.target.files;

    // Limpiar las previas imágenes y archivos seleccionados
    this.previewImages = [];
    this.selectedFiles = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      this.selectedFiles.push(file);

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewImages.push(e.target.result); // Almacena la URL para la vista previa
      };
      reader.readAsDataURL(file);
    }
  }
  showSuccess() {
    this.toastr.info('Completado', 'Imagenes cargadas');
  }
  showError() {
    this.toastr.error('Error', 'Ocurrio un error');
  }
  // Convierte las imágenes seleccionadas a Base64
  saveImagesAsBase64() {
    this.base64Images = []; // Limpiar array base64

    const promises: Promise<void>[] = [];

    this.selectedFiles.forEach(file => {
      const reader = new FileReader();
      const promise = new Promise<void>((resolve) => {
        reader.onload = (e: any) => {
          this.base64Images.push(e.target.result.split(',')[1]); // Agrega la imagen en Base64 (sin el encabezado)
          resolve();
        };
      });
      reader.readAsDataURL(file); // Convertir la imagen a base64
      promises.push(promise);
    });

    // Esperamos que todas las imágenes se conviertan antes de hacer la llamada al servidor
    Promise.all(promises).then(() => {
      // Llamar al servicio para subir las imágenes
      this.customerService.uploadCustomerImages( this.base64Images).subscribe(
        (response) => {
         this.showSuccess();
         this.LOAD_IMAGES();
         this.previewImages = [];
        },
        (error) => {
          this.showError();
        }
      );
    });
  }

  // Elimina una imagen seleccionada
  removeImage(index: number) {
    this.previewImages.splice(index, 1); // Elimina la imagen de la vista previa
    this.selectedFiles.splice(index, 1); // Elimina el archivo correspondiente
  }
}
