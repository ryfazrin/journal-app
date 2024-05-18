// src/components/ExportImportControls.jsx
import React, { useRef, useState } from 'react';
import { Button, Input } from '@chakra-ui/react';
import { jsPDF } from 'jspdf';
import { saveAs } from 'file-saver';
import Papa from 'papaparse';
import { useDispatch, useSelector } from 'react-redux';
import { addEntry } from '../store/journalSlice';

const ExportImportControls = () => {
  const entries = useSelector((state) => state.journal.entries);
  const filter = useSelector((state) => state.journal.filter);
  const dispatch = useDispatch();
  const inputFileRef = useRef(null);
  const [file, setFile] = useState(null);

  const filteredEntries = entries.filter((entry) => {
    const matchesKeyword = entry.title.toLowerCase().includes(filter.keyword.toLowerCase()) ||
                           entry.content.toLowerCase().includes(filter.keyword.toLowerCase());
    const matchesTag = filter.tag ? entry.tag === filter.tag : true;
    const matchesDate = filter.date ? entry.date.startsWith(filter.date) : true;

    return matchesKeyword && matchesTag && matchesDate;
  });

  const exportToPDF = () => {
    const doc = new jsPDF();
    filteredEntries.forEach((entry, index) => {
      doc.text(`Title: ${entry.title}`, 10, 10 + (index * 10));
      doc.text(`Content: ${entry.content}`, 10, 20 + (index * 10));
      doc.text(`Tag: ${entry.tag}`, 10, 30 + (index * 10));
      doc.text(`Date: ${new Date(entry.date).toLocaleString()}`, 10, 40 + (index * 10));
      if (index < filteredEntries.length - 1) {
        doc.addPage();
      }
    });
    doc.save('journal_entries.pdf');
  };

  const exportToCSV = () => {
    const csv = Papa.unparse(filteredEntries);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'journal_entries.csv');
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleImportCSV = () => {
    if (file) {
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          results.data.forEach((entry) => {
            dispatch(addEntry(entry));
          });
        }
      });
      setFile(null); // Clear the file input after importing
    }
  };

  const triggerFileInput = () => {
    inputFileRef.current.click();
  };

  return (
    <div>
      <Button onClick={exportToPDF} colorScheme="teal" mb={4}>Export to PDF</Button>
      <Button onClick={exportToCSV} colorScheme="teal" mb={4} ml={2}>Export to CSV</Button>
      <Button onClick={triggerFileInput} colorScheme="teal" mb={4} ml={2}>Select CSV File</Button>
      <Input
        type="file"
        accept=".csv"
        ref={inputFileRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      {file && <Button onClick={handleImportCSV} colorScheme="teal" mb={4} ml={2}>Import from CSV</Button>}
    </div>
  );
};

export default ExportImportControls;
