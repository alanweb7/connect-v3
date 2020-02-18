import { NgModule } from '@angular/core';
import { ProgressBarComponent } from './progress-bar/progress-bar';
import { ExpandableComponent } from './expandable/expandable';
@NgModule({
	declarations: [ProgressBarComponent,
    ExpandableComponent],
	imports: [],
	exports: [ProgressBarComponent,
    ExpandableComponent]
})
export class ComponentsModule {}
