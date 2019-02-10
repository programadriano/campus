import { HttpClient, HttpEventType } from "@angular/common/http";
import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";

import { ComercialPlainService } from "src/app/services/comercial-plain.service";
import { ComercialPlain } from "src/app/models/comercialPlain";
import { Editoria } from "src/app/models/enum/editoria";
import { AlertService } from "src/app/shared/services/alert.service";
import { Router } from "@angular/router";
import { MerchanPlain } from "src/app/models/merchanPlain";
import { take } from "rxjs/operators";

@Component({
  selector: "app-planos",
  templateUrl: "./planos.component.html",
  styleUrls: ["./planos.component.scss"]
})
export class PlanosComponent implements OnInit {
  _editoriaTipo = Editoria;
  obj: any;
  _id: any;
  key: any;
  selectedValue: Editoria.Entretenimento;
  selectedFile = null;
  public comercialPlain: ComercialPlain[];
  public comercialP: ComercialPlain;
  public editorias: Editoria;
  public total: number;
  public merchanPlain: Array<MerchanPlain> = [];
  public merchanAdd: MerchanPlain;


  public image_destaque?: FileList;
  public file_comercialPlain?: FileList;

  public url_file_excel_temp?: FileList;
  public url_file_excel_rede_temp?: FileList;
  public url_file_ppt_temp?: FileList;

  public validaTitle: boolean = false;
  public validaUrlVideo: boolean = false;
  public validaDiasSemana: boolean = false;
  
  public validaImgDestaque: boolean = false;
  public validaPlano: boolean = false;
  public validaExcel: boolean = false;
  public validaExcelRede: boolean = false;
  public validaPPT: boolean = false;


  @ViewChild("btnSend") btnLogin: ElementRef;
  @ViewChild("title") titulo: ElementRef;  
  @ViewChild("imgDestaque") imgDestaque: ElementRef;
  @ViewChild("focusPdf") pdf: ElementRef;
  @ViewChild("week") week: ElementRef;



  constructor(
    private comercialPlainService: ComercialPlainService,
    private alertService: AlertService,
    private http: HttpClient,
    private _router: Router
  ) {
    this.comercialP = new ComercialPlain();
    this.merchanAdd = new MerchanPlain();
  }

  ngOnInit() {
    this.getAll();
    this.getTotal();
  }

  getAll() {
    this.comercialPlainService.getAll().pipe(take(1)).subscribe(data => {
      this.obj = data;
      console.log(this.obj);
      this.comercialPlain = this.obj;
    },err =>{
      console.log(err)
    });
  }

  getTotal() {
    this.comercialPlainService.getTotal().subscribe(data => {
      this.obj = data;
      this.total = this.obj.result;
    });
  }

  getEditoria(id) {
    return Editoria[id];
  }

  getComercialPlainById(id) {
    this.comercialPlainService.getById(id).subscribe(data => {
      this.obj = data;
      this.comercialP = this.obj.result;
      this._id = this.obj.result._id;

      this.merchanPlain = this.comercialP.comercialFormatMerchan;
    });
  }

  onSearchChange(searchValue: string) {
    this.comercialPlainService.search(searchValue).subscribe(data => {
      this.obj = data;
      this.comercialPlain = this.obj.result;
    });
  }

