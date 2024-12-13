import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Button from '@material-ui/core/Button';
import { AppBar, Container, Toolbar, Typography, Box, Paper, Grid, Card, CardMedia, CardContent, TextField, Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText, Menu, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: { flexGrow: 1, },
  allColor: { color: "#ffffff", backgroundColor: '#5b7fff', '&:hover': { color: '#5b7fff', }, },
  centrCentr: { color: "#5b7fff", backgroundColor: '#5b7fff', display: 'flex', justifyContent: 'center', alignItems: 'center' },
  menuButton: { marginRight: theme.spacing(1), color: '#ffffff', backgroundColor: '#5b7fff' },
  title: { flexGrow: 1, },
  ButtonCreatePosition: { padding: theme.spacing(3), },
  derTextPages: { marginTop: theme.spacing(4), },
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
  errorServerStyle: {
    position: "relative",
    padding: theme.spacing(2),
    marginTop: theme.spacing(-4),
  },
  CreateButton: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
    backgroundColor: "#5b7fff",
    color: "#ffffff",
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
  MargineRight: {
    marginRight: theme.spacing(1),
  },
  Positions: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  mainFeaturesPostContent: {
    position: 'relative',
    padding: theme.spacing(6),
  },
  cardContainer: {
    marginTop: theme.spacing(4),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  TextUnion: {
    display: 'flex',
  },

  cardButtons: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '8px',
  },

  searchContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    margin: theme.spacing(2),
  },
  cardContainerTwo: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: theme.spacing(2),
    marginTop: theme.spacing(4),
    flexWrap: 'wrap',
  },
  cardTwo: {
    width: '48%',
    boxShadow: theme.shadows[4],
    borderRadius: theme.shape.borderRadius,
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
  },
  cardThri: {
    width: '25%',
    boxShadow: theme.shadows[4],
    borderRadius: theme.shape.borderRadius,
    display: 'flex',
    aspectRatio: '1 / 1',
    overflow: 'hidden',
  },
  cardFour: {
    width: '50%',
    boxShadow: theme.shadows[4],
    borderRadius: theme.shape.borderRadius,
    display: 'flex',
    aspectRatio: '1 / 1',
    overflow: 'hidden',
  },
  cardContainerThri: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: theme.spacing(1),
    marginTop: theme.spacing(4),
  },
  textField: {
    width: '100%',
  },
  buttonRecall: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  carder: {
    height: '490px', // Фиксированная высота карточки
    display: 'flex',
    flexDirection: 'column', // Распределение содержимого по вертикали
    justifyContent: 'space-between', // Выравнивание содержимого
    boxShadow: theme.shadows[3],
    borderRadius: theme.shape.borderRadius,
  },
  carder2: {
    height: '490px', // Фиксированная высота карточки
    display: 'flex',
    flexDirection: 'column', // Распределение содержимого по вертикали
    justifyContent: 'space-between', // Выравнивание содержимого
    boxShadow: theme.shadows[3],
    borderRadius: theme.shape.borderRadius,
  },
  cardContent: {
    height: '100%', // Высота содержимого карточки
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: theme.spacing(1),
    flexGrow: 1
  },
  cardMedia: {
    paddingTop: "100%",
  },

  carouselWrapper: {
    width: '100%',
    height: '400px', // Высота слайдера, которую можно настроить
  },
  slideContainer: {
    position: 'relative',
    width: '100%',
    height: '100%', // Растягиваем слайд по всей высоте
  },
  slideImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover', // Обеспечиваем, чтобы изображение заполнило контейнер без искажений
  },

  TextForCard: {
    fontWeight: 'bold',
    marginTop: theme.spacing(4)
  },
  containerus: {
    width: '100%',
    padding: '10px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  checkoutButton: {
    padding: '8px 16px',
    color: '#ffffff',
    backgroundColor: '#5b7fff'
  },

}));

