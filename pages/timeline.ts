import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Timeline } from '../models/timeline.model';

import { AppService } from '../../common/services/app.service';
import { TimelineService } from '../services/timeline.service';

import { TimelineDetailPage } from './timeline-detail';
import { TimelineCreatePage } from './timeline-create';


@Component({
  selector: 'page-timeline',
  templateUrl: 'timeline.html',
})
export class TimelinePage {
  //
  // constructor
  constructor(
    public timelineService: TimelineService,
    public heyApp: AppService,
    public navCtrl: NavController,
  ) {
    console.log('Hey Timeline ~');

    this.timelineService.getTimelinesFromStorage();
  }


  //
  // ion view did enter
  ionViewDidLoad() {
    // get timelines
    this.timelineService.index();
  }


  //
  // goto timeline detail page
  gotoTimelineDetailPage(timeline, index) {
    this.navCtrl.push(TimelineDetailPage, {timeline: timeline, timelineIndex: index});
  }


  //
  // set like for timeline
  setLikeForTimeline(timeline) {
    if (this.heyApp.authService.authOrLogin()) {
      this.timelineService.setLike(timeline)
      .then(newTimeline => {
        timeline.is_like = newTimeline.is_like;
        timeline.like_num = newTimeline.like_num;
      });
    }
  }


  //
  // present timeline create modal
  presentTimelineCreateModal() {
    if (this.heyApp.authService.authOrLogin()) {
      let page = TimelineCreatePage;
      let params = {}
      let callback = function() {
      }

      this.heyApp.utilityComp.presentModal(page, params, callback);
    }
  }


  //
  //
  videoPlay(event) {
    if (event.srcElement.paused) {
      event.srcElement.play();
    } else {
      event.srcElement.pause();
    }
  }


  //
  // Refresh
  doRefresh(refresher) {
    let params: any = {
      id: this.timelineService.timelines[0].id,
    }

    this.timelineService.refresh(params)
    .then(timelines => {
      refresher.complete();
    }, ret => {
      refresher.complete();
    });
  }


  //
  // Infinite
  doInfinite(infiniteScroll) {
    let params: any = {
      id: this.timelineService.timelines[this.timelineService.timelines.length - 1].id,
    }

    this.timelineService.infinite(params)
    .then(timelines => {
      infiniteScroll.complete();
    }, ret => {
      infiniteScroll.complete();
    });
  }
}
