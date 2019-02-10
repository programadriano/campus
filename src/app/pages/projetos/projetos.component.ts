import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Editoria } from "src/app/models/enum/editoria";
import { SpecialProjects } from "src/app/models/specialProjects";
import { SpecialProjectsService } from "src/app/services/special-projects.service";
import { AlertService } from "src/app/shared/services/alert.service";
import { MerchanProjects } from "src/app/models/merchanProjects";
import { take } from "rxjs/operators";


@Component({
  selector: "app-projetos",
  templateUrl: "./projetos.component.html",
  styleUrls: ["./projetos.component.scss"]
})
export class ProjetosComponent implements OnInit {
  _editoriaTipo = Editoria;
  obj: any;
  _id: any;
  key: any;
  selectedValue: Editoria.Entretenimento;
  selectedFile = null;
  public specialProjects: SpecialProjects[];
  public specialP: SpecialProjects;
  public updateSpecialProject: SpecialProjects;
  public editorias: Editoria;
  public total: number;
  public spin : boolean = false;
  public merchanProject: Array<MerchanProjects> = [];
  public merchanAdd: MerchanProjects;

  public image_destaque?: FileList;
  public file_specialProjects?: FileList;

  public url_file_excel_temp?: FileList;
  public url_file_excel_rede_temp?: FileList;
  public url_file_ppt_temp?: FileList;

  public validaTitle: boolean = false;
  public validaUrlVideo: boolean = false;

  public validaImgDestaque: boolean = false;
  public validaPlano: boolean = false;
  public validaExcel: boolean = false;
  public validaExcelRede: boolean = false;
  public validaPPT: boolean = false;


  @ViewChild("btnSend") btnLogin: ElementRef;
  @ViewChild("title") titulo: ElementRef;
  @ViewChild("imgDestaque") imgDestaque: ElementRef;
  @ViewChild("focusPdf") pdf: ElementRef;
 

  constructor(
    private specialProjectsService: SpecialProjectsService,
    private alertService: AlertService
  ) {
    this.specialP = new SpecialProjects();
    this.merchanAdd = new MerchanProjects();
  }

  ngOnInit() {
    this.getAll();
    this.getTotal();
  }

  getAll() {    
    this.specialProjectsService.getAll().subscribe(data => {
      this.obj = data;
      this.specialProjects = this.obj.result;     
    },err => {
      console.log(err)
    });
  }

  getTotal() {
    this.specialProjectsService.getTotal().subscribe(data => {
      this.obj = data;
      this.total = this.obj.result;
    });
  }

  getEditoria(id) {
    return Editoria[id];
  }

  getSpecialProjectById(id) {
    this.specialP = new SpecialProjects()
    this.specialProjectsService.getById(id).subscribe(data => {
      this.obj = data;
      this.specialP = this.obj.result;
      this.updateSpecialProject =  this.specialP
      this._id = this.obj.result._id;

      this.merchanProject = this.specialP.comercialFormatMerchan;
    });
  }

  onSearchChange(searchValue: string) {
    this.specialProjectsService.search(searchValue).subscribe(data => {
      this.obj = data;
      this.specialProjects = this.obj.result;
    });
  }

