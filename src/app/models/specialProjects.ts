import { MerchanProjects } from 'src/app/models/merchanProjects';
import { Editoria } from "./enum/editoria";
import { MerchanPlain } from './merchanPlain';

export class SpecialProjects {

    public _id?: string;
    public editoria?: Editoria;
    public title?: string;
    public url_movie?: string;
    public description?: string;
    public projectDate?: Date;

    public dateCreated?: Date;
    public dateUpdated?: Date;

    public url_image_destaque: string;
    public url_file_comercialPlain: string;

    public url_file_excel: string;
    public url_file_excel_rede: string;
    public url_file_ppt: string;


    public comercialFormatMerchan: MerchanProjects[];

}
