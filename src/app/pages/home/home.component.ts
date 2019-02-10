import { Home } from "./../../models/home";
import { HomeService } from "./../../services/home.service";
import { Component, OnInit } from "@angular/core";
import { AlertService } from "src/app/shared/services/alert.service";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Editoria } from "src/app/models/enum/editoria";
import { CodegenComponentFactoryResolver } from "@angular/core/src/linker/component_factory_resolver";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {

  public home: Home[];
  public banner1: Home;
  public banner2: Home;
  public banner3: Home;
  public banner4: Home;
  public banner5: Home;

  constructor(
    private service: HomeService,
    private alertService: AlertService
  ) {
    this.banner1 = new Home();
    this.banner2 = new Home();
    this.banner3 = new Home();
    this.banner4 = new Home();
    this.banner5 = new Home();
  }

  ngOnInit() {
    this.getHome()
  }

  getHome() {
    this.service.getAll().subscribe((data: any) => {
      this.home = data.result.reverse()
      this.home[0] ? this.banner1 = this.home[0] : this.banner1 = new Home();
      this.home[1] ? this.banner2 = this.home[1] : this.banner2 = new Home();
      this.home[2] ? this.banner3 = this.home[2] : this.banner3 = new Home();
      this.home[3] ? this.banner4 = this.home[3] : this.banner4 = new Home();
      this.home[4] ? this.banner5 = this.home[4] : this.banner5 = new Home();     
    })
  }

  recebeResponse(resposta: any) {
    if(resposta === 'save'){
      this.getHome();
      return this.alertService.success("", "Destaque adicionado com sucesso", "OK");
    }else if (resposta === 'update') {
      this.getHome();
      return this.alertService.success("", "Destaque atualizado com sucesso", "OK");
    }
         
    return this.getHome();
  }

 
  

}
