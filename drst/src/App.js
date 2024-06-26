import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { AppBar, Container, Toolbar, Typography, Box, Paper, Grid, Card, CardMedia, CardContent, TextField,Dialog, DialogActions, DialogTitle, DialogContent,DialogContentText,} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {flexGrow: 1,},
  allColor: {color: "#FF0A0A",},
  menuButton: {marginRight: theme.spacing(1),},
  title: {flexGrow: 1,},
  ButtonCreatePosition: {padding: theme.spacing(3),},
  cardMedia: {paddingTop: "25%",},
  cardPlaceTime: {display: 'flex', justifyContent: 'space-between',},
  mainFeaturesPost: {
    position: "relative",
    color: theme.palette.common.white,
    marginBottom: theme.spacing(1),
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",},
  mainFeaturesPostContent: {
    position: "relative",
    padding: theme.spacing(6),
    marginTop: theme.spacing(8),
  },
  errorServerStyle: {
    position: "relative",
    padding: theme.spacing(2),
    marginTop: theme.spacing(-4),
  },
  CreateButton: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
    backgroundColor: "#FF0A0A",
    color: "white",
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

function App() {
  const [events, setEvents] = useState([]);
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openReg, setOpenReg] = useState(false);
  const [errorFill, setErrorFill] = useState(false);
  const [errorAuth, setErrorAuth] = useState(false);
  const [errorReg, setErrorReg] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [loginIn, setLoginIn] = useState(false);
  const [serverError, setServerError] = useState(false);
  const [serverResponse, setServerResponse] = useState(null);
  const [userName, setUserName] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    date: '',
    location: '',
    picture: '',
  });

  const [formDataUser, setFormDataUser] = useState({
    name: '',
    userNick: '',
    description: '',
    email: '',
    password: '',
  });

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const getApiData = async () => {
    try {
    const response = await fetch(
      "https://localhost:5000/api/Events"
    ).then((response) => response.json());
    setEvents(response);
  }
  catch(error) {
    setServerError(true)
    console.error('Ошибка при отправке запроса:', error);

  }
  };

  useEffect(() => {
    getApiData();
    const savedToken = localStorage.getItem('token');
    const savedUserName = localStorage.getItem('userName');
    if (savedToken && savedUserName) {
      setServerResponse(savedToken);
      setUserName(savedUserName);
      setLoginIn(true);
    }
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickExit = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    setLoginIn(false);
    setUserName('')
  };

  const handleClickOpenReg = () => {
    setOpenReg(true);
  };

  const handleClickOpenAdd = () => {
    setOpenAdd(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenReg(false);
    setOpenAdd(false);
    setErrorAuth(false);
    setErrorReg(false);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleChangeLoginData = (e) => {
    const { id, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleChangeUser = (e) => {
    const { id, value } = e.target;
    setFormDataUser((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };


  const handleClickLogin = async () => {
    if (loginData.email.trim() === '' || loginData.password.trim() === '') {
      setErrorFill(true);
    } else {
      setErrorFill(false);
      try {
        const response = await axios.post('https://localhost:5000/api/Auth/login', loginData);
        setServerResponse(response.data.token);
        setUserName(response.data.nick);
        setLoginIn(true);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userName', response.data.nick);
        handleClose();
      } catch (error) {
        setErrorReg(true);
        console.error('Ошибка при отправке запроса:', error);
      }
    }
  };

  const handleRegisterUser = async (e) => {
    e.preventDefault();
    if (formDataUser.name.trim() === '' || formDataUser.description.trim() === '' || formDataUser.userNick.trim() === '' || formDataUser.email.trim() === '' || formDataUser.password.trim() === '') {
      setErrorFill(true);
    } else {
      setErrorFill(false);
      try {
        const response = await axios.post('https://localhost:5000/api/Users', formDataUser);
        setUserName(formDataUser.userNick);
        setLoginIn(true);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userName', formDataUser.userNick);
        handleClose();
      } catch (error) {
        setErrorReg(true);
        console.error('Error submitting data:', error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.name.trim() === '' || formData.description.trim() === '' || formData.date.trim() === '' || formData.location.trim() === '') {
      setErrorFill(true);
    } else {
      setErrorFill(false);
      try {
        if (formData.picture.trim() === '') {
          formData.picture = 'https://img2.fonwall.ru/o/as/oktyabr-v-caricyno-osen-caricyno-muzey-zapovednik-iikd.jpg?auto=compress&fit=resize&w=1200&display=large&nsfw=false';
        }
        const response = await axios.put('https://localhost:5000/api/Events', formData);
        console.log('Server Response:', response.data);
        handleClose();
      } catch (error) {
        console.error('Error submitting data:', error);
      }
    }
  };

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
              {loginIn ? (
                <Typography variant="h6" className={classes.menuButton}>Аккаунт: {userName} </Typography>
              ) : (
                <Button color="inherit" variant="outlined" className={classes.menuButton} onClick={handleClickOpen}>Войти</Button>
              )}
              <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Войти</DialogTitle>
                <DialogContent>
                  <DialogContentText>Войдите, чтобы создавать мероприятия</DialogContentText>
                  {errorFill ? (
                    <DialogContentText variant="outlined" className={classes.allColor}>Ошибка! Вы не заполнили все поля!</DialogContentText>
                  ) : null}
                  {errorAuth ? (
                    <DialogContentText variant="outlined" className={classes.allColor}>Ошибка! Вы ввели неверный Логин или Пароль! </DialogContentText>
                  ) : null}
                  <TextField autoFocus margin="dense" id="email" label="Электронная Почта" type="email" fullWidth value={loginData.email} onChange={handleChangeLoginData} />
                  <TextField margin="dense" id="password" label="Пароль" type="password" fullWidth value={loginData.password} onChange={handleChangeLoginData} />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} className={classes.allColor}>Отмена</Button>
                  <Button onClick={handleClickLogin} className={classes.allColor}>Войти</Button>
                </DialogActions>
              </Dialog>
            </Box>
            <Box mr={3}>
              {loginIn ? (<Button color="inherit" variant="outlined" className={classes.menuButton} onClick={handleClickExit}>Выйти</Button>) : (
                <Button color="default" variant="contained" onClick={handleClickOpenReg}>Регистрация</Button>
              )}
              <Dialog open={openReg} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Регистрация</DialogTitle>
                <DialogContent>
                  <DialogContentText>Зарегистрируйтесь, чтобы создавать мероприятия</DialogContentText>
                  {errorFill ? (
                    <DialogContentText variant="outlined" className={classes.allColor}>Ошибка! Вы не заполнили все поля!</DialogContentText>
                  ) : null}
                  {errorReg ? (
                    <DialogContentText variant="outlined" className={classes.allColor}>Ошибка! Аккаунт с такой почтой уже существует! </DialogContentText>
                  ) : null}
                  <TextField autoFocus margin="dense" id="name" label="Ваше имя" type="text" fullWidth value={formDataUser.name} onChange={handleChangeUser} />
                  <TextField autoFocus margin="dense" id="userNick" label="Ваш ник на сайте" type="text" fullWidth value={formDataUser.userNick} onChange={handleChangeUser} />
                  <TextField multiline margin="dense" id="description" label="О вас" color="primary" type="text" fullWidth value={formDataUser.description} onChange={handleChangeUser} />
                  <TextField autoFocus margin="dense" id="email" label="Электронная Почта" type="text" fullWidth value={formDataUser.email} onChange={handleChangeUser} />
                  <TextField margin="dense" id="password" label="Пароль" type="text" fullWidth value={formDataUser.password} onChange={handleChangeUser} />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} className={classes.allColor}>Отмена</Button>
                  <Button onClick={handleRegisterUser} className={classes.allColor}>Зарегистрироваться</Button>
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
        {serverError ? (<Box><Typography  variant="h6" className={classes.errorServerStyle}>Сервер не отвечает, мы работаем над решением проблемы</Typography><img src={'https://www.startpage.com/av/proxy-image?piurl=https%3A%2F%2Fwww.meme-arsenal.com%2Fmemes%2Fd1759f51d39e6536dcb761622498d75a.jpg&sp=1718226118T6f248a737798adff5e979252e5b262b83d41121ba6cda82472dcc42e313e5385'} alt="" role="presentation" /></Box>) : (loginIn ? (<Button variant="outlined" className={classes.CreateButton} onClick={handleClickOpenAdd}>Добавить мероприятие</Button>) : (
            <Typography  variant="h6">Войдите или зарегистрируйтесь, чтобы создавать мероприятия</Typography>
          ))}
          <Dialog open={openAdd} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Создание мероприятия</DialogTitle>
            <DialogContent>
              <DialogContentText>Введите все данные о вашем мероприятии</DialogContentText>
              {errorFill ? (
                <DialogContentText variant="outlined" className={classes.allColor}>Ошибка! Вы не заполнили все поля!</DialogContentText>
              ) : null}
              <TextField autoFocus variant="outlined" margin="dense" id="name" label="Введите название" color="primary" type="text" fullWidth value={formData.name} onChange={handleChange} />
              <TextField variant="outlined" multiline margin="dense" id="description" label="Введите описание" color="primary" type="text" fullWidth value={formData.description} onChange={handleChange} />
              <TextField variant="outlined" margin="dense" id="location" label="Введите адрес места, где пройдёт мероприятие" color="primary" type="text" fullWidth value={formData.location} onChange={handleChange} />
              <TextField variant="outlined" margin="dense" id="picture" label="Вставьте ссылку на изображение" color="primary" type="text" fullWidth value={formData.picture} onChange={handleChange} />
              <TextField id="date" label="Выберите дату" type="datetime-local" value={formData.date} onChange={handleChange} InputLabelProps={{ shrink: true, }} />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} className={classes.allColor}>Отмена</Button>
              <Button onClick={handleSubmit} className={classes.allColor}>Создать</Button>
            </DialogActions>
          </Dialog>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {events.map((card) => (
              <Grid item key={card} xs={12} sm={12} md={12}>
                <Card className={classes.card}>
                  <CardMedia className={classes.cardMedia} image={card.picture} />
                  <CardContent className={classes.cardContent}>
                    <Typography variant="h4" gutterBottom>{card.name}</Typography>
                    <Typography variant="h5" gutterBottom>{card.description}</Typography>
                    <div className={classes.cardPlaceTime}>
                      <Typography>{card.location}</Typography>
                      <Typography>{card.date.replace('T', ' ')}</Typography>
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
