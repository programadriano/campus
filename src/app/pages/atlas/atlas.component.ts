import { Component, OnInit, ViewChild, ElementRef  } from "@angular/core";
import { HttpEventType, HttpClient } from "@angular/common/http";
import { AlertService } from "src/app/shared/services/alert.service";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { HttpUtilService } from "src/app/shared/services/http-util.service";

@Component({
  selector: "app-atlas",
  templateUrl: "./atlas.component.html",
  styleUrls: ["./atlas.component.scss"]
})
export class AtlasComponent implements OnInit {
  selectedFile = null;

  atlasForm: FormGroup;
  progressBar: number = 0;

  progressBarShow = false;
  buttonUploadShow = true;

  file: string;

  @ViewChild("btnUp") btnUp: ElementRef;
  @ViewChild("excelInput") excelInput: ElementRef<HTMLInputElement>;

  constructor(
    private httpUtil: HttpUtilService,
    private http: HttpClient,
    private alert: AlertService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.atlasForm = this.formBuilder.group({
      file: ["", Validators.required]
    });
  }

  ngDoCheck() {    
  }

  //"http://apiuploadcomercial.bandeirantes.com.br/api/values"

  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
    this.validate();    
  }

  validate() {
    const validate = this.selectedFile.name.split('.')[1];
    validate === 'xlsx' ? false : this.alert.warning('Cuidado', 'Upload apenas de planilha excel.xlsx', 'ok');    
    validate != 'xlsx' ? this.excelInput.nativeElement.value = '' : false;
    validate != 'xlsx' ? this.selectedFile = null : false;
  }

  onValidate() {
    if (this.selectedFile)
      return this.upload();
    else
      this.alert.warning('', 'Selecione um arquivo xlsx para efetuar o upload', 'ok');
  }

  upload() {
    this._bloqueiaBotao(true);

    const fd = new FormData();
    fd.append("formData", this.selectedFile, this.selectedFile.name);

    this.http
      .post(this.httpUtil.urlUploadGeneric("values"), fd, {
        reportProgress: true,
        observe: "events"
      })
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {

          this.buttonUploadShow = false;
          this.progressBarShow = true;
          this.progressBar = Math.round((event.loaded / event.total) * 100);


        } else if (event.type === HttpEventType.Response) {

          this.buttonUploadShow = true;
          this.progressBarShow = false;

          this.alert.success("", "Arquivo enviado :)", "OK");
          //     this._bloqueiaBotao(false);
        }
      });
  }

  _bloqueiaBotao(status) {
    // pega o botão da tela
    const btn = this.btnUp.nativeElement;

    // coloca o texto final do botão
    const textFinal = status ? "Enviando" : "Fazer Upload";

    // altera o texto do botão
    btn.textContent = textFinal;
    // altera o status do botão
    status
      ? btn.setAttribute("disabled", "disabled")
      : btn.removeAttribute("disabled");
  }
}