function App() {
  const [events, setEvents] = useState([]);
  const [banners, setBanners] = useState([]);
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
  const [username, setUserName] = useState('');
  const [formData, setFormData] = useState({ name: '', description: '', features: '', featuresFull: '', price: '', picture: '', type: '', });
  const [formDataUser, setFormDataUser] = useState({ name: '', family: '', city: '', username: '', mail: '', password: '', });
  const [loginData, setLoginData] = useState({ mail: '', password: '', });
  const [anchorEl, setAnchorEl] = useState(null);
  const [activePage, setActivePage] = useState('home');
  const [descriptionRecall, setReview] = useState('');
  const [name, setUserNameName] = useState('');
  const [family, setUserFamily] = useState('');
  const [city, setUserCity] = useState('');
  const [mail, setUserMail] = useState('');
  const [query, setQuery] = useState("");
  const [errorMail, setErrorMail] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  const getApiData = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/goods"
      ).then((response) => response.json());
      setEvents(response);
    }
    catch (error) {
      setServerError(true)
      console.error('Ошибка при отправке запроса:', error);

    }
  };

  const getApiDataBanner = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/banners"
      ).then((response) => response.json());
      setBanners(response);
    }
    catch (error) {
      setServerError(true)
      console.error('Ошибка при отправке запроса:', error);

    }
  };

  useEffect(() => {
    getApiData();
    getApiDataBanner();
    const savedToken = localStorage.getItem('token');
    const savedUserName = localStorage.getItem('username');
    const savedMail = localStorage.getItem('mail');
    const savedNameName = localStorage.getItem('name');
    const savedFamily = localStorage.getItem('family');
    const savedCity = localStorage.getItem('city');
    if (savedToken && savedUserName) {
      setServerResponse(savedToken);
      setUserName(savedUserName);
      setUserMail(savedMail);
      setUserNameName(savedNameName);
      setUserFamily(savedFamily);
      setUserCity(savedCity);
      setLoginIn(true);
    }
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickExit = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('family');
    localStorage.removeItem('city');
    localStorage.removeItem('username');
    localStorage.removeItem('mail');
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
    setAnchorEl(null);
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
    if (loginData.mail.trim() === '' || loginData.password.trim() === '') {
      setErrorFill(true);
    } else {
      setErrorFill(false);
      try {
        const response = await axios.post('http://localhost:4000/api/login', loginData);
        setServerResponse(response.data.token);
        setUserNameName(response.data.name);
        setUserFamily(response.data.family);
        setUserCity(response.data.city);
        setUserName(response.data.username);
        setUserMail(response.data.mail);
        setLoginIn(true);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('name', response.data.name);
        localStorage.setItem('family', response.data.family);
        localStorage.setItem('city', response.data.city);
        localStorage.setItem('username', response.data.username);
        localStorage.setItem('mail', response.data.mail);
        handleClose();
      } catch (error) {
        setErrorReg(true);
        console.error('Ошибка при отправке запроса:', error);
      }
    }
  };

  const mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleRegisterUser = async (e) => {
    e.preventDefault();
    if (formDataUser.name.trim() === '' || formDataUser.family.trim() === '' || formDataUser.city.trim() === '' || formDataUser.username.trim() === '' || formDataUser.mail.trim() === '' || formDataUser.password.trim() === '') {
      setErrorFill(true);
    }
    else {
      setErrorFill(false);
      if (!mailRegex.test(formDataUser.mail)) {
        console.log((formDataUser.mail))
        setErrorMail(true);
      }
      else {
        setErrorMail(false);
        try {
          await axios.post('http://localhost:4000/api/register', formDataUser);
          const response = await axios.post('http://localhost:4000/api/login', formDataUser);
          setServerResponse(response.data.token);
          setUserNameName(response.data.name);
          setUserFamily(response.data.family);
          setUserCity(response.data.city);
          setUserName(response.data.username);
          setUserMail(response.data.mail);
          setLoginIn(true);
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('name', response.data.name);
          localStorage.setItem('family', response.data.family);
          localStorage.setItem('city', response.data.city);
          localStorage.setItem('username', response.data.username);
          localStorage.setItem('mail', response.data.mail);
          handleClose();
        } catch (error) {
          setErrorReg(true);
          console.error('Error submitting data:', error);
        }
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.name.trim() === '' || formData.description.trim() === '' || formData.features.trim() === '' || formData.featuresFull.trim() === '' || formData.price.trim() === '' || formData.type.trim() === '') {
      setErrorFill(true);
    } else {
      setErrorFill(false);
      try {
        if (formData.picture.trim() === '') {
          formData.picture = 'https://farengeit-online.ru/upload/iblock/e61/s0kpwctw0sbchie1gqtbimzqk6jjl7x4/8358cd73-8298-11ec-a20a-005056b04686_7d55ffe2-8299-11ec-a20a-005056b04686.png';
        }
        const response = await axios.post('http://localhost:4000/api/goods', formData);
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

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSendRe = async () => {
    const response = await axios.post('http://localhost:4000/api/recalls', {
      mail,
      descriptionRecall,
    });
    setReview('');
  };

  const filteredKondej = events.filter(event => event.type === "kondej");
  const filteredRadej = events.filter(event => event.type === "radej");
  const filteredNasos = events.filter(event => event.type === "nasos");
  const filteredKotel = events.filter(event => event.type === "kotel");

  const filteredEvents = events.filter((event) =>
    event.name.toLowerCase().includes(query.toLowerCase()) || event.features.toLowerCase().includes(query.toLowerCase())
  );

  const handleInputChange = (event) => {
    setQuery(event.target.value);
    setActivePage('search');
  };

  const handleCardClick = (card) => {
    setSelectedProduct(card); 
    setActivePage("details");
  };

  const Footer = () => {
    return (
      <div style={{
        maxWidth: 'false',
        backgroundColor: '#5b7fff',
        color: 'white',
        textAlign: 'center',
        padding: '10px 0',
        marginTop: '870px',
        bottom: 0,
        left: 0
      }}>
        <Typography variant="body2">
          <a
            href="http://localhost:4000/files/terms-and-conditions.pdf"
            download="Пользовательское соглашение.pdf"
            style={{ color: 'inherit', textDecoration: 'none' }}
            onClick={(e) => {
              const filePath = e.target.href;
              fetch(filePath)
                .then((response) => {
                  if (!response.ok) {
                    e.preventDefault();
                    alert('Файл не найден!');
                  }
                })
                .catch(() => {
                  e.preventDefault();
                  alert('Ошибка при загрузке файла!');
                });
            }}
          >
            Пользовательское соглашение
          </a>
        </Typography>
      </div>
    );
  };


  const addToCart = (product) => {
    const existingProduct = cartItems.find(item => item._id === product._id);
    let updatedCart;
    if (existingProduct) {
      updatedCart = cartItems.map(item =>
        item._id === product._id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
      );
    } else {
      updatedCart = [...cartItems, { ...product, quantity: 1 }];
    }
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };


  const increaseQuantity = (item) => {
    const updatedCart = cartItems.map((cartItem) => {
      if (cartItem._id === item._id) { 
        const updatedItem = { ...cartItem, quantity: (cartItem.quantity || 1) + 1 }; 
        console.log('Updated item:', updatedItem); 
        return updatedItem;
      }
      return cartItem;
    });

    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart)); 
  };

  const decreaseQuantity = (item) => {
    if (!item || item.quantity <= 0) {
      console.error('Invalid item or item quantity is already zero or less', item);
      return; 
    }

    const updatedCart = cartItems
      .map(cartItem => {
        if (cartItem._id === item._id) {
          const updatedItem = { ...cartItem, quantity: cartItem.quantity - 1 };
          return updatedItem;
        }
        return cartItem;
      })
      .filter(cartItem => cartItem.quantity > 0);

    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <>
      <AppBar position="static" style={{ backgroundColor: "#ffffff" }}>
        <Container maxWidth="false">
          <Toolbar className={classes.Positions}>
            <Typography variant="h6">
              <img src={"./img/logo.png"} alt="Logo" style={{ height: 'auto', maxWidth: '100%' }} />
            </Typography>
            <Container className={classes.searchContainer}>
              <TextField variant="outlined" size="small" placeholder="Поиск..........." lassName={classes.searchColor} fullWidth onChange={handleInputChange} />
            </Container>
            <Box className={classes.Positions}>
              <Box mr={3}>
                {loginIn ? (
                  <Button color="inherit" variant="contained" className={classes.menuButton} onClick={() => { setActivePage('userpage') }}>Аккаунт: {username} </Button>
                ) : (
                  <Button color="inherit" variant="contained" className={classes.menuButton} onClick={handleClickOpen}>Войти</Button>
                )}
              </Box>
              <Box mr={3}>
                {loginIn ? (<Button color="inherit" variant="contained" className={classes.menuButton} onClick={handleClickExit}>Выйти</Button>) : (
                  <Button className={classes.ButtonColor} variant="contained" onClick={handleClickOpenReg}>Регистрация</Button>
                )}
              </Box>
            </Box>
          </Toolbar>
        </Container>
        <Paper className={classes.centrCentr}>
          <Box className={classes.centrCentr}>
            <Button variant="text" className={classes.menuButton} onClick={() => setActivePage('home')}>
              Главная
            </Button>
            <Button variant="text" onClick={handleMenuOpen} className={classes.menuButton}>
              Каталог
            </Button>
            <Button variant="text" className={classes.menuButton} onClick={() => setActivePage('contacts')}>
              Контакты
            </Button>
            <Button variant="text" className={classes.menuButton} onClick={() => setActivePage('about')}>
              О нас
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              classes={{ paper: classes.dropdownMenu }}
            >
              <MenuItem onClick={() => { setActivePage('boilers'); handleClose(); }}>Котельные</MenuItem>
              <MenuItem onClick={() => { setActivePage('conditioners'); handleClose(); }}>Кондиционеры</MenuItem>
              <MenuItem onClick={() => { setActivePage('radiators'); handleClose(); }}>Радиаторы</MenuItem>
              <MenuItem onClick={() => { setActivePage('pumps'); handleClose(); }}>Насосы</MenuItem>
            </Menu>
          </Box>
        </Paper>
      </AppBar>

      <main maxWidth="false">
        {activePage === 'home' && <box>
          <Container style={{ padding: '22px' }}>
            <Carousel showThumbs={false} infiniteLoop={true} useKeyboardArrows={true} autoPlay={true} interval={3000} dynamicHeight={true} className={classes.carouselWrapper}>
              {banners.map((card, index) => (
                <div key={index} className={classes.slideContainer}>
                  <img className={classes.slideImage} src={card.picture} alt={card.name} />
                </div>
              ))}
            </Carousel>
          </Container>
          <div align="center" className={classes.ButtonCreatePosition}>
            {serverError ? (<Box><Typography variant="h6" className={classes.errorServerStyle}>Сервер не отвечает, мы работаем над решением проблемы</Typography><img src={'https://memi.klev.club/uploads/posts/2024-04/memi-klev-club-mt1b-p-memi-kot-s-gaechnim-klyuchom-1.jpg'} alt="" role="presentation" /></Box>) : (loginIn ? (<Typography></Typography>/*<Button variant="outlined" className={classes.CreateButton} onClick={handleClickOpenAdd}>Добавить предмет</Button>*/) : (
              <Typography variant="h6">Войдите или зарегистрируйтесь, чтобы заказать товар</Typography>
            ))}
          </div>
          <Container className={classes.cardGrid} >
            <Grid container spacing={4} maxWidth="sm">
              {events.map((card) => (
                <Grid item key={card} md={3} >
                  <Card className={classes.carder} maxWidth="sm" style={{ height: '600px' }}>
                    <CardMedia className={classes.cardMedia} image={card.picture} />
                    <CardContent className={classes.cardContent}>
                      <Typography variant="h6" gutterBottom>{formatPrice(card.price)}</Typography>
                      <Typography variant="h7" gutterBottom style={{ fontWeight: 'bold' }}>{card.name}<br /></Typography>
                      <Typography variant="h11" gutterBottom>{formatTextWithBreaks(card.features)}</Typography>
                    </CardContent>
                    <Container className={classes.cardButtons}>
                      <Button
                        className={classes.detailsButton}
                        onClick={() => handleCardClick(card)}
                      >
                        Подробности
                      </Button>
                      <Button
                        className={classes.ButtonColor}
                        onClick={() => addToCart(card)}  // Добавление товара в корзину
                      >
                        В корзину
                      </Button>
                    </Container>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </box>}
        {activePage === 'contacts' && <Container className={classes.derTextPages}>
          <Container className={classes.cardContainerTwo}>
            <Card className={classes.cardTwo}>
              <CardMedia
                component="img"
                className={classes.media}
                image="https://farengeit-online.ru/contacts/1.png"
                alt="Фоновое изображение"
              />
            </Card>
            <Card className={classes.cardTwo}>
              <CardMedia
                component="img"
                className={classes.media}
                image="/img/mapa.png"
                alt="Фоновое изображение"
              />
            </Card>
          </Container>
          <Container className={classes.derTextPages}>
            <Typography variant="h6" color="inherit" paragraph>
              Адрес:
            </Typography>
            <Container className={classes.TextUnion}>
              <Typography variant="h7" paragraph className={classes.MargineRight} style={{ fontWeight: 'bold' }}>
                Адрес пункта выдачи:
              </Typography>
              <Typography variant="h7" color="textSecondary" paragraph style={{ fontWeight: 'bold' }}>
                МО, г. Королев, ул. Полевая 43/12
              </Typography>
            </Container>
            <Container className={classes.TextUnion}>
              <Typography variant="h7" paragraph className={classes.MargineRight} style={{ fontWeight: 'bold' }}>
                Адрес склада:
              </Typography>
              <Typography variant="h7" color="textSecondary" paragraph style={{ fontWeight: 'bold' }}>
                г. Москва, 43-й км МКАД, Логистический центр «Славянский мир» павильон 27, ворота 7
              </Typography>
            </Container>
            <Container className={classes.TextUnion}>
              <Typography variant="h7" paragraph className={classes.MargineRight} style={{ fontWeight: 'bold' }}>
                Электронная почта:
              </Typography>
              <Typography variant="h7" color="textSecondary" paragraph style={{ fontWeight: 'bold' }}>
                info+11013870@farengeit-online.ru
              </Typography>
            </Container>
            <Container>
              <Typography variant="h7" paragraph className={classes.MargineRight} style={{ fontWeight: 'bold' }}>
                Режим работы:
              </Typography>
              <Typography variant="h7" color="textSecondary" paragraph style={{ fontWeight: 'bold' }}>
                Пн. – Сб.: с 9:00 до 19:00
              </Typography>
              <Typography variant="h7" color="textSecondary" paragraph style={{ fontWeight: 'bold' }}>
                Вс. - выходной
              </Typography>
            </Container>
            <Container>
              {loginIn ? (<Container><Container className={classes.reviewContainer}>
                <TextField
                  label="Ваш отзыв"
                  variant="outlined"
                  className={classes.textField}
                  value={descriptionRecall}
                  onChange={(e) => setReview(e.target.value)}
                  placeholder="Введите ваш отзыв"
                  multiline
                  rows={6}
                />
              </Container>
                <Container className={classes.buttonRecall}>
                  <Button variant="contained" color="primary" className={classes.textField} onClick={handleSendRe} disabled={!descriptionRecall}>Послать</Button>
                </Container></Container>) : (
                <Typography variant="h7" className={classes.buttonRecall}>Войдите или зарегистрируйтесь, чтобы оставить отзыв</Typography>
              )}
            </Container>
          </Container>
        </Container>}
        {activePage === 'about' && <Container className={classes.derTextPages}>
          <Typography variant="h5" color="inherit" paragraph style={{ fontWeight: 'bold' }}>
            О нас
          </Typography>
          <Typography variant="h6" color="textSecondary" paragraph>
            Компания Фаренгейт была основана в 2017 году и с тех пор занимается оптовыми и розничными продажами инженерных систем отопления, водоснабжения и водоотведения. Мы начали свою работу в Московском регионе, а наш центральный офис расположен в городе Королёв Московской области. Основной склад и пункт выдачи заказов находятся на 43-км МКАД, так же для удобства наших клиентов в Королёве имеется еще один пункт выдачи и офис.
          </Typography>
          <Typography variant="h6" paragraph style={{ fontWeight: 'bold' }}>
            Наши целевые группы клиентов:
          </Typography>
          <Typography variant="h6" color="textSecondary" paragraph>
            Оптовые покупатели — торговые компании (ритейлеры), которые закупают товары для последующей продажи. <br /><br />Монтажники и сантехники — постоянно растущая категория клиентов, благодаря привлекательным условиям работы и выгодным индивидуальным ценам.<br /><br />Корпоративные клиенты — организации, которые активно делают покупки через наш интернет-магазин.<br /><br />Частные лица — клиенты интернет-магазина, приобретающие оборудование для собственного использования.
          </Typography>
          <Typography variant="h6" paragraph style={{ fontWeight: 'bold' }}>
            Сотрудничая с нами, вы получаете:
          </Typography>
          <Typography variant="h6" color="textSecondary" paragraph>
            —Широкий выбор товаров от ведущих поставщиков.<br />—Собственную доставку по Москве и области.<br />—Гибкий график работы склада, обеспечивающий быструю обработку заказов.<br />—Компетентного и надежного поставщика, что подтверждается плодотворной работой с 2017 года
          </Typography>
          <Typography variant="h6" paragraph style={{ fontWeight: 'bold' }}>
            Выбирая нашу компанию, вы обеспечиваете себе быстрое решение ваших задач.
          </Typography>
          <Typography variant="h6" color="textSecondary" paragraph>
            Квалифицированные сотрудники — это одна из основных ценностей нашей компании. Они обладают глубокими знаниями в своих областях, что позволяет нам обеспечивать высокое качество услуг и продукции.<br /><br />Профессионализм: все наши сотрудники регулярно проходят обучение, что помогает им быть в курсе последних тенденций и технологий в своей сфере.<br /><br />Опыт: в команде работают специалисты с многолетним опытом, что позволяет эффективно решать различные задачи любой сложности.<br /><br />Командная работа: мы стремимся создать атмосферу сотрудничества и взаимопомощи, что способствует развитию креативных идей и эффективному решению проблем.<br /><br />Индивидуальный подход: наши сотрудники умеют находить подход к каждому клиенту, понимая его потребности и предоставляя персонализированные решения.<br /><br />Ответственность: осознавая важность своей роли в компании, наши сотрудники подходят к своим обязанностям с полной ответственностью.
          </Typography>
          <Typography variant="h6" color="textSecondary" paragraph><br /><br /><br />ИП Коренченко Никита Степанович<br />ИНН: 501816536673<br />ОГРНИП: 324508100302827<br />Расчетный счет: 40802810540000154902<br />БИК: 044525068<br />Кор.счет: 30101810645374525068<br />ООО "ОЗОН Банк"<br />Факт. адрес: 141075, Московская обл., г. Королев, ул. Полевая, 43/12, помещение 112<br />Юридический адрес: 141705, Московская обл., г. Долгопрудный, ул. Восточная, д. 52
          </Typography>

        </Container>}
        {activePage === 'search' &&
          <Container className={classes.derTextPages}>
            <Typography variant="h5" color="inherit" paragraph style={{ fontWeight: 'bold' }}>Поиск:</Typography>
            <Container className={classes.cardGrid} >
              <Grid container spacing={4} maxWidth="sm">
                {filteredEvents.map((card) => (
                  <Grid item key={card} md={3} >
                    <Card className={classes.carder} maxWidth="sm" style={{ height: '600px' }}>
                      <CardMedia className={classes.cardMedia} image={card.picture} />
                      <CardContent className={classes.cardContent}>
                        <Typography variant="h6" gutterBottom>{formatPrice(card.price)}</Typography>
                        <Typography variant="h7" gutterBottom style={{ fontWeight: 'bold' }}>{card.name}<br /></Typography>
                        <Typography variant="h11" gutterBottom>{formatTextWithBreaks(card.features)}</Typography>
                      </CardContent>
                      <Container className={classes.cardButtons}>
                        <Button
                          className={classes.detailsButton}
                          onClick={() => handleCardClick(card)}
                        >
                          Подробности
                        </Button>
                        <Button
                          className={classes.ButtonColor}
                          onClick={() => addToCart(card)}  // Добавление товара в корзину
                        >
                          В корзину
                        </Button>
                      </Container>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Container>
          </Container>}
        {activePage === 'boilers' &&
          <Container className={classes.derTextPages}>
            <Typography variant="h5" color="inherit" paragraph style={{ fontWeight: 'bold' }}>Котельные</Typography>
            <Container className={classes.cardGrid} >
              <Grid container spacing={4} maxWidth="sm">
                {filteredKotel.map((card) => (
                  <Grid item key={card} md={3} >
                    <Card className={classes.carder} maxWidth="sm" style={{ height: '600px' }}>
                      <CardMedia className={classes.cardMedia} image={card.picture} />
                      <CardContent className={classes.cardContent}>
                        <Typography variant="h6" gutterBottom>{formatPrice(card.price)}</Typography>
                        <Typography variant="h7" gutterBottom style={{ fontWeight: 'bold' }}>{card.name}<br /></Typography>
                        <Typography variant="h11" gutterBottom>{formatTextWithBreaks(card.features)}</Typography>
                      </CardContent>
                      <Container className={classes.cardButtons}>
                        <Button
                          className={classes.detailsButton}
                          onClick={() => handleCardClick(card)}
                        >
                          Подробности
                        </Button>
                        <Button
                          className={classes.ButtonColor}
                          onClick={() => addToCart(card)}  // Добавление товара в корзину
                        >
                          В корзину
                        </Button>
                      </Container>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Container>
          </Container>}
        {activePage === 'conditioners' && <Container className={classes.derTextPages}>
          <Typography variant="h5" color="inherit" paragraph style={{ fontWeight: 'bold' }}>Кондиционеры</Typography>
          <Container className={classes.cardGrid} >
              <Grid container spacing={4} maxWidth="sm">
                {filteredKondej.map((card) => (
                  <Grid item key={card} md={3} >
                    <Card className={classes.carder} maxWidth="sm" style={{ height: '600px' }}>
                      <CardMedia className={classes.cardMedia} image={card.picture} />
                      <CardContent className={classes.cardContent}>
                        <Typography variant="h6" gutterBottom>{formatPrice(card.price)}</Typography>
                        <Typography variant="h7" gutterBottom style={{ fontWeight: 'bold' }}>{card.name}<br /></Typography>
                        <Typography variant="h11" gutterBottom>{formatTextWithBreaks(card.features)}</Typography>
                      </CardContent>
                      <Container className={classes.cardButtons}>
                        <Button
                          className={classes.detailsButton}
                          onClick={() => handleCardClick(card)}
                        >
                          Подробности
                        </Button>
                        <Button
                          className={classes.ButtonColor}
                          onClick={() => addToCart(card)}  // Добавление товара в корзину
                        >
                          В корзину
                        </Button>
                      </Container>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Container>
        </Container>}
        {activePage === 'radiators' && <Container className={classes.derTextPages}>
          <Typography variant="h5" color="inherit" paragraph style={{ fontWeight: 'bold' }}>Радиаторы</Typography>
          <Container className={classes.cardGrid} >
              <Grid container spacing={4} maxWidth="sm">
                {filteredRadej.map((card) => (
                  <Grid item key={card} md={3} >
                    <Card className={classes.carder} maxWidth="sm" style={{ height: '600px' }}>
                      <CardMedia className={classes.cardMedia} image={card.picture} />
                      <CardContent className={classes.cardContent}>
                        <Typography variant="h6" gutterBottom>{formatPrice(card.price)}</Typography>
                        <Typography variant="h7" gutterBottom style={{ fontWeight: 'bold' }}>{card.name}<br /></Typography>
                        <Typography variant="h11" gutterBottom>{formatTextWithBreaks(card.features)}</Typography>
                      </CardContent>
                      <Container className={classes.cardButtons}>
                        <Button
                          className={classes.detailsButton}
                          onClick={() => handleCardClick(card)}
                        >
                          Подробности
                        </Button>
                        <Button
                          className={classes.ButtonColor}
                          onClick={() => addToCart(card)}  // Добавление товара в корзину
                        >
                          В корзину
                        </Button>
                      </Container>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Container>
        </Container>}
        {activePage === 'pumps' && <Container className={classes.derTextPages}>
          <Typography variant="h5" color="inherit" paragraph style={{ fontWeight: 'bold' }}>Насосы</Typography>
          <Container className={classes.cardGrid} >
              <Grid container spacing={4} maxWidth="sm">
                {filteredNasos.map((card) => (
                  <Grid item key={card} md={3} >
                    <Card className={classes.carder} maxWidth="sm" style={{ height: '600px' }}>
                      <CardMedia className={classes.cardMedia} image={card.picture} />
                      <CardContent className={classes.cardContent}>
                        <Typography variant="h6" gutterBottom>{formatPrice(card.price)}</Typography>
                        <Typography variant="h7" gutterBottom style={{ fontWeight: 'bold' }}>{card.name}<br /></Typography>
                        <Typography variant="h11" gutterBottom>{formatTextWithBreaks(card.features)}</Typography>
                      </CardContent>
                      <Container className={classes.cardButtons}>
                        <Button
                          className={classes.detailsButton}
                          onClick={() => handleCardClick(card)}
                        >
                          Подробности
                        </Button>
                        <Button
                          className={classes.ButtonColor}
                          onClick={() => addToCart(card)}  // Добавление товара в корзину
                        >
                          В корзину
                        </Button>
                      </Container>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Container>
        </Container>}
        {activePage === 'userpage' && <Container>
          <Container className={classes.cardContainerThri}>
            <Card className={classes.cardThri}>
              <CardMedia
                component="img"
                className={classes.media}
                image="/img/user.png"
                alt="Фоновое изображение"
              />
            </Card>
            <Container>
              <Container className={classes.TextUnion}>
                <Typography variant="h7" paragraph className={classes.MargineRight} style={{ fontWeight: 'bold' }}>
                  Имя:
                </Typography>
                <Typography variant="h7" color="textSecondary" paragraph style={{ fontWeight: 'bold' }}>
                  {name}
                </Typography>
              </Container>
              <Container className={classes.TextUnion}>
                <Typography variant="h7" paragraph className={classes.MargineRight} style={{ fontWeight: 'bold' }}>
                  Фамилия:
                </Typography>
                <Typography variant="h7" color="textSecondary" paragraph style={{ fontWeight: 'bold' }}>
                  {family}
                </Typography>
              </Container>
              <Container className={classes.TextUnion}>
                <Typography variant="h7" paragraph className={classes.MargineRight} style={{ fontWeight: 'bold' }}>
                  Город:
                </Typography>
                <Typography variant="h7" color="textSecondary" paragraph style={{ fontWeight: 'bold' }}>
                  {city}
                </Typography>
              </Container>
              <Container className={classes.TextUnion}>
                <Typography variant="h7" paragraph className={classes.MargineRight} style={{ fontWeight: 'bold' }}>
                  Имя на сайте:
                </Typography>
                <Typography variant="h7" color="textSecondary" paragraph style={{ fontWeight: 'bold' }}>
                  {username}
                </Typography>
              </Container>
              <Container className={classes.TextUnion}>
                <Typography variant="h7" paragraph className={classes.MargineRight} style={{ fontWeight: 'bold' }}>
                  Электронная почта:
                </Typography>
                <Typography variant="h7" color="textSecondary" paragraph style={{ fontWeight: 'bold' }}>
                  {mail}
                </Typography>
              </Container>
            </Container>
          </Container>
        </Container>}
        {activePage === 'card' && <Container>
          <Container>
            <Typography variant="h4" paragraph className={classes.TextForCard}>Корзина</Typography>
            {cartItems.length === 0 ? (
              <Typography variant="h5" paragraph>В корзине пока нет товаров.</Typography>
            ) : (
              <Container>
                <Grid container spacing={4} maxWidth="sm">
                  {cartItems.map((item, index) => (
                    <Grid item key={index} xs={12} sm={12} md={12}>
                      <Card>
                        <Grid container alignItems="center" justifyContent="space-between" >
                          <Grid>
                            <CardMedia
                              component="img"
                              image={item.picture}
                              style={{ width: '100%', height: '150px', objectFit: 'cover' }}
                            />
                          </Grid>
                          <Grid item xs={5} container direction="column" justifyContent="center">
                            <Typography variant="h6" gutterBottom>
                              {item.name}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              {formatTextWithBreaks(item.features)}
                            </Typography>
                          </Grid>
                          <Grid item xs={3} container direction="column" alignItems="center">
                            <Grid item justifyContent="space-between">
                              <Button
                                variant="contained"
                                size="small"
                                className={classes.ButtonColor}
                                onClick={() => decreaseQuantity(item)}
                              >-</Button>
                              <Button
                                variant="contained"
                                size="small"
                                className={classes.ButtonColor}
                                onClick={() => increaseQuantity(item)}>+</Button>
                            </Grid>
                            <Typography variant="h6" style={{ marginTop: '8px' }}>
                              {formatPrice(item.price * item.quantity)}
                            </Typography>
                            <Typography variant="body1">{item.quantity}</Typography>
                          </Grid>
                        </Grid>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
                <Container className={classes.containerus}>
                  <Typography variant="h5" style={{ fontWeight: 'bold' }}>
                    Общая стоимость: {formatPrice(calculateTotal())}
                  </Typography>
                  <Button
                    variant="contained"
                    className={classes.checkoutButton}
                  >
                    Оформление заказа
                  </Button>
                </Container>
              </Container>
            )}
          </Container>
        </Container>}
        {activePage === 'details' && <Container>
          <Container className={classes.cardContainerThri}>
            <Card className={classes.cardFour}>
              <CardMedia
                component="img"
                className={classes.media}
                image={selectedProduct.picture}
                alt="Фоновое изображение"
              />
            </Card>
            <Container>
              <Container className={classes.TextUnion}>
                <Typography variant="h4" paragraph style={{ fontWeight: 'bold' }}>
                  {selectedProduct.name}
                </Typography>
              </Container>
              <Container className={classes.TextUnion}>
                <Typography variant="h6" paragraph style={{ fontWeight: 'bold' }}>
                  {formatTextWithBreaks(selectedProduct.featuresFull)}
                </Typography>
              </Container>
            </Container>
          </Container>
        </Container>

        }
      </main>
      {loginIn ? (<button
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          padding: '30px 30px',
          borderRadius: '50%',
          fontSize: '30px',
          cursor: 'pointer',
        }}
        className={classes.ButtonColor}
        onClick={() => { setActivePage('card') }}
      >
        🛒
      </button>) : null}
      <Footer />

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Войти</DialogTitle>
        <DialogContent>
          <DialogContentText>Войдите, чтобы создавать товары</DialogContentText>
          {errorFill ? (
            <DialogContentText variant="outlined" className={classes.allColor}>Ошибка! Вы не заполнили все поля!</DialogContentText>
          ) : null}
          {errorAuth ? (
            <DialogContentText variant="outlined" className={classes.allColor}>Ошибка! Вы ввели неверный Логин или Пароль! </DialogContentText>
          ) : null}
          <TextField autoFocus margin="dense" id="mail" label="Электронная Почта" type="mail" fullWidth value={loginData.mail} onChange={handleChangeLoginData} />
          <TextField margin="dense" id="password" label="Пароль" type="password" fullWidth value={loginData.password} onChange={handleChangeLoginData} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} className={classes.allColor}>Отмена</Button>
          <Button onClick={handleClickLogin} className={classes.allColor}>Войти</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openReg} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Регистрация</DialogTitle>
        <DialogContent>
          <DialogContentText>Зарегистрируйтесь, чтобы заказать товар</DialogContentText>
          <Typography variant="body2">
          <a
            href="http://localhost:4000/files/terms-and-conditions.pdf"
            download="Пользовательское соглашение.pdf"
            style={{ color: 'inherit', textDecoration: 'none' }}
            onClick={(e) => {
              const filePath = e.target.href;
              fetch(filePath)
                .then((response) => {
                  if (!response.ok) {
                    e.preventDefault();
                    alert('Файл не найден!');
                  }
                })
                .catch(() => {
                  e.preventDefault();
                  alert('Ошибка при загрузке файла!');
                });
            }}
          >
            Пользовательское соглашение
          </a>
        </Typography>
          {errorFill ? (
            <DialogContentText variant="outlined" className={classes.allColor}>Ошибка! Вы не заполнили все поля!</DialogContentText>
          ) : null}
          {errorReg ? (
            <DialogContentText variant="outlined" className={classes.allColor}>Ошибка! Аккаунт с такой почтой уже существует! </DialogContentText>
          ) : null}
          {errorMail ? (
            <DialogContentText variant="outlined" className={classes.allColor}>Ошибка! Неправильный формат почты! </DialogContentText>
          ) : null}
          <TextField autoFocus margin="dense" id="name" label="Ваше имя" type="text" fullWidth value={formDataUser.name} onChange={handleChangeUser} />
          <TextField autoFocus margin="dense" id="family" label="Ваша Фамили" type="text" fullWidth value={formDataUser.family} onChange={handleChangeUser} />
          <TextField autoFocus margin="dense" id="username" label="Ваш ник на сайте" type="text" fullWidth value={formDataUser.username} onChange={handleChangeUser} />
          <TextField autoFocus margin="dense" id="city" label="Ваш город" type="text" fullWidth value={formDataUser.city} onChange={handleChangeUser} />
          <TextField autoFocus margin="dense" id="mail" label="Электронная Почта" type="text" fullWidth value={formDataUser.mail} onChange={handleChangeUser} />
          <TextField margin="dense" id="password" label="Пароль" type="text" fullWidth value={formDataUser.password} onChange={handleChangeUser} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} className={classes.allColor}>Отмена</Button>
          <Button onClick={handleRegisterUser} className={classes.allColor}>Зарегистрироваться</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openAdd} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Создание товара</DialogTitle>
        <DialogContent>
          <DialogContentText>Введите все данные</DialogContentText>
          {errorFill ? (
            <DialogContentText variant="outlined" className={classes.allColor}>Ошибка! Вы не заполнили все поля!</DialogContentText>
          ) : null}
          <TextField autoFocus variant="outlined" margin="dense" id="name" label="Введите название" color="primary" type="text" fullWidth value={formData.name} onChange={handleChange} />
          <TextField variant="outlined" multiline margin="dense" id="description" label="Введите описание" color="primary" type="text" fullWidth value={formData.description} onChange={handleChange} />
          <TextField variant="outlined" margin="dense" id="features" label="Введите короткое описание" color="primary" type="text" fullWidth value={formData.features} onChange={handleChange} />
          <TextField variant="outlined" margin="dense" id="featuresFull" label="Введите длинное описание" color="primary" type="text" fullWidth value={formData.featuresFull} onChange={handleChange} />
          <TextField variant="outlined" margin="dense" id="price" label="Введите цену" color="primary" type="text" fullWidth value={formData.price} onChange={handleChange} />
          <TextField variant="outlined" margin="dense" id="picture" label="Вставьте ссылку на изображение" color="primary" type="text" fullWidth value={formData.picture} onChange={handleChange} />
          <TextField variant="outlined" margin="dense" id="type" label="тип" color="primary" type="text" fullWidth value={formData.type} onChange={handleChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} className={classes.allColor}>Отмена</Button>
          <Button onClick={handleSubmit} className={classes.allColor}>Создать</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default App;
