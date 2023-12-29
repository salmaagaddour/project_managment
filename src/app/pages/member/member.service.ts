import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private http: HttpClient) { }
  getMembers() {
    return this.http.get('http://localhost:8000/api/members');
  }
  getRessource() {
    return this.http.get('http://localhost:8000/api/ressources');
  }
  addmember(data: any): Observable<any> {
    return this.http.post<any>('http://localhost:8000/api/addmember', data);
  }
}
