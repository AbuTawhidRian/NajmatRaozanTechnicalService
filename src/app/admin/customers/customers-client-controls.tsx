"use client";

import { useState } from "react";
import ListControls from "../components/ListControls";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface Customer {
  id: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
  _count: { requests: number };
}

export function CustomersClientControls({ customers }: { customers: Customer[] }) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExportPdf = () => {
    setIsExporting(true);
    try {
      const doc = new jsPDF();
      
      doc.setFontSize(16);
      doc.text("Customers List", 14, 15);
      doc.setFontSize(10);
      doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 22);

      const tableData = customers.map((c) => [
        c.name || "Unknown",
        [c.phone, c.email].filter(Boolean).join("\n") || "No Contact Info",
        c.address || "No address",
        c._count.requests.toString(),
      ]);

      autoTable(doc, {
        startY: 30,
        head: [["Name", "Contact", "Address", "Total Requests"]],
        body: tableData,
        styles: { fontSize: 8 },
        headStyles: { fillColor: [10, 37, 64] },
      });

      doc.save("customers-list.pdf");
    } catch (error) {
      console.error("Failed to generate PDF:", error);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <ListControls
      searchPlaceholder="Search customers by name, phone, email..."
      filterOptions={[
        { label: "Has Requests", value: "HAS_REQUESTS" },
        { label: "No Requests", value: "NO_REQUESTS" },
      ]}
      filterParamName="filter"
      onExportPdf={handleExportPdf}
      isExporting={isExporting}
    />
  );
}
