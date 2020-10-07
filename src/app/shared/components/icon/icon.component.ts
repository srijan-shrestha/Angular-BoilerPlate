import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent implements OnInit {
  @Input() icon: 'trash' | 'edit' | 'gear' | 'settings' | 'user-profile' | 'shield' | 'structure' |
    'card' | 'lock' | 'tick' | 'circle-tick' | 'cross' | 'circle-cross' | 'dropdown' | 'circle-dropdown' |
    'calender' | 'circular-add' | 'info' | 'search' | 'filter' | 'drag' | 'addDivision' | 'addAssistant' |
    'addDepartment' | 'gallery' | 'directory' | 'tiles' | 'tiles-plus' | 'cards' | 'upload' | 'crop' |
    'rotateLeft' | 'rotateRight' | 'folder' | 'save' | 'publish' | 'oval' | 'preview' | 'pencil-edit' |
    'wrong' | 'right' | 'sideRight' | 'sideLeft' | 'toogle' | 'no-circle-toogle' | 'half-gallery' |
    'full-gallery' | 'add' | 'list' | 'grid' | 'notification' | 'galleryFolder' | 'viewAllGallery' |
    'image-icon' | 'toggleDown' | 'toggleUp' | 'upload-icon' | 'page' | 'goals-dot' | 'dashboard' | 'personal-goal' | 'team-goal' |
    'department-goal' | 'book' | 'clipboard' | 'layer' | 'dotMenu' | 'searchNew' | 'bell' | 'arrow' | 'xcross' |
    'reset' | 'dotMenuGray' | 'upload-v2' | 'warning' | 'back-left' | 'book-theme' | 'longArrowRight' | 'downArrow' |
    'dodge-blue-circle-cross' | 'rocket' | 'been-here' | 'band-aid' | 'badge-check' | 'pdf' | 'printer' | 'backspace' | 'slanted-line' |
    'left-arrow-feather' | 'full-large-gallery' | 'half-large-gallery' | 'facebook-outline' | 'dropbox-outline' |
    'google-chrome-outline' | 'instagram-outline' | 'image-gallery' | 'page-view' | 'list-view' | 'trash-bin' |
    'galleryBox' | 'doubleDown' | 'paper-plane' | 'plus' | 'double-down' | 'image-placeholder' | 'photos' | 'folder-minus' |
    'quarter-calender' | 'file-text' | 'paint-plate' | 'user-icon' | 'my-settings' | 'compass' | 'date-calender' | 'bookmark' |
    'award' | 'chart' | 'team' | 'user-check' | 'user-plus' | 'filter-funnel'| 'blueCircularAdd' | 'blueGalary' |
    'sixDots' | 'blue-cross'| 'smile' | 'bulb' |  'brain' |  'chat' | 'crown' | 'diamond' | 'dollar-circle' |
    'percentage' | 'pie-chart'| 'network' | 'cog' | 'hive' | 'key' | 'cross-hair' | 'blue-square' | 'dotted-square' |
    'file-outline' | 'lock-outline' | 'credit-card-outline' | 'paperplane-solid' |
    'star-outline' | 'paypal-outline' | 'eye-on' | 'eye-off' | 'close-frame' | 'question-mark' | 'check-badge'  | 'edit-form' | 'left-arrow'
    | 'octagon-warning' | 'success' | 'circularAdd' | 'circular-yellow-warning' | 'back-slanted-line' | 'info-blue'
  ;
  @Input() size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl' = 'md';
  @Input() type: 'primary' | 'secondary' | 'gray' | 'white' | 'light-gray' | 'success' | 'warning' | 'danger' | 'black';
  @Input() shape: 'regular' | 'rounded';

  constructor() {
  }

  ngOnInit() {
  }

}
