// Libs
import React, { useRef, useState } from 'react';
import { Box, TextField, Button, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EditAttributesIcon from '@mui/icons-material/EditAttributes';
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';
// Local
import useBdStore from '@/store/bookDashboardStore';

interface DockProps {
    activeTab?: string;
    setActiveTab?: (tabName: string) => void;
    isDarkMode: boolean;
}

const Dock: React.FC<DockProps> = ({ activeTab = 'Job List', setActiveTab, isDarkMode }) => {
    const { selectedJob } = useBdStore();

    return (
        <Box
			sx={{
				width: '100%',
				height: 'fit-content',
				backgroundColor: isDarkMode ? '#2e3436' : '#fff',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				padding: 2,
				borderRadius: '15px',
				flexWrap: 'wrap',
				flexShrink: 3,
				gap: 2,
				marginRight: 'inherit',
				overflowX: 'auto',
				position: 'relative',
				'@media (max-width: 960px)': {
					backgroundColor: 'inherit',
				},
				'@media (max-width: 600px)': {
					backgroundColor: 'inherit'
				},
			}}
		>
            <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', width: '100%', margin: 'inherit', gap: 2}}>
                {/* Search Input with Icon */}
                <TextField
                    label="Grid Search"
                    variant="standard"
                    InputLabelProps={{ shrink: true }}
                    sx={{
                        flex: 1,
                        height: 'fit-content',
                        mr: 2,
                        minWidth: 'auto',
                        maxWidth: '400px',
                        width: '25%',
                        borderTopLeftRadius: '5px',
                        borderTopRightRadius: '5px',
                        backgroundColor: '#dadada',
                        color: 'black',
                        '& .MuiInputLabel-root': {
                            color: 'black',
                            fontWeight: 'bold',
                            ml: 1,
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                            color: 'black',
                        },
                        input: {
                            color: isDarkMode ? '#fff' : 'black',
                            fontWeight: 650,
                        },
                        '& .MuiInput-underline:before': {
                            borderBottomColor: '#000',
                            color: 'black',
                        },
                        '&:hover .MuiInput-underline:before': {
                            borderBottomColor: '#000',
                            color: 'black',
                        },
                        '& .MuiInput-underline:after': {
                            borderBottomColor: 'red',
                        },
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="end">
                                <SearchIcon sx={{ color: 'black' }} />
                            </InputAdornment>
                        ),
                    }}
                />

                {/* Tabs Container */}
				<Box
    sx={{
        display: 'inline-flex',
        alignItems: 'center',
        width: '35%',
        borderRadius: '15px',
        overflow: 'hidden',
        gap: 0,
        flexDirection: { xs: 'column', sm: 'row' },
    }}
>
      {/* Job List Tab */}
	  <Button
        variant="text"
        disableFocusRipple
        sx={{
            textTransform: 'none',
            fontWeight: 'bold',
            fontSize: '14px',
            color: activeTab === 'Job List' ? '#fff' : 'black',
            backgroundColor: activeTab === 'Job List' ? (isDarkMode ? 'red' : 'black') : '#dadada',
            borderRadius: { xs: '20px', sm: '20px 0 0 20px' },
            padding: '10px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            minWidth: '0',
        }}
        onClick={() => setActiveTab && setActiveTab('Job List')}
    >
        <EditAttributesIcon
            sx={{
                color: activeTab === 'Job List' ? 'red' : 'black',
                marginRight: '10px',
				display: {xs: 'none', sm: 'block'}
            }}
        />
        <Box
            sx={{
                fontSize: '14px',
                transition: 'transform 0.3s ease',
                ml: 'inherit',
                whiteSpace: 'nowrap',
                color: activeTab === 'Job List' ? '#fff' : 'black',
                transform: 'scale(1.2)',
                marginLeft: '2px',
                '&:hover': {
                    transform: { xs: 'scale(1.3)', sm: 'scale(1.4)' },
                },
            }}
        >
            {/* Text changes based on screen size */}
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                {'Job List'}
            </Box>
            <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                {'JL'}
            </Box>
        </Box>
    </Button>

    {/* Job Details Tab */}
    <Button
        variant="text"
        disableFocusRipple
        sx={{
            textTransform: 'none',
            fontWeight: 'bold',
            fontSize: '14px',
            color: activeTab === 'Job Details' ? '#fff' : 'black',
            backgroundColor: activeTab === 'Job Details' ? (isDarkMode ? 'red' : '#000') : isDarkMode ? '#dadada' : '#dadada',
            borderRadius: { xs: '20px', sm: '0 20px 20px 0' },
            padding: '10px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            minWidth: '0',
        }}
        onClick={() => setActiveTab && setActiveTab('Job Details')}
    >
        <EditAttributesIcon
            sx={{
                color: activeTab === 'Job Details' ? 'red' : '#000',
                marginRight: '10px',
				display: {xs: 'none', sm: 'block'}
            }}
        />
        <Box
            sx={{
                fontSize: '14px',
                transition: 'transform 0.3s ease',
                ml: 'inherit',
                whiteSpace: 'nowrap',
                color: activeTab === 'Job Details' ? '#fff' : '#000',
                transform: 'scale(1.2)',
                '&:hover': {
                    transform: { xs: 'scale(1.3)', sm: 'scale(1.4)' },
                },
            }}
        >
                {!selectedJob ? 'Job #' : (selectedJob && selectedJob?.job ? selectedJob?.job.trim() : '')}
        </Box>
    </Button>
</Box>



<PictureAsPdfOutlinedIcon
    sx={{
        fontSize: '36px',
        width: 'fit-content',
        mt: 0.5,
        ml: 2,
        mr: 1,
        color: !selectedJob || !selectedJob?.bookUrl ? 'darkgray' : '#ff0000',
        cursor: !selectedJob || !selectedJob?.bookUrl ? 'inherit' : 'pointer',
        transition: 'transform 0.2s ease-in-out',
        "&:hover": { transform: 'scale(1.2)' },
    }}
/>
            </Box>
        </Box>
    );
};

export default Dock;
