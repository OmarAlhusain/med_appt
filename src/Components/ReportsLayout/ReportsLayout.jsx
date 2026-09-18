import './ReportsLayout.css';

const ReportsLayout = () => {
  const reportPath = '/patient_report.pdf';

  const handleViewReport = () => {
    window.open(reportPath, '_blank', 'noopener,noreferrer');
  };

  return (
    <main className="reports-page">
      <section className="reports-container">
        <div className="reports-heading">
          <span>Medical documents</span>
          <h1>Your Reports</h1>
          <p>
            View or download your available medical report and prescription
            details.
          </p>
        </div>

        <article className="report-card">
          <div className="report-icon">PDF</div>

          <div className="report-info">
            <span>Patient Report</span>
            <h2>Medical Report & Prescription</h2>
            <p>
              Contains patient information, consultation details, and
              prescription information.
            </p>
          </div>

          <div className="report-actions">
            <button
              type="button"
              className="report-view-button"
              onClick={handleViewReport}
            >
              View Report
            </button>

            <a
              className="report-download-button"
              href={reportPath}
              download="patient_report.pdf"
            >
              Download PDF
            </a>
          </div>
        </article>
      </section>
    </main>
  );
};

export default ReportsLayout;