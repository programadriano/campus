import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { PlatformDetectorService } from './../shared/services/platform-detector.service';
import { LoginService } from "./services/login.service";
import { AlertService } from "../shared/services/alert.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private loginService: LoginService,
    private _alert: AlertService,
    private formBuilder: FormBuilder,
    private platformDetectorService: PlatformDetectorService
  ) {}
  username: string;
  password: string;

  loginForm: FormGroup;

  @ViewChild("btnLogin") btnLogin: ElementRef;
  @ViewChild("userNameInput") userNameInput: ElementRef<HTMLInputElement>;

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  logIn(event: Event) {

    event.preventDefault();
    this._bloqueiaBotao(true);

    this.loginService
      .logIn(this.username, this.password)
      .subscribe(
        login => this.processarLogin(login),
        error => this._processaError(error)
      );
  }


  processarLogin(login: any) {
    this._bloqueiaBotao(false);
    localStorage["user"] = login.usuario.nome;
    localStorage["role"] = login.usuario.role;
    localStorage["token"] = login.token;
    this.router.navigate(["dashboard"]);
  }

  _processaError(error: any) {
    this._bloqueiaBotao(false);
    this.loginForm.reset();
    this.platformDetectorService.isPlatformBrowser() &&
      this.userNameInput.nativeElement.focus();
    this._alert.error("Whoops!", "Usuário ou Senha Inválidos", "Ok!");
    return false;
  }

  _bloqueiaBotao(status) {
    // pega o botão da tela
    const btn = this.btnLogin.nativeElement;

    // coloca o texto final do botão
    const textFinal = status ? "Autenticando" : "Entrar";

    // altera o texto do botão
    btn.textContent = textFinal;
    // altera o status do botão
    status
      ? btn.setAttribute("disabled", "disabled")
      : btn.removeAttribute("disabled");
  }
}

