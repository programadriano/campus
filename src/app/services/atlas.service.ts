import { Injectable } from '@angular/core';
import { HttpUtilService } from '../shared/services/http-util.service';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class AtlasService {
  private path = "atlas";

  constructor(private http: Http, private httpUtil: HttpUtilService) { }

  uploadExcel(excel: FileList) {
    const formData: FormData = new FormData();

    if (excel.length > 0) {
      const file = excel[0];
      formData.append("excel", file, file.name);
    }
    return this.http.post(this.httpUtil.urlUploadGeneric('values'), formData);
  }

  uploadGeneric(genericFile: FileList) {
    const formData: FormData = new FormData();

    if (genericFile.length > 0) {
      const file = genericFile[0];
      formData.append("formData", file, file.name);
    }

    return this.http.post(this.httpUtil.urlUploadGeneric('values'), formData);
  }

}
