import { Injectable } from "@angular/core";
import { HttpUtilService } from "../shared/services/http-util.service";
import { Http } from "@angular/http";
import { SpecialProjects } from "../models/specialProjects";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class SpecialProjectsService {
  private path = "specialProjects";

  constructor(private http: Http, private httpUtil: HttpUtilService) { }

  getById(id): Observable<SpecialProjects> {
    return this.http
      .get(this.httpUtil.url(this.path + "/" + id), this.httpUtil.headers())
      .map(this.httpUtil.extrairDados)
      .catch(this.httpUtil.processarErros);
  }

  getAll(): Observable<SpecialProjects[]> {
    return this.http
      .get(this.httpUtil.url(this.path), this.httpUtil.headers())
      .map(this.httpUtil.extrairDados)
      .catch(this.httpUtil.processarErros);
  }

  getTotal(): Observable<Object> {
    return this.http
      .get(
        this.httpUtil.url(this.path + "/total/specialProjects"),
        this.httpUtil.headers()
      )
      .map(this.httpUtil.extrairDados)
      .catch(this.httpUtil.processarErros);
  }

  search(term): Observable<SpecialProjects[]> {
    return this.http
      .get(
        this.httpUtil.url(this.path + "/admin/search/" + term),
        this.httpUtil.headers()
      )
      .map(this.httpUtil.extrairDados)
      .catch(this.httpUtil.processarErros);
  }

  delete(id): Observable<SpecialProjects[]> {
    return this.http
      .delete(this.httpUtil.url(this.path + "/" + id), this.httpUtil.headers())
      .map(this.httpUtil.extrairDados)
      .catch(this.httpUtil.processarErros);
  }

  save(especiais) {  
    let projetos = {
      editoria: especiais.editoria,
      title: especiais.title,
      url_movie: especiais.url_movie,
      projectDate: especiais.projectDate,
      description: especiais.description,
      url_image_destaque: especiais.url_image_destaque,
      url_file_comercialPlain: especiais.url_file_comercialPlain,
      url_file_excel: especiais.url_file_excel,
      url_file_excel_rede: especiais.url_file_excel_rede,
      url_file_ppt: especiais.url_file_ppt,
      comercialFormatMerchan: especiais.comercialFormatMerchan
    };

    return this.http
      .post(this.httpUtil.url(this.path), projetos, this.httpUtil.headers())
      .map(this.httpUtil.extrairDados)
      .catch(this.httpUtil.processarErros);
  }

  update(id, especiais) {    
    let projetos = {
      editoria: especiais.editoria,
      title: especiais.title,
      url_movie: especiais.url_movie,
      projectDate: especiais.projectDate,
      description: especiais.description,
      url_image_destaque: especiais.url_image_destaque,
      url_file_specialProject: especiais.url_file_specialProject,
      url_file_excel: especiais.url_file_excel,
      url_file_excel_rede: especiais.url_file_excel_rede,
      url_file_ppt: especiais.url_file_ppt,
      comercialFormatMerchan: especiais.comercialFormatMerchan
    };  
    return this.http
      .put(
        this.httpUtil.url(this.path + "/" + id),
        projetos,
        this.httpUtil.headers()
      )
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
