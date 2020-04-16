import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'joinPipe'
})
export class JoinPipe implements PipeTransform {
	transform(value: any[], ...args: unknown[]): string {
		return value.map((v) => v.ability.name).join(' ');
	}
}
