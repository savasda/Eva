/**
 * @EntityDTO - схема для создания преподователя или программы
 */
export interface EntityDTO {
	name: string;
	description: string;
	seo: SEO;
	programs?: Array<CreatedEntityDTO>;
	teachers?: Array<CreatedEntityDTO>;
}
export interface CreatedEntityDTO extends EntityDTO  {
	_id: string;
	checked?: boolean
}
export interface SEO {
	title: string,
	description: string,
	keywords: string[]
}

export enum EntityType {
	TEACHER,
	PROGRAM
}