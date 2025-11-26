document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded - initializing app...');
  
  // Tab switching
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', function() {
      console.log('Tab clicked:', this.textContent);
      document.querySelector('.tab.active').classList.remove('active');
      this.classList.add('active');
      document.querySelectorAll('.tab-content').forEach(c => c.classList.add('hidden'));
      document.getElementById(this.dataset.target).classList.remove('hidden');
    });
  });

  // View buttons
  document.querySelectorAll('.view-btn').forEach(button => {
    button.addEventListener('click', function() {
      console.log('View button clicked');
      const row = this.closest('tr');
      if (row) {
        fillModalWithData(row);
        document.getElementById('disputeModal').classList.remove('hidden');
      }
    });
  });

  function fillModalWithData(row) {
    const cells = row.cells;
    console.log('Filling modal with row data:', cells[0].textContent);
    
    const disputeId = cells[0].textContent;
    const customer = cells[1].textContent;
    const disputeTitle = cells[2].textContent;
    const createdDate = cells[3].textContent;
    const openDays = cells[4].innerHTML;
    const amount = cells[5].textContent;
    const disputeType = cells[6].innerHTML;
    const status = cells[7].innerHTML;
    const invoices = cells[8].textContent;
    const disputeOwner = cells[9].textContent;

    document.getElementById('modalDisputeTitle').textContent = `${disputeId} - ${disputeTitle}`;
    document.getElementById('modalCustomer').textContent = customer;
    document.getElementById('modalCreatedDate').textContent = createdDate;
    document.getElementById('modalInvoices').textContent = invoices;
    document.getElementById('modalAmount').textContent = amount;
    document.getElementById('modalOpenDays').innerHTML = openDays;
    document.getElementById('modalOwner').textContent = disputeOwner;
    document.getElementById('modalType').innerHTML = disputeType;
    document.getElementById('modalStatus').innerHTML = status;

    updateDescription(disputeType, disputeTitle);
  }

  function updateDescription(disputeTypeHTML, disputeTitle) {
    const descriptionBox = document.getElementById('modalDescription');
    const timestamp = document.getElementById('modalTimestamp');
    
    let type = 'General';
    if (disputeTypeHTML.includes('Rate Discrepancy')) type = 'Rate Discrepancy';
    else if (disputeTypeHTML.includes('Go Live Date')) type = 'Go Live Date';
    else if (disputeTypeHTML.includes('Setup Fee')) type = 'Setup Fee';
    else if (disputeTypeHTML.includes('Duplicate Charge')) type = 'Duplicate Charge';
    else if (disputeTypeHTML.includes('Churn from Sales')) type = 'Churn from Sales';

    const descriptions = {
      'Rate Discrepancy': `Customer claims that the rate applied differs from what was agreed in the contract. Sales team needs to verify the agreed rate and provide documentation for ${disputeTitle}.`,
      'Go Live Date': `Customer disputes the go-live date mentioned in the invoice. Project management team needs to confirm the actual service activation date for ${disputeTitle}.`,
      'Setup Fee': `Customer questions the setup fee charges. Implementation team needs to provide breakdown of setup services rendered for ${disputeTitle}.`,
      'Duplicate Charge': `Customer reports duplicate billing for the same service period. Billing team needs to verify and confirm if this is a duplicate charge for ${disputeTitle}.`,
      'Churn from Sales': `Customer claims they had already churned before the billing period. Sales and retention teams need to verify churn date and contract terms for ${disputeTitle}.`
    };

    descriptionBox.textContent = descriptions[type] || `Dispute details for ${disputeTitle}. Team needs to investigate and resolve the issue.`;
    
    const now = new Date();
    timestamp.textContent = `${now.toLocaleDateString()}, ${now.toLocaleTimeString()}`;
  }

  // Close modal functions
  document.querySelector('.modal-close').addEventListener('click', function() {
    document.getElementById('disputeModal').classList.add('hidden');
  });
  
  document.querySelector('.close-btn').addEventListener('click', function() {
    document.getElementById('disputeModal').classList.add('hidden');
  });

  // Click outside to close
  document.getElementById('disputeModal').addEventListener('click', function(e) {
    if (e.target.id === 'disputeModal') {
      document.getElementById('disputeModal').classList.add('hidden');
    }
  });

  // Modal action buttons
  document.querySelector('.assign-btn').addEventListener('click', function() {
    alert('Task assigned successfully!');
  });

  document.querySelector('.add-btn').addEventListener('click', function() {
    const comment = document.querySelector('.comment-box textarea').value;
    if (comment.trim()) {
      alert(`Comment added: "${comment}"`);
      document.querySelector('.comment-box textarea').value = '';
    } else {
      alert('Please enter a comment first!');
    }
  });

  document.querySelector('.email-btn').addEventListener('click', function() {
    alert('Email composer would open for the customer!');
  });

  document.querySelector('.close-mark').addEventListener('click', function() {
    if (confirm('Are you sure you want to mark this dispute as closed?')) {
      alert('Dispute marked as closed!');
      document.getElementById('disputeModal').classList.add('hidden');
    }
  });

  // Top action buttons
  document.querySelector('.export-btn').addEventListener('click', function() {
    alert('Export functionality triggered!');
  });

  document.querySelector('.filter-btn').addEventListener('click', function() {
    alert('Filter dialog would open here!');
  });

  document.querySelector('.date-btn').addEventListener('click', function() {
    alert('Date range picker would open here!');
  });

  // Create dispute button
  document.querySelector('.create-dispute').addEventListener('click', function() {
    alert('Create Dispute form would open here!');
  });

  // Search functionality
  document.querySelector('.search-box').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      alert(`Searching for: "${this.value}"`);
    }
  });

  console.log('All event listeners attached successfully!');
});