import { Component, OnInit } from '@angular/core';
import {LoginService} from "../../../../services/login/login.service";
import {AuthService} from "../../../../services/auth-service/auth-service.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomerService} from "../../../../services/customers/customer-service.service";
import { ToastrService } from 'ngx-toastr';
import {catchError, of} from "rxjs";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  myForm!: FormGroup;
  loading = false;
  loadingBTN = false;
  // Declara una variable para almacenar la respuesta del servicio
  solicitud: any;
  isFlipped = false;
  toggleCard() {
    this.isFlipped = !this.isFlipped;
  }
  constructor(
    private loginService: LoginService,
    private fb: FormBuilder,
    private authService:AuthService,
    private customerService: CustomerService,
    private toastr: ToastrService
  ) {
    this.myForm  = this.fb.group({
      nombre: [{ value: '', disabled: true }],
      apellido: [{ value: '', disabled: true }],
      apellido2: [{ value: '', disabled: true }],
      correo: [{ value: '', disabled: true }],
      peso: [{ value: '', disabled: true }],
      altura: [{ value: '', disabled: true }],
      IMC: [{ value: null, disabled: true }],
      rutina: [{ value: '', disabled: true }],
      sexo: [{ value: '', disabled: true }],
      fecha_embresia: [{ value: '', disabled: true }],
      fecha_embresia_pago: [{ value: '', disabled: true }],
      // profileIsComplete: [{ value: '', disabled: true }]
    });
  }
getData(){
  this.loading=true;
  const clienteId = this.authService.getUserId(); // Obtén el ID del cliente desde AuthService
  if (clienteId) {
    this.loginService.getCustomerData(clienteId).subscribe(
      data => {
        // Rellenar el formulario con los datos del cliente
        this.myForm.patchValue(data.data);
        console.log(this.myForm)
        this.loading=false;
      },
      error => {
        this.loading=false;
        console.error(error); // Maneja cualquier error de la solicitud
      }
    );
  } else {
    console.error('No se pudo obtener el ID del cliente.');
  }
}
  ngOnInit(): void {
    const fechaMembresia = new Date(); // Cambia esto si necesitas una fecha específica
    this.myForm.controls['fecha_embresia'].setValue(fechaMembresia.toISOString().slice(0, 10)); // Formato 'YYYY-MM-DD'

    // Sumar 30 días a 'fechaMembresia' para 'fecha_embresia_pago'
    const fechaPago = new Date(fechaMembresia);
    fechaPago.setDate(fechaPago.getDate() + 30);
    this.myForm.controls['fecha_embresia_pago'].setValue(fechaPago.toISOString().slice(0, 10));
this.getData()
  }

  submitForm() {
    try {
      this.loadingBTN=true;
      const id = this.authService.getUserId();
      if (this.myForm.valid && id) {
        const formValue = this.myForm.value;
        this.customerService.updateCustomer(id, formValue)
          .pipe(
            catchError(err => {
              this.loadingBTN=false
              console.error('Error al actualizar el cliente:', err);
              this.showError();
              return of(null); // Retorna un observable vacío para continuar con la ejecución
            })
          )
          .subscribe(response => {

            if (response) {
              console.log('Cliente actualizado:', response);
              this.showSuccess();
              this.loadingBTN=false;
              this.getData();
              this.authService.updateProfileStatus('si');
            }
          });
      }
    } catch (error) {
      console.error('Error en el formulario:', error);
      this.showError();
      this.loadingBTN=false
    }
  }
  showSuccess() {
    this.toastr.info('Completado', 'Datos Actualizados');
  }
  showError() {
    this.toastr.error('No Completado', 'Ocurrio un error');
  }
}
