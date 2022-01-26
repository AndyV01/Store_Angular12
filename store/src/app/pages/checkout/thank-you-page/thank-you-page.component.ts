import { Component } from '@angular/core';

@Component({
  selector: 'app-thank-you-page',
  template: `<div class="container">
  <h1 class="title">Thank you</h1>
  <p class="content">
      Your order has been successfully processed.
  </p>
  <span>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illum nobis labore, magnam facere est fugit inventore
      consectetur magni nisi, corporis necessitatibus iste eligendi rerum voluptas ab molestiae accusantium. Alias,
      expedita.
  </span>
</div>
`,
  styleUrls: ['./thank-you-page.component.scss']
})
export class ThankYouPageComponent{
}