  delete(id, title) {    
    this.alertService
      .question("", `Deseja realmente deletar esse ${title}?`, "OK", "Não")
      .then(willDelete => {         
        if (willDelete.value != undefined) {
          this.comercialPlainService.delete(id).subscribe(() => {
            this.getAll();
            this.getTotal();
            this.alertService.success(
              "",
              `${title} deletado com sucesso!`,
              "OK"
            );
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  sendComercialPlain(
    editoria,
    title,
    url_movie,
    description,
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday,
    sunday
  ) {
    this.comercialP.editoria = editoria;
    this.comercialP.title = title;
    this.comercialP.url_movie = url_movie;
    this.comercialP.description = description;
    this.comercialP.sunday = sunday;
    this.comercialP.monday = monday;
    this.comercialP.tuesday = tuesday;
    this.comercialP.wednesday = wednesday;
    this.comercialP.thursday = thursday;
    this.comercialP.friday = friday;
    this.comercialP.saturday = saturday;
    this.comercialP.comercialFormatMerchan = this.merchanPlain;

    this._bloqueiaBotao(true);
    if (this._id != undefined && this._id != "") {
      this.update();
    } else {
      this.save();
    }
  }

  update() {

    var validate = true;
    this.validaTitle = false;
    this.validaUrlVideo = false;

    if (this.comercialP.title == "" || this.comercialP.title == undefined) {
      validate = false;
      this.validaTitle = true;
    }

    if (this.comercialP.url_movie == "" || this.comercialP.url_movie == undefined) {
      validate = false;
      this.validaUrlVideo = true;
    }

    if (validate) {
      this.comercialPlainService
        .update(this._id, this.comercialP)
        .subscribe(
          this.cbSaveSuccess.bind(this),
          this.cbHandlerError.bind(this)
        );
    } else {
      this._bloqueiaBotao(false);
    }


  }

  save() {
    
    var validate = true;

    this.validaTitle = false;
    this.validaUrlVideo = false;
    this.validaImgDestaque = false;
    this.validaDiasSemana = false;
    this.validaPlano = false;
    this.validaExcel = false;
    this.validaExcelRede = false;
    this.validaPPT = false;

    if (this.image_destaque == undefined ||
      (this.image_destaque != undefined && this.image_destaque.length == 0)
    ) {
      validate = false;
      this.validaImgDestaque = true;
      this.imgDestaque.nativeElement.focus();
    }    

    if (this.file_comercialPlain == undefined ||
      (this.file_comercialPlain != undefined && this.file_comercialPlain.length == 0)
    ) {
      validate = false;
      this.validaPlano = true;
      this.pdf.nativeElement.focus();
    }
    
    if (this.comercialP.title == "" || this.comercialP.title == undefined) {
      validate = false;
      this.validaTitle = true;
      this.titulo.nativeElement.focus();
    }  

    if(this.comercialP.sunday == false 
      && this.comercialP.monday == false
      && this.comercialP.tuesday == false
      && this.comercialP.wednesday == false
      && this.comercialP.thursday == false
      && this.comercialP.friday == false
      && this.comercialP.saturday == false ){
        validate = false;
        this.validaDiasSemana = true;
        this.week.nativeElement.focus();

      }

    if (validate) {

      this.comercialPlainService
        .uploadGeneric(this.image_destaque)
        .subscribe(data => {
          let urlImage = data.json();
          this.comercialP.url_image_destaque = urlImage;
          this.comercialPlainService
            .uploadGeneric(this.file_comercialPlain)
            .subscribe(data => {
              let url = data.json();
              this.comercialP.url_file_comercialPlain = url;
              this.comercialP.comercialFormatMerchan = this.merchanPlain;

              this.comercialPlainService
                .uploadGeneric(this.url_file_excel_temp)
                .subscribe(data => {
                  let url = data.json();
                  this.comercialP.url_file_excel = url;

                  this.comercialPlainService
                    .uploadGeneric(this.url_file_excel_rede_temp)
                    .subscribe(data => {
                      let url = data.json();
                      this.comercialP.url_file_excel_rede = url;
                      this.comercialPlainService
                        .uploadGeneric(this.url_file_ppt_temp)
                        .subscribe(data => {
                          let url = data.json();
                          this.comercialP.url_file_ppt = url;

                          this.comercialPlainService
                            .save(this.comercialP)
                            .subscribe(
                              this.cbSaveSuccess.bind(this),
                              this.cbHandlerError.bind(this)
                            );

                        });
                    });

                });

            });
        });


    } else {
      this._bloqueiaBotao(false);
    }
  }

  addMerchan(title, url) {

    let m = new MerchanPlain();
    m.title_merchan = title;
    m.url_video_merchan = url;
    this.merchanPlain.push(m);


  }

  onDeleteItem(id, title) {
    this.alertService
      .question("", `Deseja realmente deletar esse ${title}?`, "OK", "Não")
      .then(willDelete => {

        if (willDelete.value != undefined) {

          if (id != undefined && id != "") {
            this.merchanPlain = this.merchanPlain.filter(
              item => item._id !== id
            );
          } else {
            this.merchanPlain = this.merchanPlain.filter(
              item => item.title_merchan !== title
            );
          }

        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  onEditItem(id, title, url) {
    this.merchanAdd._id = id;
    this.merchanAdd.title_merchan = title;
    this.merchanAdd.url_video_merchan = url;

    this.merchanPlain = this.merchanPlain.filter(
      item => item._id !== id
    );

  }

  fileChange(event) {
    this.image_destaque = event.target.files;

    if (this.comercialP.url_image_destaque != undefined) {

      this.comercialPlainService
        .uploadGeneric(this.image_destaque)
        .subscribe(data => {
          let urlImage = data.json();
          this.comercialP.url_image_destaque = urlImage;         
        }, err => {
          console.log(err)
          this.upHandlerError();
          
        })
    }

  }

  fileChangePDF(event) {
    this.file_comercialPlain = event.target.files;

    if (this.comercialP.url_file_comercialPlain != undefined) {
      this.comercialPlainService
        .uploadGeneric(this.file_comercialPlain)
        .subscribe(data => {
          let urlImage = data.json();
          this.comercialP.url_file_comercialPlain = urlImage;         
        }, err => {
          console.log(err)
          this.upHandlerError();
          
        })
    }
  }

  fileChangeFileExcel(event) {
    this.url_file_excel_temp = event.target.files;

    if (this.comercialP.url_file_excel != undefined) {
      this.comercialPlainService
        .uploadGeneric(this.url_file_excel_temp)
        .subscribe(data => {
          let urlImage = data.json();
          this.comercialP.url_file_excel = urlImage;          
        }, err => {
          console.log(err)
          this.upHandlerError();
          
        })
    }
  }

  fileChangeFileExcelRede(event) {
    this.url_file_excel_rede_temp = event.target.files;

    if (this.comercialP.url_file_excel_rede != undefined) {
      this.comercialPlainService
        .uploadGeneric(this.url_file_excel_rede_temp)
        .subscribe(data => {
          let urlImage = data.json();
          this.comercialP.url_file_excel_rede = urlImage;         
        }, err => {
          console.log(err)
          this.upHandlerError();
          
        })
    }
  }

  fileChangeUrlFilePpt(event) {
    this.url_file_ppt_temp = event.target.files;

    if (this.comercialP.url_file_ppt != undefined) {
      this.comercialPlainService
        .uploadGeneric(this.url_file_ppt_temp)
        .subscribe(data => {
          let urlImage = data.json();
          this.comercialP.url_file_ppt = urlImage;          
        }, err => {
          console.log(err)
          this.upHandlerError();
          
        })
    }
  }


  addNewPlain() {
    this.clearform();
  }

  cbSaveSuccess(response) {
    this.getAll();
    this.getTotal();
    this.clearform();
    return this.alertService.success("", "Plano enviado com sucesso", "OK");
  }

  cbHandlerError(error) {
    return this.alertService.error(
      "Erro",
      "Ocorreu um erro ao cadastrar o Plano",
      "OK"
    );
  }

  upHandlerError(){
    return this.alertService.error('Erro','Ocorreu um erro ao fazer upload de arquivo', 'OK')
  }

  clearform() {
    this._bloqueiaBotao(false);
    this.comercialP = new ComercialPlain();
    this.merchanPlain = new Array<MerchanPlain>();
    this.merchanAdd.title_merchan = " ";
    this.merchanAdd.url_video_merchan = " ";

  }


  _bloqueiaBotao(status) {
    const btn = this.btnLogin.nativeElement;
    status
      ? btn.setAttribute("disabled", "disabled")
      : btn.removeAttribute("disabled");
  }
}
