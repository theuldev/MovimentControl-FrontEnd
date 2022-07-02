import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Client } from "src/app/shared/models/Client";

@Injectable({
    providedIn:'root'
})
export class ClientService
{
constructor(private http : HttpClient){ }

 urlBase = `${environment.UrlMain}movimentcontrol`; 



get():Observable<Client[]>{

    return this.http.get<Client[]>(`${this.urlBase}`);
};
getById(id: any){

    return this.http.get<Client[]>(`${this.urlBase}/${id}`)
}

post(client : Client)
{
    return this.http.post(`${this.urlBase}`,client);
} 
put(id : number,client : Client)
{
    return this.http.put(`${this.urlBase}/${id}`,client);

}
delete(id : number)
{
    return this.http.delete(`${this.urlBase}/${id}`);
}
}
