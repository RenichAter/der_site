import React from 'react'
import logo from './logo.svg';
import Button from '@material-ui/core/Button';
import {AppBar, Container, Toolbar, Typography, Box, Paper, Grid, Card, CardMedia, CardContent, CardActions } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import FiberNewIcon from '@material-ui/icons/FiberNew';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationActions from '@material-ui/core/BottomNavigationAction';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Input from '@material-ui/core/Input';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  allColor: {
    color: "#FF0A0A"
  },
  menuButton: {
    marginRight: theme.spacing(1)
  },
  title: {
    flexGrow:1
  },
  mainFeaturesPost:{
    position: "reletive",
    color: theme.palette.common.white,
    marginBottom: theme.spacing(1),
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center"
  },
  mainFeaturesPostContent:{
    position: "reletive",
    padding: theme.spacing(6),
    marginTop: theme.spacing(8)
  },
  footerPosition:{
    padding: theme.spacing(3),
  },
  CreateButton:{
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
    backgroundColor: "#FF0A0A",
    color: "white"
  },
  cardMedia: {
    paddingTop:"25%"
  },
  cardPlaceTime: {
  display: 'flex', justifyContent: 'space-between'
 }
}))

const cards = [1,2,3,4,5,6,7,8,9];

function App() {
  const classes = useStyles();
  const [value, setValue] = React.useState("immediate")
  const handleChange = (event, newValue) => {
    setValue(newValue);
  }
  const [open, setOpen] = React.useState(false);
  const [openReg, setOpenReg] = React.useState(false);
  const [openAdd, setOpenAdd] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClickOpenReg = () => {
    setOpenReg(true)
  }
  const handleClickOpenAdd = () => {
    setOpenAdd(true)
  }
  const handleClose = () => {
    setOpen(false) || setOpenReg(false) || setOpenAdd(false)
  }
  return (
    <>
   <AppBar position="fixed" style={{backgroundColor: "#FF0A0A"}}>
    <Container fixed>
      <Toolbar>
        <iconButton edge="start"
        color="inherit" aria-label="menu" className={classes.menuButton}>
        <MenuIcon />
        </iconButton>
        <Typography variant="h6" className={classes.title}>
           Фесфанд
        </Typography>
        <Box mr={3}>
          <Button color="inherit" variant="outlined" className={classes.menuButton} onClick={handleClickOpen} >Войти</Button>
          <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title"> 
              Войти
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Войдите, чтобы создавать мероприятия
              </DialogContentText>
              <TextField autoFocus margin="dense" id="name" label="Электронная Почта" type="email" fullWidth />
              <TextField autoFocus margin="dense" id="pass" label="Пороль" type="password" fullWidth />
            </DialogContent>
            <DialogActions> 
              <Button onClick={handleClose} className={classes.allColor}>
                Отмена
              </Button>
              <Button onClick={handleClose} className={classes.allColor}>
                Войти
              </Button>
            </DialogActions>
          </Dialog>
          </Box>
        <Box mr={3}>
        <Button color="default" variant="contained" onClick={handleClickOpenReg}>Регистрация</Button>
        <Dialog open={openReg} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title"> 
              Регистрация
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Зарегистрируйтесь, чтобы создавать мероприятия
              </DialogContentText>
              <TextField autoFocus margin="dense" id="name" label="Электронная Почта" type="email" fullWidth />
              <TextField autoFocus margin="dense" id="pass" label="Пороль" type="password" fullWidth />
              <TextField autoFocus margin="dense" id="passto" label="Повторите Пороль" type="passwordto" fullWidth />
            </DialogContent>
            <DialogActions> 
              <Button onClick={handleClose} className={classes.allColor}>
                Отмена
              </Button>
              <Button onClick={handleClose} className={classes.allColor}>
                Зарегистрироваться
              </Button>
            </DialogActions>
          </Dialog>
          </Box>
      </Toolbar>
    </Container>
   </AppBar>

   <main>
    <Paper className={classes.mainFeaturesPost}
    style={{backgroundImage: 'url(./img/header.png)' }}>
        <Container fixed>
          <Grid container>
            <Grid item md={6}>
              <div className={classes.mainFeaturesPostContent}>
                <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                  Фесфанд
                </Typography>
                <Typography variant="h5" color="inherit" paragraph>
                  Добро пожаловать на сайт фандомных мероприятий.
                  Здесь вы сможете легко найти мероприяти, которые будут проходить в Москве.
                </Typography>
              </div>
            </Grid>
          </Grid>
        </Container>
    </Paper>
    <div align="center">
    <Button variant="outlined" className={classes.CreateButton} onClick={handleClickOpenAdd}>
      Добавить мероприятие
    </Button>
    <Dialog open={openAdd} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title"> 
              Создание мероприятия
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                введите все данные о вашем мероприятии
              </DialogContentText >
              <TextField autoFocus variant="outlined" margin="dense" id="nameEvent" label="Введите название" color="red" type="nameevent" fullWidth />
              <TextField autoFocus variant="outlined" multiline margin="dense" id="descriptionEvent" label="Введите описание" color="#FF0A0A" type="descriptionevent" fullWidth />
              <TextField autoFocus  variant="outlined" margin="dense" id="placeEvent" label="Введите адресс места, где пройдёт мероприятие" color="#FF0A0A" type="placeevent" fullWidth />
              <TextField autoFocus  variant="outlined" margin="dense" id="dateEvent" label="введите дату в формате дд/мм/гггг" color="#FF0A0A" type="dateevent" fullWidth />
              <Typography align="left" color="textPrimary">Добавьте изображение(я)</Typography>
              <Button variant="outlined" margin="dense" component="label" className={classes.CreateButton} ><input accept="image/*"  id="raised-button-file" multiple type="file"/> </Button>
            </DialogContent>
            <DialogActions> 
              <Button onClick={handleClose} className={classes.allColor}>
                Отмена
              </Button>
              <Button onClick={handleClose} className={classes.allColor}>
                создать
              </Button>
            </DialogActions>
    </Dialog>
    </div>
    <footer className={classes.footerPosition}>
    <Typography variant="h5" align="center" color="textPrimary" gutterBottom>
          Навигация
        </Typography>
      <BottomNavigation value={value} onChange={handleChange} className={classes.root}>
        <BottomNavigationActions style={{color: "#FF0A0A"}}
          label="Ближайшие "
          value="immediate"
          icon={<AccessTimeIcon />}
        />
        <BottomNavigationActions style={{color: "#FF0A0A"}}
          label="Новодобавленные"
          value="new"
          icon={<FiberNewIcon />}
        />
      </BottomNavigation>
    </footer>

    <Container className={classes.cardGrid} maxWidth="md">
      <Grid container spacing={4}>
        {cards.map((card) =>(
          <Grid item key={card} xs={12} sm={12} md={12}>
            <Card classesName={classes.card}>
              <CardMedia className={classes.cardMedia} image="https://img2.fonwall.ru/o/as/oktyabr-v-caricyno-osen-caricyno-muzey-zapovednik-iikd.jpg?auto=compress&fit=resize&w=1200&display=large&nsfw=false"/>
              <CardContent className={classes.cardContent}>
                <Typography variant="h4" gutterBottom>
                  Тестовое Имя
                </Typography>
                <Typography variant="h5" gutterBottom>
                  Тестовое описание
                </Typography>
                <div className={classes.cardPlaceTime}>
                  <Typography>Ул.Тестова, дом 46</Typography>
                  <Typography>20.07.2024</Typography>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
   </main>
   </>
  );
}

export default App;
