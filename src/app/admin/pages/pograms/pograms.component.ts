import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { combineLatest } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { EntityDTO, CreatedEntityDTO, EntityType } from 'src/app/entity/entity.dto';
import { ProgramService } from 'src/app/services/program.service';
import { TeacherService } from 'src/app/services/teacher.service';
import { CreateEntityComponent } from '../../components/create-entity/create-entity.component';

@Component({
  selector: 'app-pograms',
  templateUrl: './pograms.component.html',
  styleUrls: ['./pograms.component.less']
})
export class PogramsComponent implements OnInit {
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
		private progamService: ProgramService,
		private teacherService: TeacherService
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
		this.progamService.delete(id).pipe(
			switchMap(() => this.progamService.getAll())
		).subscribe(programs => this.programs = programs);
	}

	updateTeacher(data: CreatedEntityDTO) {
		const { _id } = data;
		console.log(data)
		const dialog = this.nzModalService.create({
			nzTitle: 'Обновить программу',
			nzContent: CreateEntityComponent,
			nzWidth: 1200,
			nzFooter: [{
				type: 'primary',
				label: 'Сохранить',
				onClick: () => {
					const data = dialog.componentInstance.getFormValue();
					data.teacherIds = data.teacherIds.filter(t => t.checked === true).map(el => el.id);
					const dataTuUpdate = {...data, _id};
					this.progamService.update(dataTuUpdate).pipe(
						tap(() => this.nzModalService.closeAll()),
						switchMap(() => this.progamService.getAll())
					).subscribe(programs => this.programs = programs)
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
				type: EntityType.PROGRAM,
				listOfEntities: this.prepearingNestedEntities(this.teachers, data)
			}
		})
	}

	prepearingNestedEntities(arrOfEntities: CreatedEntityDTO[], edited: CreatedEntityDTO) {
		const { teachers } = edited;

		if(!arrOfEntities.length) {
			return arrOfEntities;
		}

		arrOfEntities.forEach(e => {
			if(teachers?.some(p => e._id === p._id)) {
				e.checked = true
			} else {
				e.checked = false
			}
		});

		return arrOfEntities;
	}

	createTeacher() {
		const dialog = this.nzModalService.create({
			nzTitle: 'Создать программу',
			nzContent: CreateEntityComponent,
			nzWidth: 1200,
			nzFooter: [{
				type: 'primary',
				label: 'Сохранить',
				onClick: () => {
					const data = dialog.componentInstance.getFormValue();
					this.progamService.create(data).pipe(
						tap(() => this.nzModalService.closeAll()),
						switchMap(() => this.progamService.getAll())
					).subscribe(programs => this.programs = programs)
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
