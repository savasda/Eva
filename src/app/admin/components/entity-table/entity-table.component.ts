import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EntityDTO } from 'src/app/entity/entity.dto';

@Component({
  selector: 'entity-table',
  templateUrl: './entity-table.component.html',
  styleUrls: ['./entity-table.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntityTableComponent {
	@Input() entities: EntityDTO[];
	@Output() createEntity = new EventEmitter();
	@Output() deleteEntity = new EventEmitter(); 
	@Output() updateEntity = new EventEmitter(); 


	onCreate() {
		this.createEntity.next();
	}

	delete(id: string) {
		this.deleteEntity.next(id);
	}

	update(data: EntityDTO) {
		this.updateEntity.next(data)
	}
}
