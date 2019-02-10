import { Component, OnInit, Input, OnChanges, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Home } from './../../../models/home';
import { HomeService } from './../../../services/home.service';
import { AlertService } from 'src/app/shared/services/alert.service';


@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit, OnChanges {

  public banner: FormGroup;
  public image_destaque: File;
  public spin: boolean = false;

  @Input() homeD: Home = new Home();
  @Output() resposta = new EventEmitter();

  @ViewChild("btn") btn: ElementRef;

  constructor(
    private fb: FormBuilder,
    private homeService: HomeService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.initForm();
    this.setForm();
  }

  ngOnChanges() {
    this.setForm();
    this.verificaBtn();
  }

  initForm() {
    this.banner = this.fb.group({
      editoria: ['', [Validators.required]],
      title: ['', Validators.required],
      link_banner: ['', Validators.required],
      description: ['', Validators.required],
      url_image_banner: ['']
    })
  }

  setForm() {
    if (this.homeD._id)
      return this.banner.setValue({
        editoria: this.homeD.editoria,
        title: this.homeD.title,
        link_banner: this.homeD.link_banner,
        description: this.homeD.description,
        url_image_banner:  this.homeD.url_image_banner
      })
  }

  onSubmit() {
    if (this.homeD._id)
      return this.update();

    return this.save();
  }

  save() {    
    if (this.image_destaque) {
      this.spinShow();
      return this.homeService.uploadImage(this.image_destaque).subscribe(data => {
        let urlImage = data.json();
        this.banner.value.url_image_banner = urlImage;
        this.homeService
          .save(this.banner.value)
          .subscribe(() => {            
            this.resposta.emit('save');            
            this.spinHide()
          }, err => {
            console.log(err)
            this.cbHandlerError.bind(this);
          });
      })
    }
    return this.alertService.error('Erro', 'Você precisa selecionar uma imagem para Salvar', 'OK');
  }

  update() {
    this.homeService.update(this.homeD._id, this.banner.value)
      .subscribe(() => {
        this.resposta.emit('update');        
      }, err => {
       console.log(err)
      });
  }

  delete() {
    this.alertService.question("", `Deseja realmente deletar esse ${this.banner.get('title').value}?`, "OK", "Não")
      .then(willDelete => {
        if (willDelete.value) {
          this.homeService.delete(String(this.homeD._id)).subscribe(() => {
            this.resposta.emit('ok');
            this.alertService.success('', 'Título deletado com sucesso', 'OK');
            this.initForm();
          })
        }
      })
  }

  fileChange(event: any) {
    const banner = this.banner.get('url_image_banner').value;
    this.image_destaque = <File>event.target.files[0];

    if (banner)
      this.homeService.uploadImage(this.image_destaque).subscribe(data => {
        let urlImage = data.json();
        this.banner.controls['url_image_banner'].patchValue(urlImage);
       
      })
  }

  spinShow() {
    return this.spin = true;
  }

  spinHide() {
    return this.spin = false;
  } 

  cbHandlerError(error) {
    return this.alertService.error("Erro", "Ocorreu um erro ao cadastrar o Destaque", "OK");
  }

  verificaBtn() {
    this.homeD._id ? this.btn.nativeElement.textContent = 'Atualizar banner' : this.btn.nativeElement.textContent = 'Cadastrar banner'
  }

}
