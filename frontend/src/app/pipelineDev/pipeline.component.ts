import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pipeline',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="container">
      <h2>Projects</h2>
      <form (ngSubmit)="submitForm()">
        <label>Project Title:</label>
        <input type="text" [(ngModel)]="formData.projectTitle" name="projectTitle" required />

        <label>Project Description:</label>
        <textarea [(ngModel)]="formData.projectDescription" name="projectDescription"></textarea>

        <label>Accredited Entity:</label>
        <input type="text" [(ngModel)]="formData.accreditedEntity" name="accreditedEntity" />

        <label>Implementing Agencies:</label>
        <input type="text" [(ngModel)]="formData.implementingAgencies" name="implementingAgencies" />

        <label>Project Duration:</label>
        <input type="text" [(ngModel)]="formData.projectDuration" name="projectDuration" />

        <label>Project Location:</label>
        <input type="text" [(ngModel)]="formData.projectLocation" name="projectLocation" />

        <label>Sector:</label>
        <input type="text" [(ngModel)]="formData.sector" name="sector" />

        <label>Focus:</label>
        <input type="text" [(ngModel)]="formData.focus" name="focus" />

        <label>GCF Result Areas:</label>
        <input type="text" [(ngModel)]="formData.gcfResultAreas" name="gcfResultAreas" />

        <label>Indicative GCF Financing:</label>
        <input type="number" [(ngModel)]="formData.gcfFinancing" name="gcfFinancing" />

        <label>Indicative Co-Financing:</label>
        <input type="number" [(ngModel)]="formData.coFinancing" name="coFinancing" />

        <label>Indicative Overall Financing:</label>
        <input type="number" [(ngModel)]="formData.overallFinancing" name="overallFinancing" />

        <label>Financing Instruments:</label>
        <input type="text" [(ngModel)]="formData.financingInstruments" name="financingInstruments" />

        <label>Status:</label>
        <input type="text" [(ngModel)]="formData.status" name="status" />

        <label>Contact Information:</label>
        <input type="text" [(ngModel)]="formData.contactInfo" name="contactInfo" />

        <label>Stage 1 Score:</label>
        <input type="number" [(ngModel)]="formData.stage1Score" name="stage1Score" />

        <label>Stage 2 Score:</label>
        <input type="number" [(ngModel)]="formData.stage2Score" name="stage2Score" />

        <button type="submit">Submit</button>
      </form>
    </div>
  `,
  styleUrls: ['./pipeline.component.css']
})
export class PipelineComponent {
  formData = {
    projectTitle: '',
    projectDescription: '',
    accreditedEntity: '',
    implementingAgencies: '',
    projectDuration: '',
    projectLocation: '',
    sector: '',
    focus: '',
    gcfResultAreas: '',
    gcfFinancing: null,
    coFinancing: null,
    overallFinancing: null,
    financingInstruments: '',
    status: '',
    contactInfo: '',
    stage1Score: null,
    stage2Score: null
  };

  submitForm() {
    console.log('Form Submitted:', this.formData);
  }
}
