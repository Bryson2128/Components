'use client';
// #region Imports

// Lib
import { AgGridReact } from 'ag-grid-react';
import React, { useState, ReactNode, useMemo, useRef } from "react";
import { Box, Typography } from '@mui/material';
import { colDef } from '@/components/DataGrid/colDef'; // Ensure this path is correct
import LoadingDots from '@/components/LoadingDots/LoadingDots';
import useBdStore from '@/store/bookDashboardStore';
import JobDetailsTab from '@/components/JobDetails/JobDetails';
import "../app/globals.css";
// #endregion

// #region Interfaces
export interface PageTabPanelProps {
  id: string;
  children: ReactNode;
  activeTab: string;
  loading?: boolean;
}

export interface PageTabsContainerProps {
  children: ReactNode;
  activeTab: string;
  onTabChange: (id: string) => void;
  isFetchingItemDetails?: boolean;
}
// #endregion
const isSelected = (tabName: string, currentViewName: string) => tabName === currentViewName;

const transitionTabStyles = (mainBgColor = "#2c2c2c", isSelected = false) => ({
  backgroundColor: mainBgColor,
  color: isSelected ? '#fff' : 'black',
  border: `1px solid ${mainBgColor}`,
  borderBottom: mainBgColor === "#373737" ? "4px solid limegreen" : "1px solid transparent",
  fontSize: "20px",
  display: "flex",
  alignItems: "center",
  height: "40px",
  transition: "font-size 0.3s ease",
  padding: "0 16px",
  cursor: "pointer",
  flex: 1,
  lineHeight: 1.5,
  justifyContent: "center",
  "&:hover": {
    fontSize: "22px",
  }
});

const PageTabs = () => {
  const { selectedJob, setSelectedJob, setCurrentView } = useBdStore();
  const [activeTab, setActiveTab] = useState('Job List');
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [gridApi, setGridApi] = useState(null);
  const gridApiRef = useRef(null);

  const rowData = useMemo(() => [
    // Your row data here
    {
      OrderType: 'New',
      OrderTypeName: 'Standard',
      ord_num: 'ORD12345',
      ord_line: 1,
      ord_release: 2,
      OrderGroup: 'Group A',
      job: 'JOB001',
      ParentJob: 'PARENT001',
      PlanningBucket: 'Week 42',
      CalendarWeekBucket: 'Week 42',
      status: 'In Progress',
      job_due: '2024-11-05',
      fab_due: '2024-10-30',
      pc_release_due: '2024-10-20',
    }
  ], []);

  const colDefs = useMemo(() => colDef, []);
  const defaultColDef = useMemo(() => ({ flex: 1, defaultAggFunc: 'sum' }), []);

  const onGridReady = (params:any) => {
    setGridApi(params.api);
    gridApiRef.current = params.api;
  };

  const onRowClicked = (event: { data: any; }) => {
    const job = event.data;
    if (selectedJob === job) {
      closeSidebar();
    } else {
      setSelectedJob(job);
    }
  };

  const closeSidebar = () => {
    setSelectedJob(null);
    setActiveTab("Job List");
  };

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setCurrentView(tabId);
  };

  return (
      <Box sx={{ width: "100%", marginTop: 4, borderRadius: "1px", overflow: "hidden", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)" }}>
        <Box sx={{ display: "flex", borderRadius: "20px", overflow: "hidden", position: 'sticky' }}>
          <Box
            sx={transitionTabStyles(activeTab === "Job List" ? "#373737" : "#e5e5e5", activeTab === "Job Details")}
            onClick={() => handleTabChange("Job List")}
          >
            <Typography variant='h6' sx={{"&:hover": {fontSize: 'inherit'}}}>Job List</Typography>
          </Box>
          <Box
            sx={transitionTabStyles(activeTab === "Job Details" ? "#373737" : "#e5e5e5", activeTab === "Job Details")}
            onClick={() => handleTabChange("Job Details")}
          >
            <Typography variant='h6'>Job Details</Typography>
          </Box>
        </Box>
        
        <Box sx={{ width: "100%", padding: 0, marginTop: 2 }}>
          {loading ? (
            <Box sx={{ textAlign: "center" }}>
              <LoadingDots />
            </Box>
          ) : (
            <>
              <Box sx={{ display: activeTab === "Job List" ? "flex" : "none", flexDirection: 'row', flexWrap: 'wrap' }}>
                <div className='ag-theme-balham' style={{ height: '90vh', width: '100%' }}>
                  <AgGridReact
                        rowData={rowData}
                        columnDefs={colDefs}
                        defaultColDef={defaultColDef}
                        rowSelection="single"
                        onGridReady={onGridReady}
                        onRowClicked={onRowClicked}
                        animateRows={false}
                        suppressAggFuncInHeader={true}
                        rowGroupPanelShow="always"
                        enableCharts={true}
                        cellSelection={true}
                        pagination={false}
                  />
                </div>
              </Box>
              <Box sx={{ display: activeTab === "Job Details" ? "block" : "none", padding: '10px' }}>
                {selectedJob ? <JobDetailsTab /> : <p>Select a job to view details</p>}
              </Box>
            </>
          )}
        </Box>
      </Box>
  );
}

export default PageTabs;
