import { Component, OnInit } from '@angular/core';
import { ClimaService } from 'src/app/services/clima.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  imgUrl = 'https://image.flaticon.com/icons/svg/1116/1116453.svg';
  ciudad = '';
  sensacionTer = 0;
  temperatura = 0; 
  humedad = 0;
  presion = 0;
  clima = '';
  query = false;
  loading = false;
  nombre = '';
  mostrarError = false;

  constructor(private _climaService: ClimaService) {
    
   }

  ngOnInit(): void {
  }

  obtenerClima(){
    this.query = false;
    this.loading = true;

    this._climaService.getClima(this.ciudad).subscribe(data => {
      console.log(data);
      this.query = true;
      this.temperatura = data.main.temp - 273;
      this.humedad = data.main.humidity;
      this.clima = data.weather[0].main;
      this.nombre = data.name;
      this. sensacionTer = data.main.feels_like - 273;
      this.presion = data.main.pressure;
      this.loading = false;

    }, error => {
      console.log(error);
      this.error();
      this.loading = false;

    }
      
    )
  }

  error() {
    this.mostrarError = true;
    setTimeout(() => {
      this.mostrarError = false;
      this.ciudad = '';

    },3000);
    
  }

}
