import { Directive, ElementRef, Renderer2, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective {
  @Input() appHighlight: string = 'rgba(255, 255, 0, 0.3)';
  
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.setBoxShadow(`0 10px 20px ${this.appHighlight}`);
    this.setTransform('scale(1.02)');
    this.setZIndex('10');
    this.setTransition('all 0.3s ease');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.setBoxShadow('none');
    this.setTransform('scale(1)');
    this.setZIndex('1');
  }

  private setBoxShadow(value: string) {
    this.renderer.setStyle(this.el.nativeElement, 'box-shadow', value);
  }

  private setTransform(value: string) {
    this.renderer.setStyle(this.el.nativeElement, 'transform', value);
  }

  private setZIndex(value: string) {
    this.renderer.setStyle(this.el.nativeElement, 'z-index', value);
  }

  private setTransition(value: string) {
    this.renderer.setStyle(this.el.nativeElement, 'transition', value);
  }
}