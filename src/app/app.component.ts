import { Component } from '@angular/core';
import { FORM_STEPS } from './form-steps';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  steps: any = FORM_STEPS
  topics: Array<Topics> = [
    {
      id: 1,
      label: "Software Development",
      enabled: false
    },
    {
      id: 2,
      label: "User Experience",
      enabled: false
    },
    {
      id: 3,
      label: "Graphic Design",
      enabled: false
    }
  ]

  step = 1
  submitted: boolean = false
  isSecondStepError: boolean = false

  stepForm: FormGroup = new FormGroup({
    name: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required, Validators.email]),
  })

  get nameStepForm() {
    return this.stepForm.controls['name']
  }

  get emailStepForm() {
    return this.stepForm.controls['email']
  }

  onContinue() {
    // TODO: CHECK CURRENT FORM
    switch (this.step) {
      case 1: this.checkFirstStep(); break;
      case 2: this.checkSecondStep(); break;
    }

  }

  changeStep() {
    this.steps[this.step].done = true
    this.step++
  }

  checkFirstStep() {
    this.submitted = true
    if (this.stepForm.valid) this.changeStep()
  }

  checkSecondStep() {
    const topicsEnabled = this.topics.filter(t => t.enabled)

    if (topicsEnabled.length > 0) {
      this.isSecondStepError = false
      this.changeStep()
    } else this.isSecondStepError = true
  }

  onItemSelected(id: number) {
    const topic = this.topics.find(t => t.id === id)!!
    topic.enabled = !topic.enabled
  }

  getEnabledTopics(): Array<Topics> {
    return this.topics.filter(t => t.enabled)
  }
}


export interface Topics {
  id: number;
  label: string;
  enabled: boolean;
}
