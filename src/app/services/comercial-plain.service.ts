import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { HttpUtilService } from "../shared/services/http-util.service";
import { Observable } from "rxjs";

import { ComercialPlain } from "../models/comercialPlain";

@Injectable({
  providedIn: "root"
})
export class ComercialPlainService {
  private path = "produtos";


  constructor(private http: Http, private httpUtil: HttpUtilService) { }


  getById(id): Observable<ComercialPlain> {
    return this.http
      .get(this.httpUtil.url(this.path + "/" + id), this.httpUtil.headers())
      .map(this.httpUtil.extrairDados)
      .catch(this.httpUtil.processarErros);
  }

  getAll(): Observable<ComercialPlain[]> {
    return this.http
      .get(this.httpUtil.url(this.path), this.httpUtil.headers())
      .map(this.httpUtil.extrairDados)
      .catch(this.httpUtil.processarErros);
  }

  getTotal(): Observable<Object> {
    return this.http
      .get(
        this.httpUtil.url(this.path + "/total/comercialplain"),
        this.httpUtil.headers()
      )
      .map(this.httpUtil.extrairDados)
      .catch(this.httpUtil.processarErros);
  }

  search(term): Observable<ComercialPlain[]> {
    return this.http
      .get(
        this.httpUtil.url(this.path + "/admin/search/" + term),
        this.httpUtil.headers()
      )
      .map(this.httpUtil.extrairDados)
      .catch(this.httpUtil.processarErros);
  }

  delete(id): Observable<ComercialPlain[]> {    
    return this.http
      .delete(this.httpUtil.url(this.path + "/" + id), this.httpUtil.headers())
      .map(this.httpUtil.extrairDados)
      .catch(this.httpUtil.processarErros);
  }

  save(planos) {
    let comercial = {
      "editoria": planos.editoria,
      "title": planos.title,
      "url_movie": planos.url_movie,
      "description": planos.description,
      "url_image_destaque": planos.url_image_destaque,
      "url_file_comercialPlain": planos.url_file_comercialPlain,
      "url_file_excel": planos.url_file_excel,
      "url_file_excel_rede": planos.url_file_excel_rede,
      "url_file_ppt": planos.url_file_ppt,
      "comercialFormatMerchan": planos.comercialFormatMerchan,
      "monday": planos.monday,
      "tuesday": planos.tuesday,
      "wednesday": planos.wednesday,
      "thursday": planos.thursday,
      "friday": planos.friday,
      "saturday": planos.saturday,
      "sunday": planos.sunday
    };

    return this.http
      .post(this.httpUtil.url(this.path), comercial, this.httpUtil.headers())
      .map(this.httpUtil.extrairDados)
      .catch(this.httpUtil.processarErros);
  }

  update(id, planos) {

    let comercial = {
      "editoria": planos.editoria,
      "title": planos.title,
      "url_movie": planos.url_movie,
      "description": planos.description,
      "url_image_destaque": planos.url_image_destaque,
      "url_file_comercialPlain": planos.url_file_comercialPlain,
      "url_file_excel": planos.url_file_excel,
      "url_file_excel_rede": planos.url_file_excel_rede,
      "url_file_ppt": planos.url_file_ppt,
      "comercialFormatMerchan": planos.comercialFormatMerchan,
      "monday": planos.monday,
      "tuesday": planos.tuesday,
      "wednesday": planos.wednesday,
      "thursday": planos.thursday,
      "friday": planos.friday,
      "saturday": planos.saturday,
      "sunday": planos.sunday
    };

    return this.http.put(this.httpUtil.url(this.path + "/" + id), comercial, this.httpUtil.headers())
      .map(this.httpUtil.extrairDados)
      .catch(this.httpUtil.processarErros);
  }

  uploadImage(image: FileList) {
    const formData: FormData = new FormData();

    if (image.length > 0) {
      const file = image[0];
      formData.append("image", file, file.name);
    }

    return this.http.post(this.httpUtil.urlUpload(), formData);
  }

  uploadPdf(pdf: FileList) {
    const formData: FormData = new FormData();

    if (pdf.length > 0) {
      const file = pdf[0];
      formData.append("formData", file, file.name);
    }

    return this.http.post(this.httpUtil.urlUploadGeneric('values'), formData);
  }

  uploadGeneric(genericFile: FileList) {
    const formData: FormData = new FormData();
    
    if(genericFile) {
      if (genericFile.length > 0) {
        const file = genericFile[0];
        formData.append("formData", file, file.name);
      }
    }   

    return this.http.post(this.httpUtil.urlUploadGeneric('uploads'), formData);
  }





}
