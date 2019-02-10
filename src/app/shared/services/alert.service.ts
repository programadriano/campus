import { Injectable } from '@angular/core';
import swal from 'sweetalert2';

@Injectable()
export class AlertService {

  success(title: string, text: string, buttonText: string): Promise<any> {
    return swal({
      title: title,
      text: text,
      type: 'success',
      confirmButtonText: buttonText
    });
  }

  error(title: string, text: string, buttonText: string): Promise<any> {
    return swal({
      title: title,
      text: text,
      type: 'error',
      confirmButtonText: buttonText
    });
  }

  warning(title: string, text: string, buttonText: string): Promise<any> {
    return swal({
      title: title,
      text: text,
      type: 'warning',
      confirmButtonText: buttonText
    });
  }

  info(title: string, text: string, buttonText: string): Promise<any> {
    return swal({
      title: title,
      text: text,
      type: 'info',
      confirmButtonText: buttonText
    });
  }

  question(title: string, text: string, confirmButtonText: string, cancelButtonText: string): Promise<any> {
    return swal({
      title: title,
      text: text,
      type: 'question',
      showCancelButton: true,
      confirmButtonText: confirmButtonText,
      cancelButtonText: cancelButtonText
    });
  }

}
