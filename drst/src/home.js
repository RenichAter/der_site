import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { AppBar, Container, Toolbar, Typography, Box, Paper, Grid, Card, CardMedia, CardContent, TextField,Dialog, DialogActions, DialogTitle, DialogContent,DialogContentText, Menu, MenuItem} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {flexGrow: 1,},
  allColor: {color: "#5b7fff", backgroundColor: '#5b7fff'},
  centrCentr: {color: "#5b7fff", backgroundColor: '#5b7fff', display: 'flex', justifyContent: 'center', alignItems: 'center'},
  menuButton: {marginRight: theme.spacing(1), color: '#ffffff', backgroundColor: '#5b7fff'},
  title: {flexGrow: 1,},
  ButtonCreatePosition: {padding: theme.spacing(3),},
  cardMedia: {paddingTop: "100%",},
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
    backgroundColor: "#5b7fff",
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
  ButtonColor: {
    color: '#ffffff',
    backgroundColor: '#5b7fff'
  },
  SearchColor: {
    color: '#00000f',
    backgroundColor: '#ffffff'
  },
  searchBox: {
    marginRight: theme.spacing(622),
  },
  Positions: {display: 'flex', justifyContent: 'space-between', alignItems: 'center'}
}));

  const Home = ({ desi }) => {
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
    features: '',
    featuresFull: '',
    price: '',
    picture: '',
  });

  const [formDataUser, setFormDataUser] = useState({
    name: '',
    family: '',
    city: '',
    username: '',
    mail: '',
    password: '',
  });

  const [loginData, setLoginData] = useState({
    mail: '',
    password: '',
  });
  const getApiData = async () => {
    try {
    const response = await fetch(
      "http://localhost:4000/api/goods"
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
        const response = await axios.post('https://localhost:4000/api/Auth/login', loginData);
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
        const response = await axios.post('https://localhost:4000/api/users', formDataUser);
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
        const response = await axios.put('https://localhost:4000/api/goods', formData);
        console.log('Server Response:', response.data);
        handleClose();
      } catch (error) {
        console.error('Error submitting data:', error);
      }
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatTextWithBreaks = (text) => {
    const lines = text.split('\\n');
    return lines.map((line, index) => (
      <>
        {line}
        {index < lines.length - 1 && <br />}
      </>
    ));
  };
  return (
    <box>
    <Paper className={classes.mainFeaturesPost} style={{ backgroundImage: 'url(./img/header.png)' }}>
          <Container fixed maxWidth="false">
            <Grid container>
              <Grid item md={6}>
                <div className={classes.mainFeaturesPostContent}>
                  <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                    Фаренгейт
                  </Typography>
                  <Typography variant="h5" color="inherit" paragraph>
                    Добро пожаловать!
                  </Typography>
                </div>
              </Grid>
            </Grid>
          </Container>
        </Paper>
        <div align="center" className={classes.ButtonCreatePosition}>
        {serverError ? (<Box><Typography  variant="h6" className={classes.errorServerStyle}>Сервер не отвечает, мы работаем над решением проблемы</Typography><img src={'https://www.startpage.com/av/proxy-image?piurl=https%3A%2F%2Fwww.meme-arsenal.com%2Fmemes%2Fd1759f51d39e6536dcb761622498d75a.jpg&sp=1718226118T6f248a737798adff5e979252e5b262b83d41121ba6cda82472dcc42e313e5385'} alt="" role="presentation" /></Box>) : (loginIn ? (<Button variant="outlined" className={classes.CreateButton} onClick={handleClickOpenAdd}>Добавить мероприятие</Button>) : (
            <Typography  variant="h6">Войдите или зарегистрируйтесь, чтобы заказать товар</Typography>
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
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} className={classes.allColor}>Отмена</Button>
              <Button onClick={handleSubmit} className={classes.allColor}>Создать</Button>
            </DialogActions>
          </Dialog>
        </div>
        <Paper className={classes.mainFeaturesPost} style={{ backgroundImage: 'url(./img/header.png)' }}>
        <Container className={classes.cardGrid} >
          <Grid container spacing={4} maxWidth="sm">
            {events.map((card) => (
              <Grid item key={card} xs={2.4} sm={2.4} md={2}>
                <Card className={classes.card} maxWidth="sm"> 
                  <CardMedia className={classes.cardMedia} image={card.picture} />
                  <CardContent className={classes.cardContent}>
                   <Typography variant="h6" gutterBottom>{formatPrice(card.price)}</Typography>
                    <Typography variant="h6" gutterBottom>{card.name}</Typography>
                    <Typography variant="h11" gutterBottom>{formatTextWithBreaks(card.features)}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
        </Paper>
    </box>
  );
};

export default Home;