// import ClassicEditor from './Editor.js';
// import { CKEditor } from '@ckeditor/ckeditor5-react';
import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
// import Blog from '../blogs/Blog.js';
import {
  Root,
  Header,
  EdgeSidebar,
  SidebarContent,
  EdgeTrigger,
  Content,
  Footer,
  InsetContainer,
  InsetSidebar,
} from '@mui-treasury/layout';
import AppHeader from './layouts/appHeader.js';
import AppSidebar from './layouts/appSidebar.js';
import ButtonBase from '@mui/material/ButtonBase';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { Avatar, Grid, IconButton, Toolbar } from '@mui/material';
import {
  ArrowLeft,
  ArrowLeftOutlined,
  ArrowRightAlt,
  Menu,
} from '@mui/icons-material';
import AppInsetSidebar from './layouts/appInsetSidebar.js';
import AppContent from './layouts/appContent.js';

function App() {
  return (
    <Root
      scheme={{
        header: {
          config: {
            xs: {
              position: 'sticky',
              height: 56,
            },
            md: {
              position: 'relative',
              height: 64,
              clipped: true,
            },
          },
        },
        leftEdgeSidebar: {
          config: {
            xs: {
              variant: 'temporary',
              width: 'auto',
            },
            md: {
              variant: 'permanent',
              width: 256,
              collapsible: true,
              collapsedWidth: 64,
            },
          },
        },
        rightInsetSidebar: {
          config: {
            variant: 'sticky',
            top: '4rem',
            width: 600,
            hidden: ['xs', 'sm'],
          },
        },
      }}
    >
      {({ state: { leftEdgeSidebar } }) => (
        <>
          <CssBaseline />
          <Header>
            <Toolbar>
              <EdgeTrigger target={{ anchor: 'left', field: 'open' }}>
                {(open, setOpen) => (
                  <IconButton onClick={() => setOpen(!open)}>
                    {open ? <ArrowLeftOutlined /> : <Menu />}
                  </IconButton>
                )}
              </EdgeTrigger>
              <AppHeader />
            </Toolbar>
          </Header>
          <EdgeSidebar anchor="left">
            <SidebarContent>
              <Avatar
                sx={{
                  ...(leftEdgeSidebar.collapsed && { width: 40, height: 40 }),
                }}
              >
                A
              </Avatar>
            </SidebarContent>
            <EdgeTrigger target={{ anchor: 'left', field: 'collapsed' }}>
              {(collapsed, setCollapsed) => (
                <ButtonBase
                  onClick={() => setCollapsed(!collapsed)}
                  sx={{ minHeight: 40, width: '100%' }}
                >
                  {collapsed ? <ArrowRightAlt /> : <ArrowLeft />}
                </ButtonBase>
              )}
            </EdgeTrigger>
          </EdgeSidebar>
          <Content>
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <AppContent />
              </Grid>
              <Grid item xs={4}>
                <InsetContainer
                  rightSidebar={<InsetSidebar>Inset Sidebar</InsetSidebar>}
                >
                  <AppInsetSidebar />
                </InsetContainer>
              </Grid>
            </Grid>
          </Content>
          <Footer>Footer</Footer>
        </>
      )}
    </Root>
  );
}

export default App;
