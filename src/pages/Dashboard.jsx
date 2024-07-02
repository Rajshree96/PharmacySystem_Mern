import React, { useState } from 'react';
import { styled, useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowRight from '@mui/icons-material/ArrowRight';
import Menu from '../component/Navbar/Menu';
import { Avatar, Card, CardContent, Grid } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import graph from '../assets/graph.png';
import image1 from '../assets/img1.png';
import dumy from '../assets/dumy.png';
import circle from '../assets/circleGraph.jpeg';

const FireNav = styled(List)({
  '& .MuiListItemButton-root': {
    paddingLeft: 24,
    paddingRight: 24,
  },
  '& .MuiListItemIcon-root': {
    minWidth: 0,
    marginRight: 16,
  },
  '& .MuiSvgIcon-root': {
    fontSize: 20,
  },
});

const drawerWidth = 265;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const Dashboard = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ bgcolor: '#086070' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader sx={{ bgcolor: '#086070' }}>
          <Box>
            <Typography sx={{ fontWeight: '400', color: 'white', fontSize: '19px' }}>Business Name</Typography>
          </Box>
          <IconButton onClick={handleDrawerClose} sx={{ color: 'white' }}>
            {theme.direction === 'ltr' ? <ArrowRight /> : <ArrowRight />}
          </IconButton>
        </DrawerHeader>
        <Divider />

        <Menu />

      </Drawer>
      <Main open={open} sx={{ bgcolor: '#e0f7fa', height: 'auto' }}>
        <DrawerHeader />

        <Grid container spacing={1}>
          <Grid item lg={2} md={2} sm={3} xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Card sx={{ maxWidth: 'auto' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'start', gap: '5px', alignItems: 'center' }}>
                    <Avatar sx={{ bgcolor: 'pink' }} aria-label="recipe" >
                      <PersonIcon sx={{ color: 'black' }} />
                    </Avatar>
                    <Typography variant="h6" sx={{ fontWeight: '700' }}> 15</Typography>
                  </Box>
                  <Box mt='8px'>
                    <Typography gutterBottom variant="h6" component="div" sx={{ color: '#086070', fontWeight: '600', fontSize: '18px', width: '150px' }} >
                      Total Customer
                    </Typography>
                    <img src={graph} alt='graph' />
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Grid>

          <Grid item lg={2} md={2} sm={3} xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Card sx={{ maxWidth: 'auto' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'start', gap: '5px', alignItems: 'center' }}>
                    <Avatar sx={{ bgcolor: 'pink' }} aria-label="recipe" >
                      <PersonIcon sx={{ color: 'black' }} />
                    </Avatar>
                    <Typography variant="h6" sx={{ fontWeight: '700' }}> 566</Typography>
                  </Box>
                  <Box mt='8px'>
                    <Typography gutterBottom variant="h6" component="div" sx={{ color: '#086070', fontWeight: '600', fontSize: '17px', width: '155px' }} >
                      Total Manufacturer
                    </Typography>
                    <img src={graph} alt='graph' />
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Grid>
          <Grid item lg={2} md={2} sm={3} xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Card sx={{ maxWidth: 'auto' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'start', gap: '5px', alignItems: 'center' }}>
                    <Avatar sx={{ bgcolor: 'pink' }} aria-label="recipe" >
                      <PersonIcon sx={{ color: 'black' }} />
                    </Avatar>
                    <Typography variant="h6" sx={{ fontWeight: '700' }}> 878</Typography>
                  </Box>
                  <Box mt='8px'>
                    <Typography gutterBottom variant="h6" component="div" sx={{ color: '#086070', fontWeight: '600', fontSize: '18px', width: '150px' }} >
                      Total Medicine
                    </Typography>
                    <img src={graph} alt='graph' />
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Grid>
          <Grid item lg={2} md={2} sm={3} xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Card sx={{ maxWidth: 'auto' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'start', gap: '5px', alignItems: 'center' }}>
                    <Avatar sx={{ bgcolor: 'pink' }} aria-label="recipe" >
                      <PersonIcon sx={{ color: 'black' }} />
                    </Avatar>
                    <Typography variant="h6" sx={{ fontWeight: '700' }}> 563</Typography>
                  </Box>
                  <Box mt='8px'>
                    <Typography gutterBottom variant="h6" component="div" sx={{ color: '#086070', fontWeight: '600', fontSize: '18px', width: '150px' }} >
                      Out of Stock
                    </Typography>
                    <img src={graph} alt='graph' />
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Grid>
          <Grid item lg={2} md={2} sm={3} xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Card sx={{ maxWidth: 'auto' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'start', gap: '5px', alignItems: 'center' }}>
                    <Avatar sx={{ bgcolor: 'pink' }} aria-label="recipe" >
                      <PersonIcon sx={{ color: 'black' }} />
                    </Avatar>
                    <Typography variant="h6" sx={{ fontWeight: '700' }}> 563</Typography>
                  </Box>
                  <Box mt='8px'>
                    <Typography gutterBottom variant="h6" component="div" sx={{ color: '#086070', fontWeight: '600', fontSize: '18px', width: '150px' }} >
                      Expired
                    </Typography>
                    <img src={graph} alt='graph' />
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Grid>
          <Grid item lg={2} md={2} sm={3} xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Card sx={{ maxWidth: 'auto' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'start', gap: '5px', alignItems: 'center' }}>
                    <Avatar sx={{ bgcolor: 'pink' }} aria-label="recipe" >
                      <PersonIcon sx={{ color: 'black' }} />
                    </Avatar>
                    <Typography variant="h6" sx={{ fontWeight: '700' }}> 764</Typography>
                  </Box>
                  <Box mt='8px'>
                    <Typography gutterBottom variant="h6" component="div" sx={{ color: '#086070', fontWeight: '600', fontSize: '18px', width: '150px' }} >
                      Total Invoice
                    </Typography>
                    <img src={graph} alt='graph' />
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Grid>

        </Grid>

        <Grid container spacing={1} mt='2rem'>
          <Grid item lg={3} md={3} sm={6} xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Card sx={{ width: '280px', height:'130px' ,bgcolor:'#ec11c621',display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <CardContent >
                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: '5px', alignItems: 'end' }}>
                    <Box style={{backgroundColor:'#086070',color:'white',height:'50px',width:'50px',borderRadius:'5px',display: 'flex', justifyContent: 'center',alignItems:'center'}}>
                    {/* <img src={image1} alt='graph' height={49} width={58} /> */}icon
                    </Box>
                      <Typography gutterBottom variant="h6" component="div" sx={{ color: 'black', fontWeight: '600', fontSize: '18px' }} >
                        Create POS Invoice
                      </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Grid>
          <Grid item lg={3} md={3} sm={6} xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Card sx={{ width: '280px', height:'130px' ,bgcolor:'#ec2f1145',display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <CardContent >
                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: '5px', alignItems: 'end' }}>
                    <Box style={{backgroundColor:'#086070',color:'white',height:'50px',width:'50px',borderRadius:'5px',display: 'flex', justifyContent: 'center',alignItems:'center'}}>
                    {/* <img src={image1} alt='graph' height={49} width={58} /> */}icon
                    </Box>
                      <Typography gutterBottom variant="h6" component="div" sx={{ color: 'black', fontWeight: '600', fontSize: '18px' }} >
                        Create New Invoice
                      </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Grid>
          <Grid item lg={3} md={3} sm={6} xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Card sx={{ width: '280px', height:'130px' ,bgcolor:'#ec11c621',display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <CardContent >
                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: '5px', alignItems: 'end' }}>
                    <Box style={{backgroundColor:'#086070',color:'white',height:'50px',width:'50px',borderRadius:'5px',display: 'flex', justifyContent: 'center',alignItems:'center'}}>
                    {/* <img src={image1} alt='graph' height={49} width={58} /> */}icon
                    </Box>
                      <Typography gutterBottom variant="h6" component="div" sx={{ color: 'black', fontWeight: '600', fontSize: '18px' }} >
                        Add Medicine
                      </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Grid>
          <Grid item lg={3} md={3} sm={6} xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Card sx={{ width: '280px', height:'130px' ,bgcolor:'#ec2f1145',display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <CardContent >
                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: '5px', alignItems: 'end' }}>
                    <Box style={{backgroundColor:'#086070',color:'white',height:'50px',width:'50px',borderRadius:'5px',display: 'flex', justifyContent: 'center',alignItems:'center'}}>
                    {/* <img src={image1} alt='graph' height={49} width={58} /> */}icon
                    </Box>
                      <Typography gutterBottom variant="h6" component="div" sx={{ color: 'black', fontWeight: '600', fontSize: '18px' }} >
                        Add Customer
                      </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Grid>
        </Grid>

        <Grid container spacing={1} mt='2rem'>
          <Grid item lg={3} md={3} sm={6} xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Card sx={{ width: '280px', height:'130px' ,bgcolor:'#ec2f1145',display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <CardContent >
                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: '5px', alignItems: 'end' }}>
                    <Box style={{backgroundColor:'#086070',color:'white',height:'50px',width:'50px',borderRadius:'5px',display: 'flex', justifyContent: 'center',alignItems:'center'}}>
                    {/* <img src={image1} alt='graph' height={49} width={58} /> */}icon
                    </Box>
                      <Typography gutterBottom variant="h6" component="div" sx={{ color: 'black', fontWeight: '600', fontSize: '18px' }} >
                       Sales Report
                      </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Grid>
          <Grid item lg={3} md={3} sm={6} xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Card sx={{ width: '280px', height:'130px' ,bgcolor:'#ec11c621',display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <CardContent >
                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: '5px', alignItems: 'end' }}>
                    <Box style={{backgroundColor:'#086070',color:'white',height:'50px',width:'50px',borderRadius:'5px',display: 'flex', justifyContent: 'center',alignItems:'center'}}>
                    {/* <img src={image1} alt='graph' height={49} width={58} /> */}icon
                    </Box>
                      <Typography gutterBottom variant="h6" component="div" sx={{ color: 'black', fontWeight: '600', fontSize: '18px' }} >
                       Purchase Report
                      </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Grid>
          <Grid item lg={3} md={3} sm={6} xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Card sx={{ width: '280px', height:'130px' ,bgcolor:'#ec2f1145',display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <CardContent >
                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: '5px', alignItems: 'end' }}>
                    <Box style={{backgroundColor:'#086070',color:'white',height:'50px',width:'50px',borderRadius:'5px',display: 'flex', justifyContent: 'center',alignItems:'center'}}>
                    {/* <img src={image1} alt='graph' height={49} width={58} /> */}icon
                    </Box>
                      <Typography gutterBottom variant="h6" component="div" sx={{ color: 'black', fontWeight: '600', fontSize: '18px' }} >
                        Stock Report
                      </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Grid>
          <Grid item lg={3} md={3} sm={6} xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
            <Card sx={{ width: '280px', height:'130px' ,bgcolor:'#ec11c621',display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <CardContent >
                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: '5px', alignItems: 'end' }}>
                    <Box style={{backgroundColor:'#086070',color:'white',height:'50px',width:'50px',borderRadius:'5px',display: 'flex', justifyContent: 'center',alignItems:'center'}}>
                    {/* <img src={image1} alt='graph' height={49} width={58} /> */}icon
                    </Box>
                      <Typography gutterBottom variant="h6" component="div" sx={{ color: 'black', fontWeight: '600', fontSize: '18px' }} >
                       Day Book
                      </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Grid>
        </Grid>

        <Grid container spacing={0} mt='2rem' >
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Card sx={{ width: '580px', height: '420px' }}>
                <CardContent>
                  <Box sx={{ display: 'grid', justifyContent: 'start', alignItems: 'center' }}>
                    <Typography variant='h6' sx={{color:'grey'}}>Statistics</Typography>
                    <Typography gutterBottom variant="h6" component="div" sx={{color: 'black', fontWeight: '700', fontSize: '25px' }} >
                      Monthly Progress Report
                    </Typography>
                    <Box>
                      <img src={dumy} alt='graph' style={{ width: '530px', height: '320px' }} />
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Card sx={{ width: '580px', height: '420px' }}>
                <CardContent>
                  <Box sx={{ display: 'grid', justifyContent: 'start', alignItems: 'center' }}>
                  <Typography variant='h6' sx={{color:'grey'}}>Statistics</Typography>
                    <Typography gutterBottom variant="h6" component="div" sx={{ color: 'black', fontWeight: '700', fontSize: '25px' }} >
                      Inventory Report
                    </Typography>
                  </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <img src={circle} alt='graph' />
                    </Box>
                </CardContent>
              </Card>
            </Box>
          </Grid>
        </Grid>


      </Main>
    </Box>
  );
}

export default Dashboard;
