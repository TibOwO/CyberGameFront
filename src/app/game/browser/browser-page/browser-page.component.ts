import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BrowserService, Page } from '../../browser.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'browser-page',
  standalone: true,
  templateUrl: './browser-page.component.html',
  styleUrls: ['./browser-page.component.css'],
  imports: [CommonModule],
})
export class BrowserPageComponent {
  page?: Page;
  showPopup: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private browserService: BrowserService
  ) {}

  catImages: string[] = [];

  ngOnInit(): void {
    const pageId = this.route.snapshot.paramMap.get('pageId');
    console.log(pageId);
    if (pageId) {
      this.browserService.getPageById(parseInt(pageId)).subscribe((page) => {
        this.page = page;
      });
    }
    if (this.page?.id === 5) {
      for (let i = 1; i <= 12; i++) {
        this.catImages.push(`assets/browserpic/chat_browser/chat${i}.jpg`);
      }
    }
  }

  returnToBrowser(): void {
    this.router.navigate(['/game/browser']);
  }

  addPoint(): void {
    this.showPopup = true;
  }

  closePopup(): void {
    this.showPopup = false;
  }

}


