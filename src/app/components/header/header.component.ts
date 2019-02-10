import { Component } from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

import { LoginService } from "src/app/login/services/login.service";
import { AlertService } from "src/app/shared/services/alert.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver
  .observe(Breakpoints.Handset)
  .pipe(map(result => result.matches));

constructor(
  private breakpointObserver: BreakpointObserver,
  private alert: AlertService,
  private router: Router,
  private loginservice: LoginService
) {}
public user: any;
ngOnInit() {
  this.user = localStorage['user'];
}

logOut() {
  let alertTitle = "Logout",
    alertText = `Tem certeza que deseja sair "${this.user}"?`;

  this.alert.question(alertTitle, alertText, "Confirmar", "Cancelar").then(
    () => {
      this.loginservice.logOut();
      this.router.navigate(["/login"]);
    },
    () => false
  );
}

}
