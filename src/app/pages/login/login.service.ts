import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) {}

  login(data:any): Observable<any> {
   

    // Envoyer la requête POST au backend Laravel pour l'authentification
    return this.http.post<any>('http://localhost:8000/api/login', data);
  }
}
