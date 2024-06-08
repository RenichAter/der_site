import React, { Component, useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Box,
  Paper,
  Grid,
  Card,
  CardMedia,
  CardContent,
  TextField,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  allColor: {
    color: "#FF0A0A",
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
  },
  mainFeaturesPost: {
    position: "relative",
    color: theme.palette.common.white,
    marginBottom: theme.spacing(1),
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
  mainFeaturesPostContent: {
    position: "relative",
    padding: theme.spacing(6),
    marginTop: theme.spacing(8),
  },
  ButtonCreatePosition: {
    padding: theme.spacing(3),
  },
  CreateButton: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
    backgroundColor: "#FF0A0A",
    color: "white",
  },
  cardMedia: {
    paddingTop: "25%",
  },
  cardPlaceTime: {
    display: 'flex', justifyContent: 'space-between',
  },
}));

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];



function App() {
  const [events, setEvents] = useState([]);
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openReg, setOpenReg] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    date: '',
    location: '',
  });

  const getApiData = async () => {
    const response = await fetch(
      "https://localhost:5000/api/Events"
    ).then((response) => response.json());
    setEvents(response);
  };
  useEffect(() => {
    getApiData();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  }

  const handleClickOpenReg = () => {
    setOpenReg(true);
  }

  const handleClickOpenAdd = () => {
    setOpenAdd(true);
  }

  const handleClose = () => {
    setOpen(false);
    setOpenReg(false);
    setOpenAdd(false);
  }

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put('https://localhost:5000/api/Events', formData);
      console.log('Server Response:', response.data);
      handleClose();
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  }

  return (
    <>

      <AppBar position="fixed" style={{ backgroundColor: "#FF0A0A" }}>
        <Container fixed>
          <Toolbar>
            <Button edge="start" color="inherit" aria-label="menu" className={classes.menuButton}>
              <MenuIcon />
            </Button>
            <Typography variant="h6" className={classes.title}>
              Фесфанд
            </Typography>
            <Box mr={3}>
              <Button color="inherit" variant="outlined" className={classes.menuButton} onClick={handleClickOpen}>Войти</Button>
              <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">
                  Войти
                </DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Войдите, чтобы создавать мероприятия
                  </DialogContentText>
                  <TextField autoFocus margin="dense" id="email" label="Электронная Почта" type="email" fullWidth />
                  <TextField margin="dense" id="password" label="Пароль" type="password" fullWidth />
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
                  <TextField autoFocus margin="dense" id="email" label="Электронная Почта" type="email" fullWidth />
                  <TextField margin="dense" id="password" label="Пароль" type="password" fullWidth />
                  <TextField margin="dense" id="passwordConfirm" label="Повторите Пароль" type="password" fullWidth />
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
        <Paper className={classes.mainFeaturesPost} style={{ backgroundImage: 'url(./img/header.png)' }}>
          <Container fixed>
            <Grid container>
              <Grid item md={6}>
                <div className={classes.mainFeaturesPostContent}>
                  <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                    Фесфанд
                  </Typography>
                  <Typography variant="h5" color="inherit" paragraph>
                    Добро пожаловать на сайт фандомных мероприятий. Здесь вы сможете легко найти мероприятия, которые будут проходить в Москве.
                  </Typography>
                </div>
              </Grid>
            </Grid>
          </Container>
        </Paper>
        <div align="center" className={classes.ButtonCreatePosition}>
          <Button variant="outlined" className={classes.CreateButton} onClick={handleClickOpenAdd}>
            Добавить мероприятие
          </Button>
          <Dialog open={openAdd} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">
              Создание мероприятия
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Введите все данные о вашем мероприятии
              </DialogContentText>
              <TextField autoFocus variant="outlined" margin="dense" id="name" label="Введите название" color="primary" type="text" fullWidth value={formData.name} onChange={handleChange} />
              <TextField variant="outlined" multiline margin="dense" id="description" label="Введите описание" color="primary" type="text" fullWidth value={formData.description} onChange={handleChange} />
              <TextField variant="outlined" margin="dense" id="location" label="Введите адрес места, где пройдёт мероприятие" color="primary" type="text" fullWidth value={formData.location} onChange={handleChange} />
              <TextField variant="outlined" margin="dense" id="date" label="Введите дату в формате дд/мм/гггг" color="primary" type="text" fullWidth value={formData.date} onChange={handleChange} />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} className={classes.allColor}>
                Отмена
              </Button>
              <Button onClick={handleSubmit} className={classes.allColor}>
                Создать
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {events.map((card) => (
              <Grid item key={card} xs={12} sm={12} md={12}>
                <Card className={classes.card}>
                  <CardMedia className={classes.cardMedia} image="https://img2.fonwall.ru/o/as/oktyabr-v-caricyno-osen-caricyno-muzey-zapovednik-iikd.jpg?auto=compress&fit=resize&w=1200&display=large&nsfw=false" />
                  <CardContent className={classes.cardContent}>
                    <Typography variant="h4" gutterBottom>
                    {card.name}
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                      {card.description}
                    </Typography>
                    <div className={classes.cardPlaceTime}>
                      <Typography>{card.location}</Typography>
                      <Typography>{card.date}</Typography>
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
