import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HOST } from '../entity/config';
import { CreatedEntityDTO, EntityDTO } from '../entity/entity.dto';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {

	constructor(private http: HttpClient) { }

  getAll(): Observable<Array<CreatedEntityDTO>> {
    return this.http.get<CreatedEntityDTO[]>(`${HOST}/program`);
  }

	delete(id: string) {
		return this.http.delete(`${HOST}/program/${id}`)
	}

	create(data: EntityDTO): Observable<CreatedEntityDTO> {
		return this.http.post<CreatedEntityDTO>(HOST + '/program', data)
	}

	update(data: CreatedEntityDTO): Observable<EntityDTO> {
		const { _id } = data;
		return this.http.put<EntityDTO>(HOST + `/program/${_id}`, data)
	}}
