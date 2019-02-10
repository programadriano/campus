import { Injectable } from "@angular/core";
import { HttpUtilService } from "../shared/services/http-util.service";
import { Observable } from "rxjs";
import { Http } from "@angular/http";
import { Home } from "../models/home";
import { tap, map, filter, retry, catchError } from "rxjs/operators";
@Injectable({
  providedIn: "root"
})
export class HomeService {
  private path = "destaques";

  constructor(private http: Http, private httpUtil: HttpUtilService) { }

  getById(_id): Observable<Home> {
    return this.http
      .get(this.httpUtil.url(this.path + "/" + _id), this.httpUtil.headers())
      .map(this.httpUtil.extrairDados)
      .catch(this.httpUtil.processarErros);
  }

  getAll(): Observable<HomeService[]> {
    return this.http
      .get(this.httpUtil.url(this.path), this.httpUtil.headers())
      .map(this.httpUtil.extrairDados)
      .catch(this.httpUtil.processarErros);
  }

  search(term): Observable<Home[]> {
    return this.http
      .get(
        this.httpUtil.url(this.path + "/admin/search/" + term),
        this.httpUtil.headers()
      )
      .map(this.httpUtil.extrairDados)
      .catch(this.httpUtil.processarErros);
  }

  save(home) {
    let destaque = {
      editoria: home.editoria,
      title: home.title,
      link_banner: home.link_banner,
      description: home.description,
      url_image_banner: home.url_image_banner
    };

    return this.http
      .post(this.httpUtil.url(this.path), destaque, this.httpUtil.headers())
      .map(this.httpUtil.extrairDados)
      .catch(this.httpUtil.processarErros);

  }

  update(_id, home) {
    let destaque = {
      _id: _id,
      editoria: home.editoria,
      title: home.title,
      link_banner: home.link_banner,
      description: home.description,
      url_image_banner: home.url_image_banner
    };

    return this.http
      .put(
        this.httpUtil.url(`${this.path}/${_id}`),
        destaque,
        this.httpUtil.headers()
      )
      .map(this.httpUtil.extrairDados)
      .catch(this.httpUtil.processarErros);

  }

  delete(id: string) {
    return this.http.delete(`${this.httpUtil.url(this.path)}/${id}`).map(this.httpUtil.extrairDados)
      .catch(this.httpUtil.processarErros);
  }
  uploadImage(image: File) {

    const formData: FormData = new FormData();
    formData.append("formData", image, image.name);

    return this.http.post(this.httpUtil.urlUploadGeneric('uploads'), formData);
  }
}
