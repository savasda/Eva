import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CreatedEntityDTO, EntityDTO, EntityType } from 'src/app/entity/entity.dto';



@Component({
  selector: 'app-create-entity',
  templateUrl: './create-entity.component.html',
  styleUrls: ['./create-entity.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateEntityComponent implements OnInit {
	public Editor = ClassicEditor;
	entityForm!: FormGroup;
	data: EntityDTO;
	listOfEntities: CreatedEntityDTO[] = [];
	type: EntityType;


	constructor(private fb: FormBuilder, private cd: ChangeDetectorRef) {

	}
	ngOnInit(): void {
		this.createForm(this.data, this.listOfEntities);
	}

	get seo() {
		return this.entityForm.controls.seo['controls']
	}

	get programIds() {
		return this.entityForm.controls.programIds
	}

	get teacherIds() {
		return this.entityForm.controls.teacherIds
	}

	get header() {
		return this.type === EntityType.PROGRAM ? 'Добавть программу которую ведет преподователь' : 'Добавить преподователя который ведет программу';
	}

	createForm(data: EntityDTO, listOfEntities: CreatedEntityDTO[]) {
		const { name, description, seo} = data;
		this.entityForm = this.fb.group({
			name: [name, [Validators.required]],
			description: [description, [Validators.required]],
			teacherIds: this.fb.array(this.type === EntityType.PROGRAM ? listOfEntities.map(el => this.fb.group({
				id: el._id,
				checked: el.checked,
				name: el.name
			})): []),
			programIds: this.fb.array(this.type === EntityType.TEACHER ? listOfEntities.map(el => this.fb.group({
				id: el._id,
				checked: el.checked,
				name: el.name
			})): []),
			seo: this.fb.group({
				title: [seo.title, [Validators.required]],
				description: [seo.description, [Validators.required]],
				keywords: !seo.keywords?.length ? '' : seo.keywords.join(',')
			})
		});
	}

	getFormValue() {
		this.entityForm.setErrors({required: true})

		for (const i in this.entityForm.controls) {
			const group: any = this.entityForm.controls[i];
      this.entityForm.controls[i].markAsDirty();
      this.entityForm.controls[i].updateValueAndValidity();
			if(group?.controls) {
				for(const z in group?.controls) {
					group.controls[z].markAsDirty();
					group.controls[z].updateValueAndValidity();
				}
			};
    }

		if(this.entityForm.valid) {
			const value = this.entityForm.value;
			value.seo.keywords = value.seo?.keywords.replace(/\s/g, '').split(',') || [];
			return value
		}

	}


}
