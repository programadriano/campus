import { HttpClient, HttpEventType } from "@angular/common/http";
import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";

import { ProducsService } from "../../services/producsService";
import { Products } from "src/app/models/products";
import { AlertService } from "src/app/shared/services/alert.service";
import { Router } from "@angular/router";
import { take } from "rxjs/operators";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

@Component({
  selector: "app-planos",
  templateUrl: "./planos.component.html",
  styleUrls: ["./planos.component.scss"]
})
export class PlanosComponent implements OnInit {
  public obj: any;
  public products: Products[];
  public product: Products;

  constructor(
    private producsService: ProducsService,
    private alertService: AlertService
  ) {
    this.product = new Products();
  }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.producsService.getAll().subscribe(
      data => {
        this.obj = data;
        this.products = this.obj;
      },
      err => {
        console.log(err);
      }
    );
  }

  getById(codigoBarras) {
    this.producsService.getById(codigoBarras).subscribe(
      data => {
        this.obj = data;
        this.product = this.obj;
      },
      err => {
        console.log(err);
      }
    );
  }

  delete(codigoBarras, nome) {
    this.alertService
      .question("", `Deseja realmente deletar esse ${nome}?`, "OK", "Não")
      .then(willDelete => {
        if (willDelete.value !== undefined) {
          this.producsService.delete(codigoBarras).subscribe(
            data => {
              this.getAll();
            },
            err => {
              console.log(err);
            }
          );
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  sendForm(codigoBarras, nome, preco) {

    this.product.codigoBarras =
      codigoBarras === ""
        ? Math.random()
            .toString(36)
            .substring(2, 15) +
          Math.random()
            .toString(36)
            .substring(2, 15)
        : codigoBarras;
    this.product.nome = nome;
    this.product.preco = preco;

    if (codigoBarras === "") {
      this.save();
    } else {
      this.update();
    }
  }

  update() {
    this.producsService
      .update(this.product)
      .subscribe(this.cbSaveSuccess.bind(this), this.cbHandlerError.bind(this));
  }

  save() {
    this.producsService
      .save(this.product)
      .subscribe(this.cbSaveSuccess.bind(this), this.cbHandlerError.bind(this));
  }

  cbSaveSuccess(response) {
    this.getAll();
    this.clearForm();
    return this.alertService.success("", "Produto enviado com sucesso", "OK");
  }

  cbHandlerError(error) {
    return this.alertService.error(
      "Erro",
      "Ocorreu um erro ao cadastrar o Plano",
      "OK"
    );
  }

  clearForm(){
    this.product.codigoBarras = "";
    this.product.nome = "";
    this.product.preco = "";
  }

  upHandlerError() {
    return this.alertService.error(
      "Erro",
      "Ocorreu um erro ao fazer upload de arquivo",
      "OK"
    );
  }
}
