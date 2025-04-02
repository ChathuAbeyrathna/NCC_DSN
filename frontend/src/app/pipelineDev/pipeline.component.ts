import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pipeline',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div class="container">
      <h2>Add New Project</h2>
      <div class="form-container">
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

        <p *ngIf="successMessage" class="success-message">{{ successMessage }}</p>
      </form>
      </div>
    </div>
  `,
  styles: [`
    .container {
      width: 60%;
      margin: 2rem auto;
      font-family: Arial, sans-serif;
    }  
    .form-container{
      padding: 60px;
      background: #f8f9fa;
      border-radius: 8px;
      box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    }
    h2 {
      color: #333;
      font-size: 35px;
      margin-top: 40px;
      margin-bottom: 30px;
    }
    form {
      display: flex;
      flex-direction: column;
    }
    label {
      margin-top: 10px;
      color: #444;
    }
    input,
    textarea {
      padding: 10px;
      margin-top: 5px;
      border: 1px solid #ccc;
      border-radius: 5px;
      font-size: 14px;
      width: 100%;
    }
    textarea {
      resize: vertical;
      min-height: 80px;
    }
    button {
      margin: 20px auto; 
      padding: 10px 100px; 
      font-size: 16px;
      font-weight: bold;
      color: white;
      background: #4E50BE;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
    button:hover {
      background:rgb(51, 54, 194);
    }
    .success-message {
      color:  #4E50BE;
      font-weight: bold;
      margin-top: 10px;
      text-align: center;
    }
      
    /* Responsive adjustments */
    @media (max-width: 768px) {
      .container {
        width: 80%;
      }
      .form-container {
        padding: 30px;
      }
      h2 {
        font-size: 24px;
      }
      button {
        padding: 10px 30px;
      }
    }

    @media (max-width: 480px) {
      .container {
        width: 80%;
      }
      .form-container {
        padding: 15px;
      }
      h2 {
        font-size: 20px;
      }
      input, textarea {
        font-size: 12px;
        width: 90%;
      }
      button {
        padding: 10px 20px;
        font-size: 14px;
      }
    }
    `]
})
export class PipelineComponent {
  constructor(private http: HttpClient) { }

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

  successMessage: string = '';

  submitForm() {
    this.http.post('http://localhost:3000/projects', this.formData).subscribe(response => {
      console.log('Project submitted:', response);

      this.successMessage = 'Project submitted successfully!';

      this.formData = {
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
    });
  }
}
