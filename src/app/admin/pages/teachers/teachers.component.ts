import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Injector, OnInit} from '@angular/core';
import { TeacherService } from 'src/app/services/teacher.service';
import { CreateEntityComponent } from '../../components/create-entity/create-entity.component';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CreatedEntityDTO, EntityDTO, EntityType } from 'src/app/entity/entity.dto';
import { switchMap, tap } from 'rxjs/operators';
import { ProgramService } from 'src/app/services/program.service';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.less'],
	changeDetection: ChangeDetectionStrategy.Default
})
export class TeachersComponent implements OnInit {
	teachers = [];
	programs = [];
	
	formData: EntityDTO = {
		name: null,
		description: null,
		seo: {
			description: null,
			keywords: [],
			title: null
		}
	};


  constructor(
		private nzModalService: NzModalService,
		private teacherService: TeacherService,
		private progamService: ProgramService
	) { }

	ngOnInit(): void {
		combineLatest([
			this.progamService.getAll(),
			this.teacherService.getTeachersList()
		]).subscribe(([programs, teachers]) => {
			this.teachers = teachers;
			this.programs = programs;
		})
  }

	deleteTeacher(id: string) {
		this.teacherService.delete(id).pipe(
			tap(d => console.log(d)),
			switchMap(() => this.teacherService.getTeachersList())
		).subscribe(teachers => this.teachers = teachers);
	}

	updateTeacher(data: CreatedEntityDTO) {
		const { _id } = data;
		const dialog = this.nzModalService.create({
			nzTitle: 'Обновить преподователя',
			nzContent: CreateEntityComponent,
			nzWidth: 1200,
			nzFooter: [{
				type: 'primary',
				label: 'Сохранить',
				onClick: () => {
					const data = dialog.componentInstance.getFormValue();
					data.programIds =	data.programIds.filter(t => t.checked === true).map(el => el.id);
					const dataTuUpdate = {...data, _id};
					this.teacherService.update(dataTuUpdate).pipe(
						tap(() => this.nzModalService.closeAll()),
						switchMap(() => this.teacherService.getTeachersList())
					).subscribe(teachers => this.teachers = teachers)
				}
			},
			{
				type: 'link',
				label: 'Отмена',
				onClick: () => {
					this.nzModalService.closeAll()
				}
			}],
			nzComponentParams: {
				data: data,
				type: EntityType.TEACHER,
				listOfEntities: this.prepearingNestedEntities(this.programs, data)
			}
		})
	}

	prepearingNestedEntities(arrOfEntities: CreatedEntityDTO[], edited: CreatedEntityDTO) {
		const { programs } = edited;

		if(!arrOfEntities.length) {
			return arrOfEntities;
		}

		arrOfEntities.forEach(e => {
			if(programs?.some(p => e._id === p._id)) {
				e.checked = true
			} else {
				e.checked = false
			}
		});

		return arrOfEntities;
	}

	createTeacher() {
		const dialog = this.nzModalService.create({
			nzTitle: 'Создать преподователя',
			nzContent: CreateEntityComponent,
			nzWidth: 1200,
			nzFooter: [{
				type: 'primary',
				label: 'Сохранить',
				onClick: () => {
					const data = dialog.componentInstance.getFormValue();
					this.teacherService.create(data).pipe(
						tap(() => this.nzModalService.closeAll()),
						switchMap(() => this.teacherService.getTeachersList())
					).subscribe(teachers => this.teachers = teachers)
				}
			},
			{
				type: 'link',
				label: 'Отмена',
				onClick: () => {
					this.nzModalService.closeAll()
				}
			}],
			nzComponentParams: {
				data: this.formData
			}
		})
	}

}