  delete(id, title) {
    this.alertService
      .question("", `Deseja realmente deletar esse ${title}?`, "OK", "Não")
      .then(willDelete => {
        if (willDelete.value != undefined) {
          this.specialProjectsService.delete(id).subscribe(() => {
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

  sendSpecialProjects(editoria, title, url_movie, projectDate, description) {
    this.specialP = new SpecialProjects();
    this.specialP.editoria = editoria;
    this.specialP.title = title;
    this.specialP.url_movie = url_movie;
    this.specialP.projectDate = projectDate;
    this.specialP.description = description;
    this.specialP.comercialFormatMerchan = this.merchanProject;

    if (this._id != undefined && this._id != "") {
      this.update();
    } else {
      this.save();
    }
  }

  addMerchan(title, url) {
    let m = new MerchanProjects();
    m.title_merchan = title;
    m.url_video_merchan = url;
    this.merchanProject.push(m);

    this.merchanAdd.title_merchan = " ";
    this.merchanAdd.url_video_merchan = " ";
  }

  onDeleteItem(id, title) {
    this.alertService
      .question("", `Deseja realmente deletar esse ${title}?`, "OK", "Não")
      .then(willDelete => {
        if (willDelete.value != undefined) {
          if (id != undefined && id != "") {
            this.merchanProject = this.merchanProject.filter(
              item => item._id !== id
            );
          } else {
            this.merchanProject = this.merchanProject.filter(
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

    this.merchanProject = this.merchanProject.filter(
      item => item._id !== id
    );

  }

  
  save() {
    this._bloqueiaBotao(true);
    let validate = true;

    this.validaTitle = false;
    this.validaUrlVideo = false;
    this.validaImgDestaque = false;
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

    if (this.file_specialProjects == undefined ||
      (this.file_specialProjects != undefined && this.file_specialProjects.length == 0)
    ) {
      validate = false;
      this.validaPlano = true;
      this.pdf.nativeElement.focus()
    }

    if (this.specialP.title == "" || this.specialP.title == undefined) {
      validate = false;
      this.validaTitle = true;
      this.titulo.nativeElement.focus();
    }

    if (validate) {

      this.specialProjectsService
        .uploadGeneric(this.image_destaque)
        .subscribe(data => {
          let urlImage = data.json();
          this.specialP.url_image_destaque = urlImage;
          this.specialProjectsService
            .uploadGeneric(this.file_specialProjects)
            .subscribe(data => {
              let url = data.json();
              this.specialP.url_file_comercialPlain = url;
              this.specialP.comercialFormatMerchan = this.merchanProject;
 
              this.specialProjectsService
                .uploadGeneric(this.url_file_excel_temp)
                .subscribe(data => {
                  let url = data.json();
                  this.specialP.url_file_excel = url;

                  this.specialProjectsService
                    .uploadGeneric(this.url_file_excel_rede_temp)
                    .subscribe(data => {
                      let url = data.json();
                      this.specialP.url_file_excel_rede = url;
                      this.specialProjectsService
                        .uploadGeneric(this.url_file_ppt_temp)
                        .subscribe(data => {
                          let url = data.json();
                          this.specialP.url_file_ppt = url;

                          this.specialProjectsService
                            .save(this.specialP)
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

  cbSaveSuccess(response) {
    this._bloqueiaBotao(false);
    this.getAll();
    this.getTotal();
    this.clearform();
    this._bloqueiaBotao(false);
    return this.alertService.success("", "Plano enviado com sucesso", "OK");
  }

  clearform() {
    this._bloqueiaBotao(false);
    this.specialP = new SpecialProjects();
    this.merchanProject = new Array<MerchanProjects>();
    this.merchanAdd.title_merchan = " ";
    this.merchanAdd.url_video_merchan = " ";
  }

  addNewPlain() {
    this.clearform();
  }

  cbHandlerError(error) {
    this._bloqueiaBotao(false);
    return this.alertService.error(
      "Erro",
      "Ocorreu um erro ao cadastrar o Plano",
      "OK"
    );
  }

  upHandlerError(){
    return this.alertService.error('Erro','Ocorreu um erro ao fazer upload de arquivo', 'OK')
  }

  fileChange(event) {
    this.image_destaque = event.target.files;   
    if (this.specialP.url_image_destaque != undefined) {

      this.specialProjectsService
        .uploadGeneric(this.image_destaque)
        .subscribe(data => {
          let urlImage = data.json();          
          this.updateSpecialProject.url_image_destaque = urlImage; 
        }, err => {
          console.log(err)
          this.upHandlerError();
          
        })
    }

  }

  fileChangePDF(event) {
    this.file_specialProjects = event.target.files;    
    if (this.specialP.url_file_comercialPlain != undefined) {
      this.specialProjectsService
        .uploadGeneric(this.file_specialProjects)
        .subscribe(data => {
          let urlImage = data.json();
          this.updateSpecialProject.url_file_comercialPlain = urlImage;         
        }, err => {
          console.log(err)
          this.upHandlerError();
        })
    }
  }

  fileChangeFileExcel(event) {
    this.url_file_excel_temp = event.target.files;

    if (this.specialP.url_file_excel != undefined) {
      this.specialProjectsService
        .uploadGeneric(this.url_file_excel_temp)
        .subscribe(data => {
          let urlImage = data.json();
          this.updateSpecialProject.url_file_excel = urlImage;         
        }, err => {
          console.log(err)
          this.upHandlerError();
        })
    }
  }

  fileChangeFileExcelRede(event) {
    this.url_file_excel_rede_temp = event.target.files;

    if (this.specialP.url_file_excel_rede != undefined) {
      this.specialProjectsService
        .uploadGeneric(this.url_file_excel_rede_temp)
        .subscribe(data => {
          let urlImage = data.json();
          this.updateSpecialProject.url_file_excel_rede = urlImage;         
        }, err => {
          console.log(err)
          this.upHandlerError();
        })
    }
  }

  fileChangeUrlFilePpt(event) {
    this.url_file_ppt_temp = event.target.files;
    if (this.specialP.url_file_ppt != undefined) {
      this.specialProjectsService
        .uploadGeneric(this.url_file_ppt_temp)
        .subscribe(data => {
          let urlImage = data.json();
          this.updateSpecialProject.url_file_ppt = urlImage;          
        }, err => {
          console.log(err)
          this.upHandlerError();
        })
    }
  }

  _bloqueiaBotao(status) {
    const btn = this.btnLogin.nativeElement;
    status
      ? btn.setAttribute("disabled", "disabled")
      : btn.removeAttribute("disabled");
  }




  update() {
    this._bloqueiaBotao(true);
    let validate = true;
    this.validaTitle = false;
    this.validaUrlVideo = false;


    if (this.updateSpecialProject.title == "" || this.updateSpecialProject.title == undefined) {
      validate = false;      
      this.validaTitle = true;
      this.titulo.nativeElement.focus();
    } 

    if (validate) {     
      this.specialProjectsService
        .update(this._id, this.updateSpecialProject)
        .subscribe(
          this.cbSaveSuccess.bind(this),
          this.cbHandlerError.bind(this)
        );
    } else {
      this._bloqueiaBotao(false);
    }


  }

}


