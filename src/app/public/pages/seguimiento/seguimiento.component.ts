import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from 'src/services/customers/customer-service.service';

declare var bootstrap: any; // Para manejar el modal de Bootstrap

@Component({
  selector: 'app-seguimiento',
  templateUrl: './seguimiento.component.html',
  styleUrls: ['./seguimiento.component.css'],
})
export class SeguimientoComponent implements OnInit, OnDestroy {
  previewImages: string[] = [];
  base64Images: any[] = [];
  selectedFiles: File[] = [];
  loadedImages: any[] = [];
  uploadedImagesDetails: any[] = []; // Almacena detalles como peso y comentarios
  user = localStorage.getItem('clienteNombre');
  // Variables para la modal
  currentImagePreview: string = '';
  currentImageDetails: any = { peso: '', comentarios: '' };
  currentFileIndex: number = 0;
  nextUploadDate: Date | null = null;
  private commentModal: any; // Referencia a la modal de Bootstrap
  canUpload: boolean = true;
  constructor(
    private customerService: CustomerService,
    private toastr: ToastrService
  ) {}
  checkUploadAvailability(): void {
    if (this.loadedImages.length > 0) {
      const lastImageDate = new Date(
        this.loadedImages[this.loadedImages.length - 1].created_at
      );
      this.nextUploadDate = new Date(lastImageDate);
      this.nextUploadDate.setDate(lastImageDate.getDate() + 15);

      const today = new Date();
      this.canUpload = today >= this.nextUploadDate;
    } else {
      this.canUpload = true;
    }
  }

  ngOnInit(): void {
    this.LOAD_IMAGES();
    this.checkUploadAvailability();
    // Crear instancia de la modal al iniciar el componente
    const modalElement = document.getElementById('commentModal');
    this.commentModal = new bootstrap.Modal(modalElement, {
      backdrop: 'static', // Evitar que se cierre al hacer clic fuera de la modal
      keyboard: false, // Evitar que se cierre al presionar la tecla 'Escape'
    });
  }

  ngOnDestroy(): void {
    // Destruir la instancia de la modal al destruir el componente para limpiar recursos
    if (this.commentModal) {
      this.commentModal.dispose();
    }
  }

  LOAD_IMAGES() {
    this.customerService.getImagenes().subscribe(
      (response) => {
        if (response.success && response.data) {
          this.loadedImages = response.data.map((img: any) => ({
            image: 'data:image/png;base64,' + img.image, // Concatenar el prefijo base64 con la imagen
            peso: img.peso, // Asignar el peso recibido
            comentarios: img.comentarios,
            id: img.id, // Asignar los comentarios recibidos
            created_at: new Date(img.created_at), // Convertir la fecha a un objeto de tipo Date
          }));
          this.checkUploadAvailability();
          console.log('Imágenes cargadas:', this.loadedImages);
        }
      },
      (error) => {
        console.error('Error al cargar imágenes:', error);
      }
    );
  }
  deleteImage(imageId: number): void {
    this.customerService.deleteImage(imageId).subscribe({
      next: (response) => {
        // Filtrar la imagen eliminada de la lista
        this.loadedImages = this.loadedImages.filter(
          (img) => img.id !== imageId
        );
        this.showSuccess();
        this.LOAD_IMAGES();
      },
      error: (err) => {
        console.error('Error al eliminar la imagen', err);
        this.showError();
      },
    });
  }

  onFilesSelected(event: any) {
    this.checkUploadAvailability();
    const files = event.target.files;
    this.previewImages = [];
    this.selectedFiles = [];
    this.uploadedImagesDetails = []; // Limpiar detalles de imágenes anteriores

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      this.selectedFiles.push(file);

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewImages.push(e.target.result);

        // Abrir modal para la primera imagen seleccionada
        if (i === 0) {
          this.currentImagePreview = e.target.result;
          this.currentFileIndex = 0;
          this.openModal();
        }
      };
      reader.readAsDataURL(file);
    }
  }

  // Método para abrir la modal
  openModal() {
    this.commentModal.show();
  }

  // Método para guardar los detalles de la imagen actual
  saveImageDetails() {
    // Almacena los detalles de la imagen
    this.uploadedImagesDetails.push({
      preview: this.currentImagePreview,
      peso: this.currentImageDetails.peso,
      comentarios: this.currentImageDetails.comentarios,
    });

    // Limpiar los detalles para la siguiente imagen
    this.currentImageDetails = { peso: '', comentarios: '' };

    // Avanzar al siguiente archivo si existe
    this.currentFileIndex++;
    if (this.currentFileIndex < this.previewImages.length) {
      this.currentImagePreview = this.previewImages[this.currentFileIndex];
      this.openModal();
    } else {
      // Si no hay más imágenes, llama a saveImagesAsBase64 y cierra la modal
      this.saveImagesAsBase64();
      this.commentModal.hide();
    }
  }

  // Convierte las imágenes seleccionadas a Base64
  saveImagesAsBase64() {
    this.base64Images = []; // Limpiar array base64

    const promises: Promise<void>[] = [];

    this.selectedFiles.forEach((file, index) => {
      const reader = new FileReader();
      const promise = new Promise<void>((resolve) => {
        reader.onload = (e: any) => {
          // Agregar imagen en Base64 (sin el encabezado) al array
          this.base64Images.push({
            image: e.target.result.split(',')[1], // Imagen en Base64
            peso: this.uploadedImagesDetails[index].peso, // Peso del detalle asociado
            comentarios: this.uploadedImagesDetails[index].comentarios, // Comentarios del detalle asociado
          });
          resolve();
        };
      });
      reader.readAsDataURL(file); // Convertir la imagen a base64
      promises.push(promise);
    });

    // Esperamos que todas las imágenes se conviertan antes de hacer la llamada al servidor
    Promise.all(promises).then(() => {
      // Llamar al servicio para subir las imágenes
      this.customerService.uploadCustomerImages(this.base64Images).subscribe(
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

  // Mostrar mensaje de éxito
  showSuccess() {
    this.toastr.info('Completado', 'Imágenes cargadas');
  }

  // Mostrar mensaje de error
  showError() {
    this.toastr.error('Error', 'Ocurrió un error');
  }

  // Elimina una imagen seleccionada
  removeImage(index: number) {
    this.previewImages.splice(index, 1); // Elimina la imagen de la vista previa
    this.selectedFiles.splice(index, 1); // Elimina el archivo correspondiente
  }
}
