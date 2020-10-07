import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-custom-rating',
  templateUrl: './custom-rating.component.html',
  styleUrls: ['./custom-rating.component.scss']
})
export class CustomRatingComponent implements OnInit {
  toggle: boolean = false;
  constructor(private elem: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
  }
  changeToggle(event){
    const elements = this.elem.nativeElement.querySelectorAll('.circle');
    elements.forEach(el => {
      this.renderer.removeClass(el, 'circle__selected');
    });
    event.target.className = 'circle circle__selected';
  }
}
