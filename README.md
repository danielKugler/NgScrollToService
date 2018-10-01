# NgScrollToService
Angular 2+ Service for animated scrolling to a position.

```typescript
import { Component, ElementRef } from '@angular/core';
import * as fromServices from './services';

@Component({
	selector: 'app-component.ts',
	template: `
          <div class="container">
            <div class="scroller">
              some long content here
              <button (click)="goTop()">Go to top</button>
            </div>
          </div>`,
	styles: `
        .container {
          width: 300px,
          height: 100px,
          overflow: hidden
        }
        .container .scroller {
          width: 100%,
          height: 1000px;
        }`
})
export class AppComponent {

  constructor(
    private element: ElementRef,
    private scrollService: fromServices.ScrollToService
    ) {}
  
  toTop() {
    this.scrollService
      .scrollTo({element: this.element.querySelector('.scroller'), to: 0, duration: 1200})
        .then(() =>
          console.log('finished scrolling))
  }
}
```
