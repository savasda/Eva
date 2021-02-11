import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HOST } from '../entity/config';
import { CreatedEntityDTO, EntityDTO } from '../entity/entity.dto';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(private http: HttpClient) { }

  getTeachersList(): Observable<Array<CreatedEntityDTO>> {
    return this.http.get<CreatedEntityDTO[]>(`${HOST}/teacher`);
  }

	delete(id: string) {
		return this.http.delete(`${HOST}/teacher/${id}`)
	}

	create(data: EntityDTO): Observable<CreatedEntityDTO> {
		return this.http.post<CreatedEntityDTO>(HOST + '/teacher', data)
	}

	update(data: CreatedEntityDTO): Observable<EntityDTO> {
		const { _id } = data;
		return this.http.put<EntityDTO>(HOST + `/teacher/${_id}`, data)
	}
}
