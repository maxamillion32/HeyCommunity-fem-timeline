import { NgModule } from '@angular/core';
import { CommonModule } from '../common/common.module';

import { TimelineService } from './services/timeline.service';

import { TimelinePage } from './pages/timeline';
import { TimelineCreatePage } from './pages/timeline-create';
import { TimelineDetailPage } from './pages/timeline-detail';
import { TimelineCommentPage } from './pages/timeline-comment';


@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    TimelinePage,
    TimelineCreatePage,
    TimelineDetailPage,
    TimelineCommentPage,
  ],
  entryComponents: [
    TimelinePage,
    TimelineCreatePage,
    TimelineDetailPage,
    TimelineCommentPage,
  ],
  providers: [
    TimelineService,
  ],
  exports: [
  ],
})
export class TimelineModule {
}
