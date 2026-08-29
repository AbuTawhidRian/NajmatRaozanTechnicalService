"use client";

import { useState } from "react";
import ListControls from "../components/ListControls";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface Request {
  id: string;
  name: string;
  email: string | null;
  phone: string;
  service: string;
  location: string;
  status: string;
  createdAt: Date;
}

export function RequestsClientControls({ requests }: { requests: Request[] }) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExportPdf = () => {
    setIsExporting(true);
    try {
      const doc = new jsPDF();
      
      doc.setFontSize(16);
      doc.text("Customer Requests", 14, 15);
      doc.setFontSize(10);
      doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 22);

      const tableData = requests.map((req) => [
        req.name,
        req.phone + (req.email ? `\n${req.email}` : ""),
        req.service,
        req.location,
        req.status,
        new Date(req.createdAt).toLocaleDateString(),
      ]);

      autoTable(doc, {
        startY: 30,
        head: [["Name", "Contact", "Service", "Location", "Status", "Date"]],
        body: tableData,
        styles: { fontSize: 8 },
        headStyles: { fillColor: [10, 37, 64] },
      });

      doc.save("customer-requests.pdf");
    } catch (error) {
      console.error("Failed to generate PDF:", error);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <ListControls
      searchPlaceholder="Search requests by name, phone, or area..."
      filterOptions={[
        { label: "Pending", value: "PENDING" },
        { label: "In Progress", value: "IN_PROGRESS" },
        { label: "Completed", value: "COMPLETED" },
        { label: "Cancelled", value: "CANCELLED" },
      ]}
      filterParamName="status"
      onExportPdf={handleExportPdf}
      isExporting={isExporting}
    />
  );
}
