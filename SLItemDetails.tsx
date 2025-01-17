import React, { useState, useEffect } from 'react';
import { Box, Typography, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import '../app/globals.css';

const SAMPLE_DATA = {
  routing: [
    { Op: "10", Wc: "WC1", WcDesc: "Work Center 1" },
    { Op: "20", Wc: "WC2", WcDesc: "Work Center 2" },
    // Other routing data here...
  ],
  distribution: [
    { Item: "Item1", Cost: "$10.00", QtyPicked: 100, QtyPacked: 90, QtyShipped: 80 },
    { Item: "Item2", Cost: "$15.00", QtyPicked: 150, QtyPacked: 130, QtyShipped: 120 },
  ]
};

const SLItemDetails: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(window ? window.matchMedia('(prefers-color-scheme: dark)') : false);
  const [selectedItem, setSelectedItem] = useState(SAMPLE_DATA);
  const [showRouting, setShowRouting] = useState(false);
  const [showDistribution, setShowDistribution] = useState(false);

  useEffect(() => {
    console.log(isDarkMode, 'dm')
    if (isDarkMode?.hasOwnProperty('media')) {
        const value = isDarkMode.media.includes('(prefers-color-scheme: dark)') || false;
        setIsDarkMode(value);
    }
  }, []);
  const handleToggleSection = (section: string) => {
    if (section === 'routing') setShowRouting(!showRouting);
    else if (section === 'distribution') setShowDistribution(!showDistribution);
  };

  const renderTable = (data: any[] | undefined) => {
    if (!data) return null;
  
    const headers = Object.keys(data[0] || {});
  
    return (
      <TableContainer component={Paper} sx={{ mt: 2, backgroundColor: isDarkMode ? '#2e3436' : '#dadada', color: isDarkMode ? '#fff' : 'black' }}>
        <Table>
          <TableHead>
            <TableRow>
              {headers.map((header) => (
                <TableCell
                  key={header}
                  sx={{
                    fontWeight: 'bold',
                    backgroundColor: isDarkMode ? '#2e3436' : '#dadada',
                    color: isDarkMode ? '#fff' : 'black',
                  }}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody sx={{backgroundColor: isDarkMode ? '#2e3436' : '#fff',}}>
            {data.map((row, rowIndex) => (
              <React.Fragment key={rowIndex}>
                <TableRow
                  sx={{
                    backgroundColor: 'inherit',
                    color: isDarkMode ? '#fff' : 'black',
                  }}
                >
                  {headers.map((header) => (
                    <TableCell
                      key={header}
                      sx={{
                        color: isDarkMode ? '#fff' : 'black',
                        backgroundColor: 'inherit'
                      }}
                    >
                      {row[header]}
                    </TableCell>
                  ))}
                </TableRow>
                {row.children && row.children.length > 0 && (
                  <TableRow
                    sx={{
                      backgroundColor: 'inherit',
                      color: isDarkMode ? '#fff' : 'black',
                    }}
                  >
                    <TableCell
                      colSpan={headers.length}
                      sx={{
                        color: isDarkMode ? '#fff' : 'black',
                      }}
                    >
                      {renderTable(row.children)}
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };
  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: isDarkMode ? '#2e3436' : '#dadada'}}>
      <Box sx={{ p: 2 }}>
        {[
          { title: "Item Routing", key: "routing", isOpen: showRouting, data: selectedItem.routing },
          { title: "Item Distribution", key: "distribution", isOpen: showDistribution, data: selectedItem.distribution },
        ].map(({ title, key, isOpen, data }) => (
          <Box key={key} sx={{ mb: 2}}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                p: 1,
                bgcolor: 'inherit',
                color: isDarkMode ? '#fff' : 'black',
                borderRadius: '5px',
              }}
              onClick={() => handleToggleSection(key)}
            >
              <IconButton
                size="small"
                sx={{
                  transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s ease',
                  backgroundColor: '#2e3436',
                  color: '#fff',
                  "&:hover": { backgroundColor: '#282828', transform: !isOpen ? 'scale(1.2)' : '' },
                }}
              >
                <ArrowForwardIosIcon 
                  sx={{
                    color: '#fff',
                    "&:hover": { color: '#fff' }, 
                  }} 
                  fontSize="inherit" 
                />
              </IconButton>
              <Typography
                variant="subtitle1"
                sx={{
                  ml: 1,
                  fontWeight: 'bold',
                  letterSpacing: isOpen ? '0.25em' : 'inherit',
                  textTransform: isOpen ? 'uppercase' : 'capitalize',
                  color: isDarkMode ? '#fff' : '#000',
                }}
              >
                {title}
              </Typography>
            </Box>
            {isOpen && renderTable(data)}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default SLItemDetails;
