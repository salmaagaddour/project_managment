import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
@Injectable({
  providedIn: 'root'
})
export class ProjectService {

 private apiUrl = 'http://localhost:8000/api/projects'; 

  constructor(private http: HttpClient) {}

  getProjects() {
    return this.http.get(this.apiUrl);
  }
  addProject(data: any): Observable<any> {
    return this.http.post<any>('http://localhost:8000/api/addProject', data);
  }
  getProjectById(id: string): Observable<any> {
    const url = `http://localhost:8000/api/project/${id}`; // Remplacez "url_de_votre_api" par l'URL réelle de votre API
    return this.http.get(url);
  }

  NewProjects() {
    return this.http.get<number>('http://localhost:8000/api/newprojects');
  }
  finishedProjects() {
    return this.http.get<number>('http://localhost:8000/api/finishedprojects');
  }
  Projectprog() {
    return this.http.get<number>('http://localhost:8000/api/projectsprog');
  }
  updateProject(id: number, updatedProjectData: any): Observable<any> {
    const updateUrl = `http://localhost:8000/api/projects/${id}`; // Assurez-vous d'ajuster l'URL selon votre API

    return this.http.put(updateUrl, updatedProjectData);
  }
  getProjectTasks(projectId: number): Observable<any> {
    return this.http.get<any>(`http://localhost:8000/api/projects/${projectId}/tasks`);
  }
  getRoadmapTasks(projectId: number): Observable<any> {
    return this.http.get<any>(`http://localhost:8000/api/projects/${projectId}/roadmap/tasks`);
  }
  
  getTaskreelTasks(taskId: number): Observable<any> {
    return this.http.get<any>(`http://localhost:8000/api/projects/${taskId}/taskreel/tasks`);
  }
  addTask(taskData: any): Observable<any> {
    return this.http.post<any>(`http://localhost:8000/api/addtask`, taskData);
  }

  addRoadmap(roadmapData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add-roadmap`, roadmapData);
  }
  deleteTask(taskId: number): Observable<any> {
    return this.http.delete<any>(`http://localhost:8000/api/deleteTask/${taskId}`);
  }
  getTaskIdByNameAndProject(projectId: number, taskName: string): Observable<number> {
    const url = `http://localhost:8000/api/tasks/get-task-id-by-name/${projectId}/${taskName}`;
    return this.http.get<number>(url);
  }
  addTaskreel(roadmapData: any,projectId: number,name:string): Observable<any> {
    return this.http.post<any>(`http://localhost:8000/api/tasks/add-taskreel/${projectId}/${name}`, roadmapData);
  }
  deleteTaskreel(taskId: number): Observable<any> {
    return this.http.delete<any>(`http://localhost:8000/api/deleteTaskreel/${taskId}`);
  }
  getTaskreelIdByTaskId(taskId: number): Observable<number> {
    const url = `http://localhost:8000/api/getTaskreelIdByTaskId/${taskId}`;
    return this.http.get<number>(url);
  }
  getRessource(taskId: number){
    return this.http.get(`http://localhost:8000/api/ressourcetask/${taskId}`);
  }
  getload(taskId: number){
    return this.http.get(`http://localhost:8000/api/getload/${taskId}`);
  }
  addcost(roadmapData: any): Observable<any> {
    return this.http.post<any>(`http://localhost:8000/api/addcost`, roadmapData);
  }
  addload(roadmapData: any): Observable<any> {
    return this.http.post<any>(`http://localhost:8000/api/addload`, roadmapData);
  }
  getloadByMonth(year: number, month: number): Observable<any> {
    return this.http.get<any>(`http://localhost:8000/api/total-load/${year}/${month}`);
  }

  getcostByMonth(year: number, month: number): Observable<any> {
    return this.http.get<any>(`http://localhost:8000/api/total-cost/${year}/${month}`);
  }
}
