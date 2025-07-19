import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-fee',
  templateUrl: './fee.component.html',
  styleUrls: ['./fee.component.css']
})
export class FeeComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    this.setupTabNavigation();
    this.setupAddComponent();
    this.setupSaveStructure();
    this.setupReminders();
    this.setupPaymentAndReceipts();
    
    const inputElement = document.getElementById('feeSearchInput') as HTMLInputElement;
    if (inputElement) {
      inputElement.addEventListener('keyup', () => this.searchFeeStructure());
    }
  }

  searchFeeStructure(): void {
    const inputElement = document.getElementById('feeSearchInput') as HTMLInputElement;
    const resultDiv = document.getElementById('search-result');
    if (!inputElement) return;

    const searchValue = inputElement.value.toLowerCase();
    const rows = document.querySelectorAll<HTMLTableRowElement>('table tbody tr');
    let found = false;

    rows.forEach(row => {
      const rowText = row.innerText.toLowerCase();
      const match = rowText.includes(searchValue);
      row.style.display = match ? '' : 'none';

      if (match && resultDiv) {
        found = true;
        const cols = row.querySelectorAll('td');
        if (cols.length >= 2) {
          const component = cols[0].textContent?.trim();
          const amount = cols[1].textContent?.trim();
          resultDiv.innerHTML = `🔍 Matched Id: <strong>${component}</strong> - name: <strong>${amount}</strong>`;
        }
      }
    });

    if (!found && resultDiv) {
      resultDiv.innerHTML = '❌ No matching component found.';
    }
  }

  setupTabNavigation(): void {
    document.querySelectorAll('.nav-tabs').forEach(tabGroup => {
      const tabs = tabGroup.querySelectorAll('.nav-tab');
      tabs.forEach(tab => {
        tab.addEventListener('click', () => {
          tabs.forEach(t => t.classList.remove('active'));
          tab.classList.add('active');
        });
      });
    });
  }

  setupAddComponent(): void {
    document.querySelectorAll('.btn-primary').forEach(button => {
      if (button.textContent?.includes('Add Component')) {
        button.addEventListener('click', () => {
          const tableBody = button.closest('.mockup-container')?.querySelector('tbody');
          if (!tableBody) return;

          const newRow = document.createElement('tr');
          newRow.innerHTML = `
            <td><input type="text" class="form-control" placeholder="Component Name"></td>
            <td><input type="number" class="form-control" placeholder="Amount"></td>
            <td><button class="btn btn-danger" style="padding: 5px 10px; font-size: 12px;">Remove</button></td>
          `;
          tableBody.appendChild(newRow);
        });
      }
    });

    document.addEventListener('click', (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains('btn-danger') && target.textContent?.includes('Remove')) {
        const row = target.closest('tr');
        row?.remove();
      }
    });
  }

  setupSaveStructure(): void {
    document.querySelectorAll('.btn-success').forEach(button => {
      if (button.textContent?.includes('Save Structure')) {
        button.addEventListener('click', () => {
          const tableBody = button.closest('.mockup-container')?.querySelector('tbody');
          if (!tableBody) return;

          const rows = tableBody.querySelectorAll('tr');
          rows.forEach(row => {
            const nameInput = row.querySelector('input[type="text"]') as HTMLInputElement;
            const amountInput = row.querySelector('input[type="number"]') as HTMLInputElement;

            if (nameInput && amountInput) {
              const name = nameInput.value.trim();
              const amount = amountInput.value.trim();

              if (name && amount) {
                row.innerHTML = `
                  <td>${name}</td>
                  <td>₹${parseInt(amount).toLocaleString()}</td>
                  <td><button class="btn btn-danger" style="padding: 5px 10px; font-size: 12px;">Remove</button></td>
                `;
              } else {
                alert('Please fill in all component details.');
              }
            }
          });

          alert('Fee Structure Saved!');
        });
      }
    });
  }

  setupReminders(): void {
    document.querySelectorAll('.btn-primary').forEach(button => {
      if (button.textContent?.includes('Send Reminder')) {
        button.addEventListener('click', () => {
          alert('Reminder sent to student.');
        });
      }

      if (button.textContent?.includes('Send Bulk Reminders')) {
        button.addEventListener('click', () => {
          alert('Bulk reminders sent!');
        });
      }
    });

    document.querySelectorAll('.btn-success').forEach(button => {
      if (button.textContent?.includes('Generate Report')) {
        button.addEventListener('click', () => {
          alert('Report generated successfully.');
        });
      }
    });
  }

  setupPaymentAndReceipts(): void {
    document.querySelectorAll('.btn-primary').forEach(button => {
      if (button.textContent?.includes('Pay Now')) {
        button.addEventListener('click', () => {
          const qrModal = document.getElementById('qr-modal');
          if (qrModal) qrModal.style.display = 'flex';
        });
      }

      if (button.textContent?.includes('Proceed to Payment')) {
        button.addEventListener('click', () => {
          alert('Redirecting to payment gateway...');
        });
      }
    });

    const closeBtn = document.getElementById('close-qr');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        const qrModal = document.getElementById('qr-modal');
        if (qrModal) qrModal.style.display = 'none';
      });
    }

    document.querySelectorAll('.btn-success').forEach(button => {
      if (button.textContent?.includes('Download Receipt')) {
        button.addEventListener('click', () => {
          alert('Receipt downloaded (mock)');
        });
      }
    });
  }
}
