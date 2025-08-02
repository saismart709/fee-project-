import { Component, AfterViewInit } from '@angular/core';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-fee',
  templateUrl: './fee.component.html',
  styleUrls: ['./fee.component.css']
})
export class FeeComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    // Optional: logic after view init
  }

  generateReceipt(): void {
    const receiptNo = (document.getElementById('receiptNo') as HTMLInputElement).value;
    const date = (document.getElementById('date') as HTMLInputElement).value;
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const rollNo = (document.getElementById('rollNo') as HTMLInputElement).value;
    const course = (document.getElementById('course') as HTMLInputElement).value;
    const feeType = (document.getElementById('feeType') as HTMLInputElement).value;
    const amount = parseFloat((document.getElementById('amount') as HTMLInputElement).value).toFixed(2);
    const first = (document.getElementById('first') as HTMLInputElement).value;
    const second = (document.getElementById('second') as HTMLInputElement).value;
    const third = (document.getElementById('third') as HTMLInputElement).value;

    const receiptDiv = document.getElementById('receiptArea') as HTMLElement;
    receiptDiv.style.display = 'block';

    receiptDiv.innerHTML = `
      <h3>IDEAL COLLEGE OF ARTS & SCIENCES(A)<br>VIDYUT NAGAR, KAKINADA - 533003</h3>
      <h3>FEE RECEIPT</h3>
      <p><span class="highlight">Date:</span> ${date}</p>
      <p><span class="highlight">Receipt No:</span> ${receiptNo}</p>
      <p><span class="highlight">Name:</span> ${name}</p>
      <p><span class="highlight">Roll No:</span> ${rollNo}</p>
      <p><span class="highlight">Course:</span> ${course}</p>
      <p><span class="highlight">Fee Type:</span> ${feeType}</p>
      <p><span class="highlight">Amount:</span> ₹${amount}</p>
      <hr>
      <p><span class="highlight">TOTAL:</span> ₹${amount}</p>
      <p><span class="highlight">Rupees:</span> Ten Thousand Only</p>
      <p><span class="highlight">Balance Amount</span> &nbsp;&nbsp; First: ₹${first} &nbsp;&nbsp; Second: ₹${second} &nbsp;&nbsp; Third: ₹${third}</p>
      <p style="text-align:right;"><strong>Signature</strong></p>
      <p style="text-align:center;">Page 1</p>
    `;
  }

  downloadReceipt(): void {
    const receiptDiv = document.getElementById('receiptArea') as HTMLElement;
    if (!receiptDiv || receiptDiv.style.display === 'none') {
      alert('Please generate the receipt first.');
      return;
    }

    html2canvas(receiptDiv).then((canvas: HTMLCanvasElement) => {
      const link = document.createElement('a');
      link.download = 'fee_receipt.png';
      link.href = canvas.toDataURL();
      link.click();
    });
  }
}
