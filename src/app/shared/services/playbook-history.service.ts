import { Injectable } from '@angular/core';
import { PlayBook } from '../models/playbook.model';
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PlayBookHistoryService {

  currentPlaybook: PlayBook = null;
  dataUndoArray: Array<PlayBook> = [];
  dataRedoArray: Array<PlayBook> = [];
  undoLimit = 5;

  historyStatus: any = {enableUndo: false, enableRedo: false};

  private statusesSource = new BehaviorSubject<any>([]);
  statuses = this.statusesSource.asObservable();

  constructor() {
  }

  setPlaybookData(playBook: PlayBook) {
    this.dataRedoArray = [];
    this.historyStatus.enableRedo = false;
    if (this.currentPlaybook === null) {
      this.currentPlaybook = playBook;
    } else {
      if (this.dataUndoArray.length === this.undoLimit) {
        this.dataUndoArray.reverse().pop();
        this.dataUndoArray.reverse();
      }
      this.dataUndoArray.push(this.currentPlaybook);
      this.currentPlaybook = playBook;
      this.historyStatus.enableUndo = true;
    }
    this.statusesSource.next(this.historyStatus);
  }

  undo() {
    console.log('undo action on progress');
    this.historyStatus.enableRedo = true;
    if (this.dataUndoArray.length !== 0) {
      this.dataRedoArray.push(this.currentPlaybook);
      this.currentPlaybook = this.dataUndoArray.pop();
      if (this.dataUndoArray.length === 0) {
        this.historyStatus.enableUndo = false;
      }
      this.statusesSource.next(this.historyStatus);
      // this.editor.updatePlaybook(this.currentPlaybook);
      return this.currentPlaybook;
    }
  }

  redo() {
    console.log('redo action on progress');
    if (this.dataRedoArray.length !== 0) {
      this.dataUndoArray.push(this.currentPlaybook);
      this.currentPlaybook = this.dataRedoArray.pop();
      if (this.dataRedoArray.length === 0) {
        this.historyStatus.enableRedo = false;
      }
    }

    if (this.dataUndoArray.length > 0) {
      this.historyStatus.enableUndo = true;
    } else {
      this.historyStatus.enableRedo = false;
    }
    this.statusesSource.next(this.historyStatus);
    return this.currentPlaybook;
  }

}
